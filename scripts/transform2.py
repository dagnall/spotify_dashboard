# this script removes any entries that have null for their uri entries

import json

input_file = "transformed_data1.json"
output_file = "transformed_data2.json"

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

filtered_data = [
    record for record in data 
    if not (
        record.get("spotify_track_uri") is None and
        record.get("track_name") is None and
        record.get("artist_name") is None and
        record.get("album_name") is None
    )
]

# Write out the filtered data
with open(output_file, 'w', encoding='utf-8') as out:
    json.dump(filtered_data, out, ensure_ascii=False, indent=2)

print(f"Filtered data saved to {output_file}")
print(f"Original count: {len(data)}")
print(f"Filtered count: {len(filtered_data)}")
