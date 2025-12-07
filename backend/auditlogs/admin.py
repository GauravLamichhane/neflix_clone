from django.contrib import admin

from .models import AuditLog

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
  list_display = ['user','action','content_title','browser','os','device','ip_address','timestamp']
  list_filter = ['action','timestamp','browser','os']
  search_fields = ['user__username','content_title','ip_address']
  readonly_fields = ['user','action','content','content_title','browser','os','device','ip_address','timestamp','details']

  def has_add_permission(self, request):
    return False
  
  def has_delete_permission(self, request, obj = None):
    return False
