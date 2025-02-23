from rest_framework import viewsets
from .models import KioskSession, ActivityLog
from .serializers import KioskSessionSerializer, ActivityLogSerializer
from rest_framework.permissions import IsAuthenticated

class KioskSessionViewSet(viewsets.ModelViewSet):
    queryset = KioskSession.objects.all()
    serializer_class = KioskSessionSerializer
    permission_classes = [IsAuthenticated]

class ActivityLogViewSet(viewsets.ModelViewSet):
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer
    permission_classes = [IsAuthenticated]
