import json

# Define the fields that you expect each record to have
EXPECTED_FIELDS = [
    "ts",
    "username",
    "platform",
    "ms_played",
    "conn_country",
    "ip_addr_decrypted",
    "user_agent_decrypted",
    "master_metadata_track_name",
    "master_metadata_album_artist_name",
    "master_metadata_album_album_name",
    "spotify_track_uri",
    "episode_name",
    "episode_show_name",
    "spotify_episode_uri",
    "reason_start",
    "reason_end",
    "shuffle",
    "skipped",
    "offline",
    "offline_timestamp",
    "incognito_mode"
]

# Function to clean data
def clean_data(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # Use a set to track unique entries
    # Decide what makes a record unique - here we're using `ts` and `spotify_track_uri`.
    # If `spotify_track_uri` can be null (e.g. podcasts), you might combine other keys.
    seen = set()
    cleaned_data = []
    
    for record in data:
        # Ensure all expected fields exist, and if missing, fill with None
        for field in EXPECTED_FIELDS:
            if field not in record:
                record[field] = None
        
        # Create a unique key for deduplication
        # Example: (timestamp, track_uri) as a unique identifier
        # If track_uri is empty for certain records, consider using track_name + artist + ts
        unique_key = (record["ts"], record["spotify_track_uri"])
        
        if unique_key not in seen:
            seen.add(unique_key)
            cleaned_data.append(record)
        else:
            # This record is a duplicate, we skip it
            pass
    
    # Write out the cleaned data
    with open(output_file, 'w', encoding='utf-8') as out:
        json.dump(cleaned_data, out, ensure_ascii=False, indent=2)

    print(f"Original count: {len(data)}")
    print(f"Cleaned count (duplicates removed): {len(cleaned_data)}")


# Example usage
input_filename = "master_data.json"
output_filename = "cleaned_data.json"

clean_data(input_filename, output_filename)
