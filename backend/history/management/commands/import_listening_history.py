# At the top of your management command file:
import os
import json
from django.core.management.base import BaseCommand
from history.models import ListeningHistory
from django.utils import timezone
from datetime import datetime, timezone as dt_timezone

class Command(BaseCommand):
    help = 'Import listening history data from JSON files located in the specified directory.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--json_dir',
            type=str,
            default='json',
            help='Directory containing the JSON files to import.'
        )

    def handle(self, *args, **options):
        json_dir = options['json_dir']

        if not os.path.isdir(json_dir):
            self.stdout.write(self.style.ERROR(f"Directory '{json_dir}' does not exist."))
            return

        json_files = [f for f in os.listdir(json_dir) if f.endswith('.json')]
        if not json_files:
            self.stdout.write(self.style.WARNING(f"No JSON files found in directory '{json_dir}'."))
            return

        total_imported = 0

        for filename in json_files:
            file_path = os.path.join(json_dir, filename)
            self.stdout.write(self.style.NOTICE(f"Importing data from {filename}..."))

            with open(file_path, 'r', encoding='utf-8') as f:
                try:
                    data = json.load(f)
                    if not isinstance(data, list):
                        self.stdout.write(self.style.ERROR(f"File '{filename}' is not formatted as a list. Skipping."))
                        continue

                    history_objects = []
                    for entry in data:
                        try:
                            # Parse timestamp string to datetime object
                            timestamp = datetime.strptime(entry['ts'], "%Y-%m-%dT%H:%M:%SZ")
                            # Make the timestamp timezone aware using Python's built-in UTC
                            timestamp = timezone.make_aware(timestamp, dt_timezone.utc)

                            history = ListeningHistory(
                                timestamp=timestamp,
                                platform=entry.get('platform', ''),
                                ms_played=entry.get('ms_played', 0),
                                spotify_track_uri=entry.get('spotify_track_uri', ''),
                                shuffle=entry.get('shuffle', False),
                                skipped=entry.get('skipped', False),
                                year=entry.get('year', 0),
                                month=entry.get('month', 0),
                                day=entry.get('day', 0),
                                country=entry.get('country', ''),
                                track_name=entry.get('track_name', ''),
                                artist_name=entry.get('artist_name', ''),
                                album_name=entry.get('album_name', ''),
                                weekday=entry.get('weekday', 0),
                                hour=entry.get('hour', 0),
                                sec_played=entry.get('sec_played', 0),
                            )
                            history_objects.append(history)
                        except Exception as e:
                            self.stdout.write(self.style.ERROR(f"Error processing an entry in '{filename}': {e}"))
                            continue

                    ListeningHistory.objects.bulk_create(history_objects)
                    count = len(history_objects)
                    total_imported += count
                    self.stdout.write(self.style.SUCCESS(f"Imported {count} entries from '{filename}'."))
                except json.JSONDecodeError as e:
                    self.stdout.write(self.style.ERROR(f"Error decoding JSON from file '{filename}': {e}"))
        self.stdout.write(self.style.SUCCESS(f"Total imported entries: {total_imported}"))
