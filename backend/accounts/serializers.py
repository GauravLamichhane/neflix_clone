from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'
    
    def validate(self, attrs):
        # Get email and password from request
        email = attrs.get('email')
        password = attrs.get('password')
        
        # Authenticate using email
        user = authenticate(request=self.context.get('request'), username=email, password=password)
        
        if user is None:
            raise serializers.ValidationError('No active account found with the given credentials')
        
        # Generate tokens
        refresh = self.get_token(user)
        
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        
        return data


class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only = True, required = True , validators = [validate_password])
  password2 = serializers.CharField(write_only = True, required =  True)

  class Meta:
    model = User
    fields = ['email','password','password2','first_name']

    extra_kwargs = {
      'first_name':{'required':True}
    }
  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError({"password":"password fields didn't match."})
    return attrs
  
  def validate_email(self,value):
    if User.objects.filter(email = value).exists():
      raise serializers.ValidationError("A user with this email already exists")
    return value
  
  def create(self, validated_data):
    validated_data.pop('password2')
    user = User.objects.create_user(
      username = validated_data['email'],
      email=validated_data['email'],
      password=validated_data['password'],
      first_name = validated_data.get('first_name')
    )
    return user
  

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id','username','email','first_name','date_joined']
    read_only_fields = ['id','date_joined']