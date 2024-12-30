import json
import glob

# Replace these with the actual paths or pattern matching your files
json_files = ["2014_2017.json", "2017_2019.json", "2019_2022.json", "2022_2024.json", "2024.json"]

combined_data = []

# Loop through each file and load the data
for file in json_files:
    with open(file, "r", encoding="utf-8") as f:
        data = json.load(f)
        
        # Assuming each file contains a list of track plays
        if isinstance(data, list):
            combined_data.extend(data)
        else:
            # If the file isn't a list, you may need to adjust how data is combined.
            # For now, just append if it's a single object
            combined_data.append(data)

# Write out the combined list to a new JSON file
with open("master_data.json", "w", encoding="utf-8") as out_file:
    json.dump(combined_data, out_file, ensure_ascii=False, indent=2)

print("Combined JSON file created: master_data.json")
