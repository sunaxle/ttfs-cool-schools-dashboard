import json
import random

def point_in_polygon(x, y, poly):
    n = len(poly)
    inside = False
    p1x, p1y = poly[0]
    for i in range(1, n + 1):
        p2x, p2y = poly[i % n]
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xints = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or x <= xints:
                        inside = not inside
        p1x, p1y = p2x, p2y
    return inside

# Load zones
with open('data/campus_zones.json', 'r') as f:
    zones_data = json.load(f)

boundary_poly = None
invalid_polys = []

for feature in zones_data['features']:
    cat = feature['properties'].get('category', '')
    coords = feature['geometry']['coordinates'][0] # Outer ring
    
    if "Campus Boundary" in cat:
        boundary_poly = coords
    elif "Building" in cat or "Roof" in cat or "Parking" in cat or "Asphalt" in cat:
        invalid_polys.append(coords)

if not boundary_poly:
    print("Could not find Campus Boundary")
    exit(1)

# Get bounding box of campus boundary
min_x = min(p[0] for p in boundary_poly)
max_x = max(p[0] for p in boundary_poly)
min_y = min(p[1] for p in boundary_poly)
max_y = max(p[1] for p in boundary_poly)

# Load observations
with open('data/mock_observations.json', 'r') as f:
    obs_data = json.load(f)

for feature in obs_data['features']:
    valid = False
    while not valid:
        x = random.uniform(min_x, max_x)
        y = random.uniform(min_y, max_y)
        
        # Must be inside campus
        if point_in_polygon(x, y, boundary_poly):
            valid = True
            # Must NOT be inside a building or parking lot
            for inv_poly in invalid_polys:
                if point_in_polygon(x, y, inv_poly):
                    valid = False
                    break
        
        if valid:
            feature['geometry']['coordinates'] = [x, y]

with open('data/mock_observations.json', 'w') as f:
    json.dump(obs_data, f, indent=2)

print("Successfully distributed biodiversity observations exclusively to green spaces and courtyards within the campus.")
