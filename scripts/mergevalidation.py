import json

def verify_combined_data(original_files, combined_file):
    total_entries = 0
    
    # Count entries in each original file
    for filename in original_files:
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
            # Assuming each file contains a list of entries
            count = len(data)
            print(f"{filename}: {count} entries")
            total_entries += count
    
    # Count entries in the combined file
    with open(combined_file, 'r', encoding='utf-8') as f:
        combined_data = json.load(f)
        combined_count = len(combined_data)
    
    print(f"Total entries in original files: {total_entries}")
    print(f"Entries in combined file: {combined_count}")
    
    # Compare totals
    if total_entries == combined_count:
        print("Data Matches :)")
    else:
        print("Data does not match :(")

# Example usage:
original_files_list = ["2014_2017.json", "2017_2019.json", "2019_2022.json", "2022_2024.json", "2024.json"]
combined_filename = "master_data.json"

verify_combined_data(original_files_list, combined_filename)
