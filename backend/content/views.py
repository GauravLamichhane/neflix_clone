from content.serializers import ContentSerializer
from rest_framework import viewsets
from .models import Content
from rest_framework.permissions import IsAuthenticated

class ViewContent(viewsets.ModelViewSet):
  serializer_class = ContentSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return Content.objects.filter(user = self.request.user)
  
  def perform_create(self,serializer):
    serializer.save(user = self.request.user)
  
  def perform_update(self, serializer):
    # Store old title for audit log
    instance = self.get_object()
    instance._old_title = instance.title
    serializer.save()
  
  def perform_destroy(self, instance):
    # Signal will handle audit logging
    instance.delete()
