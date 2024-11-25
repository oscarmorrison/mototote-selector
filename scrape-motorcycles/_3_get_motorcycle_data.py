import requests
import re
import base64
from bs4 import BeautifulSoup
import json
import _0_get_brands as get_brands


def split_make_and_model(model_name, brands):
    # Sort brands by length (longest first) to match multi-word brands first
    original_model_name = model_name  # Preserve the original case
    model_name = model_name.lower()  # Convert to lowercase for case-insensitive comparison

    # Check if any brand is in the model name (case-insensitive)
    for brand in brands:
        brand_lower = brand.lower()  # Convert brand to lowercase for comparison
        if brand_lower in model_name:
            # If found, split at the brand in the original case-sensitive model name
            model = original_model_name.replace(brand, '').strip()  # Preserve original case for the result
            return brand, model

    # If no brand is found, return the original model name with None as make
    return None, original_model_name


def rot13(s):
    return s.translate(
        str.maketrans(
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
            "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm",
        )
    )

def decode_value(value):
    try:
        # Base64 decoding
        base64_decoded = base64.b64decode(value).decode("utf-8")
        # JSON parsing
        json_decoded = json.loads(base64_decoded)
        # Apply ROT13
        return rot13(json_decoded)
    except json.JSONDecodeError as e:
        # If JSON parsing fails, try returning the base64 decoded string directly
        return rot13(base64_decoded)
    except Exception as e:
        print(f"Error decoding value: {value}")
        print(f"Error: {str(e)}")
        return None

def remove_spans(value):
    soup = BeautifulSoup(value, "html.parser")
    # Remove all <span> tags and their contents
    for span in soup.find_all("span"):
        span.decompose()
    # Return the cleaned text
    return soup.get_text(strip=True)

def get_dynamic_data(response):
    html_content = response.text
    data_array_match = re.search(r"var dataArray = (\[.*?\]);", html_content, re.DOTALL)
    if not data_array_match:
        return None
    data_array = json.loads(data_array_match.group(1))
    decoded_data = {}
    for obj in data_array:
        for key, encoded_value in obj.items():
            decoded_data[key] = decode_value(encoded_value)
    cleaned_data = {key: remove_spans(value) for key, value in decoded_data.items()}
    soup = BeautifulSoup(html_content, "html.parser")
    label_to_value = {}
    rows = soup.find_all("tr")
    for row in rows:
        label_tag = row.find("b")
        if not label_tag:
            continue
        label = label_tag.get_text(strip=True)
        span = row.find("span")
        if span and "class" in span.attrs:
            span_class = span["class"][0]
            if span_class in cleaned_data:
                label_to_value[label] = cleaned_data[span_class]
    motorcycle_data = {}
    motorcycle_data['type'] = next((label_to_value[key] for key in ['Category', 'Type'] if key in label_to_value), None)
    motorcycle_data['dry_weight'] = next((label_to_value[key] for key in ['Dry weight'] if key in label_to_value), None)
    motorcycle_data['wet_weight'] = next((label_to_value[key] for key in ['Weight incl. oil, gas, etc'] if key in label_to_value), None)
    motorcycle_data['wheelbase'] = next((label_to_value[key] for key in ['Wheelbase'] if key in label_to_value), None)
    motorcycle_data['reartyre'] = next((label_to_value[key] for key in ['Rear tire'] if key in label_to_value), None)
    motorcycle_data['fronttyre'] = next((label_to_value[key] for key in ['Front tire'] if key in label_to_value), None)

    # Find all JSON-LD scripts
    json_ld_matches = re.finditer(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', html_content, re.DOTALL)
    for match in json_ld_matches:
        try:
            json_ld_data = json.loads(match.group(1))
            # Only process the JSON-LD block with @type: Motorcycle
            if json_ld_data.get('@type') == 'Motorcycle':
                motorcycle_data['make'] = json_ld_data.get('brand', {}).get('name')
                motorcycle_data['model'] = json_ld_data.get('model')
                
                # Extract year from model if it exists
                if motorcycle_data['model']:
                    year_match = re.match(r'(\d{4})', motorcycle_data['model'])
                    if year_match:
                        motorcycle_data['year'] = year_match.group(1)
                break
        except json.JSONDecodeError:
            continue

    return motorcycle_data
    


def get_motorcycle_data(url, brands):
    response = requests.get(url)
    dynamic_data = get_dynamic_data(response)
    if dynamic_data:
        return dynamic_data
    
    soup = BeautifulSoup(response.content, 'html.parser')
    general = soup.find(id="GENERAL")
    if not general:
        return None
        
    table = general.find_parent('table')
    bike_data = {}
    
    # Extract data from table
    for row in table.find_all('tr'):
        th = row.find('th')
        if th:
            section = th.get_text(strip=True)
            section = 'General information' if section == 'General moped information' else section
            bike_data[section] = {}
        else:
            cols = row.find_all('td')
            if len(cols) == 2:
                key = cols[0].get_text(strip=True).replace(":", "")
                value = cols[1].get_text(strip=True)
                bike_data[section][key] = value
    
    # Get bike model text
    bike_model_text = next(
        (bike_data['General information'][key] 
         for key in ['Model name', 'Model', 'Motorcycle name'] 
         if key in bike_data['General information']), 
        None
    )
    
    [make, model] = split_make_and_model(bike_model_text, brands)
    
    # Create cleaned data dictionary
    cleaned_data = {
        'make': make,
        'model': model,
        'type': next((bike_data['General information'][key] for key in ['Type', 'Category'] if key in bike_data['General information']), None),
        'year': next((bike_data['General information'][key] for key in ['Year model', 'Year', 'Year of manufacture'] if key in bike_data['General information']), None)
    }
    
    # Add optional data if available
    if 'Physical measures and capacities' in bike_data:
        if 'Wheelbase' in bike_data['Physical measures and capacities']:
            cleaned_data['wheelbase'] = bike_data['Physical measures and capacities']['Wheelbase']
        if 'Dry weight' in bike_data['Physical measures and capacities']:
            cleaned_data['dry_weight'] = bike_data['Physical measures and capacities']['Dry weight']
        if 'Weight incl. oil, gas, etc' in bike_data['Physical measures and capacities']:
            cleaned_data['wet_weight'] = bike_data['Physical measures and capacities']['Weight incl. oil, gas, etc']
    
    if 'Chassis, suspension, brakes and wheels' in bike_data:
        cleaned_data['fronttyre'] = next(
            (bike_data['Chassis, suspension, brakes and wheels'][key] 
             for key in ['Front tire', 'Wheels'] 
             if key in bike_data['Chassis, suspension, brakes and wheels']),
            None
        )
        cleaned_data['reartyre'] = next(
            (bike_data['Chassis, suspension, brakes and wheels'][key] 
             for key in ['Rear tire', 'Wheels'] 
             if key in bike_data['Chassis, suspension, brakes and wheels']),
            None
        )
    
    return cleaned_data

brands = get_brands.get_brands()

# url = "https://bikez.com/motorcycles/ajp_pr7_650_adventure_2024.php"
# url = "https://bikez.com/motorcycles/aprilia_af1_125_futura_1991.php"
# url = "https://bikez.com/motorcycles/aprilia_etx_125_2000.php"
# data = get_motorcycle_data(url, brands)
# print(data)
# url = "https://bikez.com/motorcycles/yamaha_xsr900_2024.php"
# data = get_motorcycle_data(url, brands)
# print(data)

# url = "https://bikez.com/motorcycles/demak_dms_2014.php"
url = "https://bikez.com/motorcycles/yamaha_grizzly_350_2wd_2017.php"
data = get_motorcycle_data(url, brands)
print(json.dumps(data, indent=4))