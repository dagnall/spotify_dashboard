import json

def count_json_entries(json_file):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        print(f"{json_file} contains {len(data)} entries.")

# Usage:
count_json_entries("transformed_data3.json")