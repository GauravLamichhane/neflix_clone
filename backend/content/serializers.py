from rest_framework import serializers
from .models import Content

class ContentSerializer(serializers.ModelSerializer):
  image = serializers.ImageField(use_url=True, required=False)
  
  class Meta:
    model = Content
    fields = ['id','title','description','image','created_at','updated_at']
    read_only_fields = ['id','created_at','updated_at']
  
  def validate_title(self, value):
    if len(value) < 3:
      raise serializers.ValidationError("Title must be at least 3 characters long.")
    return value
  
  def validate_image(self, value):
    if value:
      # Check file size (5MB limit)
      if value.size > 5 * 1024 * 1024:
        raise serializers.ValidationError("Image size must be less than 5MB.")
      
      # Check file type
      allowed_types = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
      if value.content_type not in allowed_types:
        raise serializers.ValidationError("Only JPEG, PNG, and WEBP images are allowed.")
    
    return value
