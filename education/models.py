from django.db import models
from kiosk.models import KioskSession

class AIRequest(models.Model):
    session = models.ForeignKey(KioskSession, on_delete=models.CASCADE, related_name="ai_requests")
    prompt = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
