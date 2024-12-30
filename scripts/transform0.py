# this script takes the initially cleaned data (cleaned_data.json) from
# jsonclean.py script and removes unnecessary keys, renames remaining keys,
# and creates day, month, and year columns

import json
from datetime import datetime

def transform_and_rename_data(input_file, output_file):

    # keys to be renamed
    rename_map = {
        "conn_country": "country",
        "master_metadata_track_name": "track_name",
        "master_metadata_album_artist_name": "artist_name",
        "master_metadata_album_album_name": "album_name",
    }

    # keys to be removed
    keys_to_remove = [
        "ip_addr",
        "episode_name",
        "episode_show_name",
        "spotify_episode_uri",
        "reason_start",
        "reason_end",
        "offline",
        "offline_timestamp",
        "incognito_mode",
        "username",
        "ip_addr_decrypted",
        "user_agent_decrypted",
    ]

    transformed_data = []

    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

        # this loop strips timestamp into day, month and year
        # then inserts values into new columns
        # then removes unwanted keys
        # then renames keys
        # then adds each entry to transformed_data array
        for record in data:

            ts_str = record["ts"]
            dt = datetime.strptime(ts_str, "%Y-%m-%dT%H:%M:%SZ")

            record["year"] = dt.year
            record["month"] = dt.month
            record["day"] = dt.day

            for key in keys_to_remove:
                if key in record:
                    del record[key]

            for old_key, new_key in rename_map.items():
                if old_key in record:
                    record[new_key] = record.pop(old_key)

            transformed_data.append(record)

    # new json created
    with open(output_file, 'w', encoding='utf-8') as out:
        json.dump(transformed_data, out, ensure_ascii=False, indent=2)

    print(f"Transformed data saved to {output_file}")


input_filename = "cleaned_data.json"
output_filename = "transformed_data0.json"
transform_and_rename_data(input_filename, output_filename)


