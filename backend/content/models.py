from django.db import models
from django.contrib.auth.models import User

class Content(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  title = models.CharField(max_length=20)
  description = models.TextField()
  image = models.ImageField(upload_to='content_images/')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.title
  
  class Meta:
    ordering = ['-created_at']
