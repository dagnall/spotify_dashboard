from django.urls import path
from .views import ListeningHistoryListCreateView, ListeningHistoryDetailView, TopSongsView

urlpatterns = [
    path('listening-history/', ListeningHistoryListCreateView.as_view(), name='listening-history-list'),
    path('listening-history/<int:pk>/', ListeningHistoryDetailView.as_view(), name='listening-history-detail'),
    path('top-songs/', TopSongsView.as_view(), name='top-songs'),
]
