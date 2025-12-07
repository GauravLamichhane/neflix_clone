from django.db import models
from django.contrib.auth.models import User 
from content.models import Content

class AuditLog(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  action = models.CharField(max_length=50)
  content = models.ForeignKey(Content, on_delete=models.SET_NULL, null=True, blank=True)
  content_title = models.CharField(max_length=200, blank=True)

  browser = models.CharField(max_length=100,blank=True)
  os = models.CharField(max_length=100, null=True)
  device = models.CharField(max_length=100, blank=True)
  ip_address = models.GenericIPAddressField(null=True, blank=True)

  timestamp = models.DateTimeField(auto_now_add = True)
  details = models.JSONField(blank=True,null=True)

  def __str__(self):
    return f"{self.user}-{self.action}-{self.content_title}-{self.timestamp}"
  
  class Meta:
    ordering = ['-timestamp']
    verbose_name = 'Audit log'
    verbose_name_plural = 'Audit Logs'