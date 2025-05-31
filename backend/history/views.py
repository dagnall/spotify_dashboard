from django.db.models import Sum, Max, Count
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
    
class AllAlbumsView(APIView):
    def get(self, request, format=None):
         # First, perform the query and annotate with lowercased fields
         albums = (
           ListeningHistory.objects
           .annotate(
               album_name_lower=Lower('album_name'),
               artist_name_lower=Lower('artist_name')
           )
           .values('album_name', 'artist_name', 'album_name_lower', 'artist_name_lower')
           .annotate(total_seconds=Sum('sec_played'))
           .order_by('-total_seconds')
         )
         albums = list(albums)
         
         # Post-process: merge albums that are the same based on normalized album and artist names.
         merged = {}
         for album in albums:
             # Create a composite key using the lowercased album name and artist name.
             key = (album['album_name_lower'], album['artist_name_lower'])
             if key in merged:
                 # Merge the playtime if the album already exists in the dictionary.
                 merged[key]['total_seconds'] += album['total_seconds']
             else:
                 # Copy the album data into the merged dict.
                 merged[key] = album.copy()
         
         # Remove the normalized fields if not needed by the frontend.
         for album in merged.values():
             del album['album_name_lower']
             del album['artist_name_lower']
         
         # Sort the merged albums by total seconds played descending.
         merged_albums = sorted(merged.values(), key=lambda x: x['total_seconds'], reverse=True)
         
         return Response(merged_albums)

class AllArtistsView(APIView):
    def get(self, request, format=None):
         # First, query and annotate the normalized artist name
         artists = (
           ListeningHistory.objects
           .annotate(artist_name_lower=Lower('artist_name'))
           .values('artist_name', 'artist_name_lower')
           .annotate(total_seconds=Sum('sec_played'))
           .order_by('-total_seconds')
         )
         artists = list(artists)
         
         # Post-process: merge entries that are the same when normalized
         merged = {}
         for artist in artists:
             key = artist['artist_name_lower']
             if key in merged:
                 merged[key]['total_seconds'] += artist['total_seconds']
             else:
                 merged[key] = artist.copy()
         
         # Remove the normalized field from the output
         for artist in merged.values():
             del artist['artist_name_lower']
         
         merged_artists = sorted(merged.values(), key=lambda x: x['total_seconds'], reverse=True)
         return Response(merged_artists)


class SongStatsView(APIView):
    def get(self, request, format=None):
        # Get the song parameters from the query string
        track = request.query_params.get('track')
        artist = request.query_params.get('artist')
        album = request.query_params.get('album')

        if not (track and artist and album):
            return Response({"error": "track, artist, and album parameters are required"}, status=400)
        
        # Filter listening history for this song using case-insensitive matching.
        qs = ListeningHistory.objects.filter(
            track_name__iexact=track,
            artist_name__iexact=artist,
            album_name__iexact=album
        )

        # Aggregate total seconds played for the song.
        total_seconds = qs.aggregate(total_seconds=Sum('sec_played'))['total_seconds'] or 0

        # Use the pre-computed fields directly.
        weekday_data = qs.values('weekday').annotate(count=Count('id')).order_by('weekday')
        hour_data = qs.values('hour').annotate(count=Count('id')).order_by('hour')
        year_data = qs.values('year').annotate(count=Count('id')).order_by('year')
        country_data = qs.values('country').annotate(count=Count('id')).order_by('-count')
        platform_data = qs.values('platform').annotate(count=Count('id')).order_by('-count')

        # Latest listens: get the 10 most recent entries.
        latest_listens = list(qs.order_by('-timestamp').values('timestamp', 'sec_played')[:10])

        data = {
            "track_name": track,
            "artist_name": artist,
            "album_name": album,
            "total_seconds": total_seconds,
            "weekday_distribution": list(weekday_data),
            "hour_distribution": list(hour_data),
            "year_distribution": list(year_data),
            "country_distribution": list(country_data),
            "platform_distribution": list(platform_data),
            "latest_listens": latest_listens
        }
        return Response(data)