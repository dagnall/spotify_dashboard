from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import ListeningHistory
from .serializers import ListeningHistorySerializer
from .filters import ListeningHistoryFilter

class ListeningHistoryListCreateView(generics.ListCreateAPIView):
    queryset = ListeningHistory.objects.all()
    serializer_class = ListeningHistorySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ListeningHistoryFilter
    search_fields = ['artist_name', 'track_name', 'album_name']
    ordering_fields = ['timestamp', 'artist_name', 'track_name']
    ordering = ['-timestamp']

class ListeningHistoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ListeningHistory.objects.all()
    serializer_class = ListeningHistorySerializer

class AllSongsView(APIView):
    def get(self, request, format=None):
        all_songs = (
            ListeningHistory.objects
            .values('track_name', 'artist_name', 'album_name')
            .annotate(total_seconds=Sum('sec_played'))
            .order_by('-total_seconds')
        )
        return Response(all_songs)


