import json
import random

def generate_grid():
    # Bowie Elementary coords
    center_lng = -98.1836
    center_lat = 26.1947
    
    # Approx degrees for 1 meter
    lng_step = 0.00001
    lat_step = 0.000009
    
    grid_size = 40
    
    # Start coordinates (bottom-left)
    start_lng = center_lng - (grid_size / 2) * lng_step
    start_lat = center_lat - (grid_size / 2) * lat_step
    
    features = []
    
    for i in range(grid_size):
        for j in range(grid_size):
            # Coordinates for this cell
            cell_lng_min = start_lng + i * lng_step
            cell_lat_min = start_lat + j * lat_step
            cell_lng_max = cell_lng_min + lng_step
            cell_lat_max = cell_lat_min + lat_step
            
            # Bowie stats: canopy: 3%, asphalt: 82%, grass: 15%
            rand = random.random() * 100
            if rand < 3:
                surface = "Canopy"
            elif rand < 85:
                surface = "Asphalt/Concrete"
            else:
                surface = "Grass/Turf"
                
            feature = {
                "type": "Feature",
                "properties": {
                    "campus_id": "bowie",
                    "surface_class": surface,
                    "estimated_temp_f": 85 if surface == "Canopy" else (120 if surface == "Asphalt/Concrete" else 95)
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [cell_lng_min, cell_lat_min],
                        [cell_lng_max, cell_lat_min],
                        [cell_lng_max, cell_lat_max],
                        [cell_lng_min, cell_lat_max],
                        [cell_lng_min, cell_lat_min]
                    ]]
                }
            }
            features.append(feature)
            
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }
    
    with open('data/bowie_grid.geojson', 'w') as f:
        json.dump(geojson, f)

if __name__ == "__main__":
    generate_grid()
