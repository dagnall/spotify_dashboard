from django.db import models

class ListeningHistory(models.Model):
    timestamp = models.DateTimeField(verbose_name="Timestamp")
    platform = models.CharField(max_length=50, verbose_name="Platform")
    ms_played = models.IntegerField(verbose_name="Milliseconds Played")
    spotify_track_uri = models.CharField(max_length=100, verbose_name="Sptofy Track URI")
    shuffle = models.BooleanField(verbose_name="Shuffle Enabled")
    skipped = models.BooleanField(verbose_name="Track Skipped")
    year = models.IntegerField(verbose_name="Year")
    month = models.IntegerField(verbose_name="Month")
    day = models.IntegerField(verbose_name="Day")
    country = models.CharField(max_length=10, verbose_name="Country")
    track_name = models.CharField(max_length=200, verbose_name="Track Name")
    artist_name = models.CharField(max_length=200, verbose_name= "Artist Name")
    album_name = models.CharField(max_length=200, verbose_name="Album Name")
    weekday = models.IntegerField(verbose_name="Weekday")
    hour = models.IntegerField(verbose_name="Hour")
    sec_played = models.IntegerField(verbose_name="Seconds Played")

    def __str__(self):
        return f"{self.track_name} by {self.artist_name} on {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"
