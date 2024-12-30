# this script checks for entries that have null in the uri field
# then prints them in the terminal

import json

input_file = "transformed_data0.json"

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

for i, record in enumerate(data):
    if record.get("spotify_track_uri") is None:
        print(f"Record {i} has None for spotify_track_uri:", record)


