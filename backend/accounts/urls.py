from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import RegisterView, LogoutView, UserProfileView, CustomTokenObtainPairView


urlpatterns = [
  path('register/',RegisterView.as_view(),name="register"),
  path('login/',CustomTokenObtainPairView.as_view(),name='login'),
  path('logout/',LogoutView.as_view(),name='logout'),
  path('token/refresh/',TokenRefreshView.as_view(),name='refresh_token'),
  path('profile/',UserProfileView.as_view(),name='profile'),
]