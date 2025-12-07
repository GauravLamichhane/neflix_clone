from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ViewContent


router = DefaultRouter()
router.register(r'content', ViewContent, basename='content')

urlpatterns = [
  path('',include(router.urls))
]