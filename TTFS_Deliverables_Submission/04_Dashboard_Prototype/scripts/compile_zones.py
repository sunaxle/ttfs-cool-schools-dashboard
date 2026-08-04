import os
import json
import glob

# Paths
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(ROOT_DIR, 'data')
MASTER_JSON_PATH = os.path.join(DATA_DIR, 'campus_zones.json')

def load_json(filepath):
    with open(filepath, 'r') as f:
        return json.load(f)

def save_json(data, filepath):
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

def main():
    print("--- Cool Schools: Zone Compiler ---")
    
    # 1. Load Master JSON
    if os.path.exists(MASTER_JSON_PATH):
        master_data = load_json(MASTER_JSON_PATH)
    else:
        master_data = {"type": "FeatureCollection", "features": []}
    
    master_features = master_data.get('features', [])
    existing_ids = {f['properties'].get('id') for f in master_features if f['properties'].get('id')}

    # 2. Find all export files (assuming user saves them in data/schools/ or data/)
    export_files = glob.glob(os.path.join(DATA_DIR, '*_Zones.json'))
    
    if not export_files:
        print("No new *_Zones.json files found in the data/ directory.")
        return

    features_added = 0

    # 3. Merge new features
    for file in export_files:
        print(f"Processing {os.path.basename(file)}...")
        new_data = load_json(file)
        new_features = new_data.get('features', [])
        
        for feature in new_features:
            f_id = feature['properties'].get('id')
            if f_id and f_id not in existing_ids:
                master_features.append(feature)
                existing_ids.add(f_id)
                features_added += 1
        
        # Optional: move or delete the processed file to avoid re-processing
        # os.remove(file)
        
    master_data['features'] = master_features
    
    # 4. Save Master JSON
    save_json(master_data, MASTER_JSON_PATH)
    print(f"Successfully added {features_added} new zones to campus_zones.json!")

if __name__ == '__main__':
    main()
