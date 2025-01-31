from rest_framework import generics
from .models import ListeningHistory
from .serializers import ListeningHistorySerializer

# API view for listing all entries and creating a new one
class ListeningHistoryListCreateView(generics.ListCreateAPIView):
    queryset = ListeningHistory.objects.all()
    serializer_class = ListeningHistorySerializer

# API view for retrieving, updating, and deleting a single entry
class ListeningHistoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ListeningHistory.objects.all()
    serializer_class = ListeningHistorySerializer

