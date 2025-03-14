import json
import sqlite3
from datetime import datetime

def load_data_into_db(json_file, db_file):
    # Connect to SQLite
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    
    # Create the table (if it doesn't exist) 
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS plays (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            played_at DATETIME,
            ts TEXT,
            platform TEXT,
            ms_played INTEGER,
            spotify_track_uri TEXT,
            shuffle BOOLEAN,
            skipped BOOLEAN,
            year INTEGER,
            month INTEGER,
            day INTEGER,
            country TEXT,
            track_name TEXT,
            artist_name TEXT,
            album_name TEXT,
            weekday INTEGER,
            hour INTEGER,
            sec_played INTEGER
        )
    """)
    
    # Load the JSON data
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    # Insert rows
    for record in data:
        # Parse the ts string into a Python datetime (assuming format "2014-09-20T14:06:16Z")
        ts_str = record["ts"]
        dt = datetime.strptime(ts_str, "%Y-%m-%dT%H:%M:%SZ")
        
        # Format it to a string that SQLite can interpret as datetime 
        # e.g., "YYYY-MM-DD HH:MM:SS"
        played_at_str = dt.strftime("%Y-%m-%d %H:%M:%S")
        
        cursor.execute("""
            INSERT INTO plays 
            (played_at, ts, platform, ms_played, spotify_track_uri,
             shuffle, skipped, year, month, day, country, track_name,
             artist_name, album_name, weekday, hour, sec_played)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            played_at_str,
            record.get("ts"),
            record.get("platform"),
            record.get("ms_played"),
            record.get("spotify_track_uri"),
            record.get("shuffle"),
            record.get("skipped"),
            record.get("year"),
            record.get("month"),
            record.get("day"),
            record.get("country"),
            record.get("track_name"),
            record.get("artist_name"),
            record.get("album_name"),
            record.get("weekday"),
            record.get("hour"),
            record.get("sec_played")
        ))
    
    # Commit and close
    conn.commit()
    conn.close()

# Usage
json_file = "final_data.json"
db_file = "my_spotify.db"
load_data_into_db(json_file, db_file)
