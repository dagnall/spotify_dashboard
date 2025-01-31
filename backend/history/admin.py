from django.contrib import admin
from .models import ListeningHistory

@admin.register(ListeningHistory)
class ListeningHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'track_name', 'artist_name', 'timestamp', 'platform', 'country')
    search_fields = ('track_name', 'artist_name', 'spotify_track_uri')
    list_filter = ('platform', 'country', 'year', 'month')
    date_hierarchy = 'timestamp'
