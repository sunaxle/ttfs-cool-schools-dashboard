import json
import random

# Target Campus Coordinates
center_lng = -98.0520
center_lat = 26.1704

# Read original
with open('data/mock_observations.json', 'r') as f:
    data = json.load(f)

# Shift all features to be randomly clustered around the target campus
for feature in data.get('features', []):
    # Random offset roughly within 300 meters
    lng_offset = random.uniform(-0.003, 0.003)
    lat_offset = random.uniform(-0.003, 0.003)
    
    feature['geometry']['coordinates'] = [center_lng + lng_offset, center_lat + lat_offset]

# Write back
with open('data/mock_observations.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Adjusted mock_observations.json to target campus.")
