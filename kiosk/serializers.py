from rest_framework import serializers
from .models import KioskSession, ActivityLog

class KioskSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = KioskSession
        fields = '__all__'

class ActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = '__all__'
