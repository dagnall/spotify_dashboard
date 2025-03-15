from django.db.models import Sum, Max
from django.db.models.functions import Lower
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import ListeningHistory
from .serializers import ListeningHistorySerializer
from .filters import ListeningHistoryFilter
import re

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

def normalize_track_name(track_name):
    """
    Normalize the track name by removing any leading roman numeral prefixes.
    For example, "I. Flight of the Navigator" becomes "flight of the navigator".
    """
    # Remove patterns like "I. ", "II. ", etc.
    normalized = re.sub(r'^[IVXLCDM]+\.\s+', '', track_name, flags=re.IGNORECASE)
    return normalized.strip().lower()

class AllSongsView(APIView):
    def get(self, request, format=None):
         # First, aggregate the songs using lower() for basic normalization on each field.
         songs = (
           ListeningHistory.objects
           .annotate(
               track_name_lower=Lower('track_name'),
               artist_name_lower=Lower('artist_name'),
               album_name_lower=Lower('album_name')
           )
           .values('track_name', 'artist_name', 'album_name',
                   'track_name_lower', 'artist_name_lower', 'album_name_lower')
           .annotate(total_seconds=Sum('sec_played'))
           .order_by('-total_seconds')
         )
         songs = list(songs)
         
         # Now, post-process to merge songs that are actually the same, using a normalized key.
         merged = {}
         for song in songs:
             # Normalize the track name further to remove leading markers like "I."
             norm_track = normalize_track_name(song['track_name'])
             # Also normalize the artist name (basic lowercasing and stripping whitespace)
             norm_artist = song['artist_name'].strip().lower()
             
             # Use a composite key: normalized track name and normalized artist.
             key = (norm_track, norm_artist)
             
             if key in merged:
                 # Merge: sum the seconds played.
                 merged[key]['total_seconds'] += song['total_seconds']
                 # Optionally, choose a display version—here we keep the one already stored.
             else:
                 # Copy the song data into the merged dict.
                 merged[key] = song.copy()
         
         # Convert the merged dictionary to a list and sort by total seconds descending.
         merged_songs = sorted(merged.values(), key=lambda x: x['total_seconds'], reverse=True)
         
         return Response(merged_songs)

# class AllSongsView(APIView):
#     def get(self, request, format=None):
#          all_songs = (
#            ListeningHistory.objects
#            .annotate(
#                track_name_lower=Lower('track_name'),
#                artist_name_lower=Lower('artist_name'),
#                album_name_lower=Lower('album_name')
#            )
#            .values('track_name_lower', 'artist_name_lower', 'album_name_lower')
#            .annotate(
#               total_seconds=Sum('sec_played'),
#               track_name=Max('track_name'),       # Preserves a display version
#               artist_name=Max('artist_name'),
#               album_name=Max('album_name')
#            )
#            .order_by('-total_seconds')
#          )
#          # Remove normalized fields from the output if you don't need them
#          for song in all_songs:
#              del song['track_name_lower']
#              del song['artist_name_lower']
#              del song['album_name_lower']
#          return Response(all_songs)



