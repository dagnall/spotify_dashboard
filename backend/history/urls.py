from django.urls import path
from .views import ListeningHistoryListCreateView, ListeningHistoryDetailView, AllSongsView, AllAlbumsView, AllArtistsView, SongStatsView, ArtistStatsView

urlpatterns = [
    path('listening-history/', ListeningHistoryListCreateView.as_view(), name='listening-history-list'),
    path('listening-history/<int:pk>/', ListeningHistoryDetailView.as_view(), name='listening-history-detail'),
    path('all-songs/', AllSongsView.as_view(), name='all-songs'),
    path('all-albums/', AllAlbumsView.as_view(), name='all-albums'),
    path('all-artists/', AllArtistsView.as_view(), name='all-artists'),
    path('song-stats/', SongStatsView.as_view(), name='song-stats'),
    path('artist-stats/', ArtistStatsView.as_view(), name='artist-stats'),
]
