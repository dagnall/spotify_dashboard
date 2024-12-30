import json

def print_unique_platforms(input_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    platforms = set()
    
    for record in data:
        # Make sure the 'platform' key is present
        if "platform" in record:
            platforms.add(record["platform"])
    
    # Print each unique platform
    for p in platforms:
        print(p)

# Usage
input_filename = "transformed_data2.json"  # replace with your current file
print_unique_platforms(input_filename)
