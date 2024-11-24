import json
import sys
import os
from concurrent.futures import ThreadPoolExecutor, as_completed
from _3_get_motorcycle_data import get_motorcycle_data
from _0_get_brands import get_brands

# Configuration
PROCESS_ONLY_MISSING_DATA = True  # Set to False to process all motorcycles

def process_single_motorcycle(motorcycle, brands):
    # Skip if we only want missing data and this motorcycle already has data
    if PROCESS_ONLY_MISSING_DATA and 'data' in motorcycle:
        return motorcycle

    if 'url' in motorcycle:
        try:
            print(f"Processing: {motorcycle['url']}")
            motorcycle_data = get_motorcycle_data(motorcycle['url'], brands)
            if motorcycle_data:
                motorcycle['data'] = motorcycle_data
        except Exception as e:
            print(f"Error processing {motorcycle['url']}: {str(e)}")
    return motorcycle

def update_json_with_data(json_file_path):
    # Load existing JSON data
    try:
        with open(json_file_path, 'r') as f:
            motorcycles = json.load(f)
    except FileNotFoundError:
        print(f"Error: File {json_file_path} not found")
        return
    except json.JSONDecodeError:
        print(f"Error: File {json_file_path} is not valid JSON")
        return

    # Get brands once to avoid multiple calls
    brands = get_brands()
    
    # Process motorcycles in parallel
    with ThreadPoolExecutor(max_workers=40) as executor:
        future_to_motorcycle = {
            executor.submit(process_single_motorcycle, motorcycle, brands): motorcycle 
            for motorcycle in motorcycles
        }
        
        updated_motorcycles = []
        for future in as_completed(future_to_motorcycle):
            updated_motorcycles.append(future.result())
    
    # Save updated JSON
    try:
        with open(json_file_path, 'w') as f:
            json.dump(updated_motorcycles, f, indent=2)
        print(f"Successfully updated {json_file_path}")
    except Exception as e:
        print(f"Error saving file: {str(e)}")

def process_path(path):
    if os.path.isfile(path):
        if path.endswith('.json'):
            print(f"Processing file: {path}")
            update_json_with_data(path)
        else:
            print(f"Skipping non-JSON file: {path}")
    elif os.path.isdir(path):
        print(f"Processing directory: {path}")
        for filename in os.listdir(path):
            if filename.endswith('.json'):
                full_path = os.path.join(path, filename)
                print(f"Processing file: {full_path}")
                update_json_with_data(full_path)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python 4_get_data_for_json.py <path>")
        print("Path can be either a JSON file or a directory containing JSON files")
        sys.exit(1)
    
    input_path = sys.argv[1]
    if not os.path.exists(input_path):
        print(f"Error: Path {input_path} does not exist")
        sys.exit(1)
    
    process_path(input_path)
