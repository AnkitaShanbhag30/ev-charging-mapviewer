import csv
import json

csv_file_path = 'yourFilePath.csv' # change to the appropriate file_path for your device
json_file_path = 'jurisdictions.json' # change to the appropriate file_path for your device

# initialize counties and counters
counties = {}
county_id_counter = 1000
city_id_counter = 0

# Read CSV file into memory
with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        county_name = row['COUNTY'].strip()
        city_name = row['CITY'].strip()
        if county_name not in counties:
            county_id = f"CA{county_id_counter:04}"
            counties[county_name] = {
                'id': county_id,
                'name': county_name,
                'available': False,
                'cities': []
            }
            county_id_counter += 1
        county_data = counties[county_name]
        if city_name:  # Ensure city_name is not empty
            city_id = f"CA{city_id_counter:04}"
            county_data['cities'].append({
                'id': city_id,
                'name': city_name,
                'available': False
            })
            city_id_counter += 1

# Add an Unincorporated to each county, except for SF
for county in counties.values():
    if county['name'] != "San Francisco County":
        city_id = f"CA{city_id_counter:04}"
        county['cities'].append({
            'id': city_id,
            'name': 'Unincorporated',
            'available': False
        })
        city_id_counter += 1

# Convert counties dictionary to a sorted list
result = sorted(counties.values(), key=lambda x: x['name'])

# Write to JSON file
with open(json_file_path, 'w', encoding='utf-8') as jsonfile:
    json.dump(result, jsonfile, ensure_ascii=False, indent=2)

# Set an entire county as available
def set_county_available(county_name):
    with open(json_file_path, 'r', encoding='utf-8') as jsonfile:
        data = json.load(jsonfile)
    found_county = False
    for county in data:
        if county['name'].lower() == county_name.lower():
            county['available'] = True
            found_county = True
            for city in county['cities']:
                city['available'] = True
    if found_county:
        with open(json_file_path, 'w', encoding='utf-8') as jsonfile:
            json.dump(data, jsonfile, ensure_ascii=False, indent=2)
        print(f'Successfully set "{county_name}" and all its cities to available: true in {json_file_path}')
    else:
        print(f'County "{county_name}" not found in the JSON data.')