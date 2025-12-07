from django.db.models.signals import post_save, post_delete, pre_delete
from django.dispatch import receiver
from content.models import Content
from .models import AuditLog
from threading import local


#this creates a thread local object
#this is like a small locker for current user request no one else
_threads_locals = local()

def get_current_request():
  return getattr(_threads_locals,'request',None)

def set_current_request(request):
  _threads_locals.request = request

def clear_current_request():
  if hasattr(_threads_locals,'request'):
    del _threads_locals.request


@receiver(post_save, sender= Content)
def log_content_created_update(sender,instance, created, **kwargs):
  request = get_current_request()
  if not request:
    return
  action = 'CREATE' if created else 'UPDATE'
  from .utils import get_device_info
  device_info = get_device_info(request)

  AuditLog.objects.create(
    user = request.user if request.user.is_authenticated else None,
    action = action,
    content = instance,
    content_title = instance.title,
    browser = device_info['browser'],
    os = device_info['os'],
    device = device_info['device'],
    ip_address = device_info['ip_address'],
  )

#termporarily store the title on the model instance in a special variable _title_to_log
@receiver(pre_delete, sender=Content)
def store_title_before_delete(sender, instance, **kwargs):
  instance._title_to_log = instance.title

@receiver(post_delete, sender=Content)
def log_content_delete(sender, instance, **kwargs):
  request = get_current_request()
  if not request:
    return
  
  from .utils import get_device_info
  device_info = get_device_info(request)
    
  AuditLog.objects.create(
        user=request.user if request.user.is_authenticated else None,
        action='DELETE',
        content=None,
        content_title=getattr(instance, '_title_to_log', 'Unknown'),
        browser=device_info['browser'],
        os=device_info['os'],
        device=device_info['device'],
        ip_address=device_info['ip_address'],
    )
