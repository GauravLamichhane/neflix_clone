from django.shortcuts import render
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings

#disabling csrf for this specific api
@csrf_exempt
def send_email_view(request):
  if request.method == "POST":
    data = json.loads(request.body)
    user_email = data.get("email")

    try:
      send_mail(
        "welcome to Netflix!",
        "Thank you for signing up.",
        settings.EMAIL_HOST_USER,
        [user_email],
        fail_silently=False,
      )
      return JsonResponse({"success":True})
    except Exception as e:
      print("Email error:",e)
      return JsonResponse({"success":False,"error":str(e)})