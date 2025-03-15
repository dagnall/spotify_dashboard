from django.urls import path
from .views import ListeningHistoryListCreateView, ListeningHistoryDetailView, AllSongsView, AllAlbumsView

urlpatterns = [
    path('listening-history/', ListeningHistoryListCreateView.as_view(), name='listening-history-list'),
    path('listening-history/<int:pk>/', ListeningHistoryDetailView.as_view(), name='listening-history-detail'),
    path('all-songs/', AllSongsView.as_view(), name='all-songs'),
    path('all-albums/', AllAlbumsView.as_view(), name='all-albums'),
]
