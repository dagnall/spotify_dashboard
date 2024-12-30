# this script standardises all the platform names

import json

def normalize_platforms(input_file, output_file):
    # Define mapping of old platform values to new platform values.

    platform_map = {
        "iOS 9.3.3 (iPad5,3)": "iOS",
        "Windows 10 (10.0.18362; x64)": "PC/Laptop",
        "Windows 10 (10.0.19042; x64)": "PC/Laptop",
        "Android OS 11 API 30 (samsung, SM-G986B)": "Mobile",
        "Partner google cast_voice;Google_Nest_Mini;;4.5.0--1.54.250118": "Google Nest",
        "Android OS 9 API 28 (samsung, SM-G950F)": "Mobile",
        "Android OS 13 API 33 (Google, Pixel 4a (5G))": "Mobile",
        "Partner google cast_voice;Google_Home;;5.4.1--1.54.277099": "Google Nest",
        "WebPlayer (websocket RFC6455)": "PC/Laptop",
        "iOS 14.4.2 (iPad13,2)": "iOS",
        "iOS 10.0.2 (iPad5,3)": "iOS",
        "Android OS 5.0.2 API 21 (samsung, SM-A300FU)": "Mobile",
        "Windows 10 (10.0.15063; x64)": "PC/Laptop",
        "Android OS 9 API 28 (Google, Pixel 3 XL)": "Mobile",
        "Windows 10 (10.0.17134; x64)": "PC/Laptop",
        "windows": "PC/Laptop",
        "Partner google cast_voice;Google_Home;;4.1.6--1.50.229149": "Google Nest",
        "Android OS 6.0.1 API 23 (samsung, SM-A300FU)": "Mobile",
        "Partner google cast_tv;Chromecast;;1.22.77272": "Chromecast",
        "Android OS 10 API 29 (Google, Pixel 3 XL)": "Mobile",
        "Android-tablet OS 8.1.0 API 27 (samsung, SM-T580)": "Mobile",
        "cast": "Chromecast",
        "android": "Mobile",
        "Partner google cast_voice;Google_Nest_Mini;;5.1.0--1.54.250118": "Google Nest",
        "Windows 10 (10.0.19044; x64)": "PC/Laptop",
        "Partner amazon_fireos Amazon;AEOBC;;": "Firestick",
        "Android OS 10 API 29 (samsung, SM-G986B)": "Mobile",
        "Partner google cast_voice;Google_Nest_Mini;;5.15.0--1.56.500000": "Google Nest",
        "Windows 10 (10.0.14393; x64)": "PC/Laptop",
        "Windows 8 (6.2.9200; x64)": "PC/Laptop",
        "Windows 10 (10.0.18363; x64)": "PC/Laptop",
        "iOS 9.3.2 (iPad5,3)": "iOS",
        "Windows 7 (6.1.7601; x64; SP1; S)": "PC/Laptop",
        "Partner amazon_salmon Amazon;AEOBC;;": "Amazon Echo",
        "Partner amazon_salmon Amazon;Echo_Dot;;": "Amazon Echo",
        "Partner amazon_salmon Amazon;Echo_Dot;27d4dfe427b34d57995b463e5d63198d;;tpapi": "Amazon Echo",
        "Windows 10 (10.0.16299; x64)": "PC/Laptop",
        "Windows Phone 8.0 ARM": "Mobile",
        "Partner google cast_tv;Chromecast;;5.8.1--1.56.500000": "Chromecast",
        "Android OS 7.1.2 API 25 (Google, Pixel XL)": "Mobile",
        "Android OS 11 API 30 (Google, Pixel 4a (5G))": "Mobile",
        "Partner google cast_voice;Google_Home;;4.5.0--1.54.250118": "Chromecast",
        "Android OS 6.0.1 API 23 (samsung, SM-G920F)": "Mobile",
        "Partner google cast_voice;Google_Nest_Mini;;4.1.6--1.50.229149": "Google Nest",
        "iOS 8.3 (iPad5,3)": "iOS",
        "iOS 15.2.1 (iPad13,2)": "iOS",
        "Partner google cast_voice;Google_Nest_Mini;;4.3.2--1.50.229149": "Google Nest",
        "Partner google cast_voice;Google_Home;;4.3.2--1.50.229149": "Google Nest",
        "OS X 10.9.4 [x86 4]": "iOS",
        "Android OS 8.1.0 API 27 (Google, Pixel XL)": "Mobile",
        "ios": "iOS",
        "Windows 10 (10.0.10586; x64)": "PC/Laptop",
        "Android OS 12 API 31 (Google, Pixel 4a (5G))": "PC/Laptop",
        "Windows 10 (10.0.10240; x64)": "PC/Laptop",
        "Android OS 12 API 32 (Google, Pixel 4a (5G))": "Mobile",
        "Android OS 11 API 30 (Google, Pixel 3 XL)": "Mobile"
    }

    # Read the existing JSON data
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Iterate through records and replace 'platform' using the map
    for record in data:
        if "platform" in record:
            old_platform = record["platform"]
            # Check if we have a new name for this platform
            if old_platform in platform_map:
                record["platform"] = platform_map[old_platform]
            else:
                pass

    # Write out the updated JSON data
    with open(output_file, 'w', encoding='utf-8') as out:
        json.dump(data, out, ensure_ascii=False, indent=2)

# Usage
input_filename = "transformed_data2.json"
output_filename = "transformed_data3.json"
normalize_platforms(input_filename, output_filename)
