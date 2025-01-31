from rest_framework import serializers
from .models import ListeningHistory

class ListeningHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ListeningHistory
        fields = '__all__'  # This includes all model fields. You can adjust if needed.
