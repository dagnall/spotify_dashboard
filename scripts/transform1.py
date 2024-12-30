# this script creates new keys for weekday, hour and seconds played
# then removes the spotify:track from the uri key
# then creates new transformed_data1.json file
import json
from datetime import datetime

def add_derived_fields(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for record in data:
        # parse timestamp
        ts_str = record["ts"]
        
        dt = datetime.strptime(ts_str, "%Y-%m-%dT%H:%M:%SZ")
        
        # add weekday (monday=0, sunday=6)
        record["weekday"] = dt.weekday()
        
        # add hour (0–23)
        record["hour"] = dt.hour
        
        # add sec_played
        ms = record.get("ms_played", 0)
        record["sec_played"] = ms // 1000

        # safely modify spotify_track_uri if it's present and not none
        uri = record.get("spotify_track_uri")
        if uri is not None and isinstance(uri, str) and uri.startswith("spotify:track:"):
            record["spotify_track_uri"] = uri.replace("spotify:track:", "")
      
    # write out the transformed data
    with open(output_file, 'w', encoding='utf-8') as out:
        json.dump(data, out, ensure_ascii=False, indent=2)

# usage
input_filename = "transformed_data0.json"
output_filename = "transformed_data1.json"
add_derived_fields(input_filename, output_filename)
