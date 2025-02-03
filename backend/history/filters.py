import django_filters
from .models import ListeningHistory

class ListeningHistoryFilter(django_filters.FilterSet):
    artist_name = django_filters.CharFilter(field_name='artist_name', lookup_expr='icontains')
    track_name = django_filters.CharFilter(field_name='track_name', lookup_expr='icontains')
    country = django_filters.CharFilter(field_name='country', lookup_expr='icontains')
    platform = django_filters.CharFilter(field_name= 'platform', lookup_expr='icontains')

    class Meta:
        model = ListeningHistory
        fields = ['artist_name', 'track_name', 'country', 'platform', 'year']
