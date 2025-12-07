from django.shortcuts import render
from .serializers import RegisterSerializer, UserSerializer, CustomTokenObtainPairSerializer
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):

  serializer_class = RegisterSerializer
  permission_classes = [AllowAny]

  def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data = request.data)
    serializer.is_valid(raise_exception = True)
    user = serializer.save()

    refresh = RefreshToken.for_user(user)

    return Response({
      "user":UserSerializer(user).data,
      "message":"User Registered successfully",
      "tokens":{
        "refresh":str(refresh),
        "access":str(refresh.access_token),
      }
    }, status=status.HTTP_201_CREATED)
  

class LogoutView(APIView):
  permission_classes = [IsAuthenticated]

  def post(self,request):
    try:
      refresh_token = request.data.get("refresh")
      if refresh_token:
        token = RefreshToken(refresh_token)
        token.blacklist()
      return Response({'message':"Logout successfull"}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
      return Response({"error":"Invalid token"},status=status.HTTP_400_BAD_REQUEST)
    
class UserProfileView(generics.RetrieveAPIView):
  serializer_class = UserSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    return self.request.user