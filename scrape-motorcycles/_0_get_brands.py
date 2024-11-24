import requests
from bs4 import BeautifulSoup
import re
import json
import os

def get_brands():
    json_path = 'data/0_motorcycle_brands.json'
    
    # Check if JSON file already exists
    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    # If file doesn't exist, scrape the data
    brands_url = "https://bikez.com/brands/index.php"
    brands_response = requests.get(brands_url)
    brands_content = brands_response.content
    brands_soup = BeautifulSoup(brands_content, 'html.parser')

    # Find the section containing the list of brands
    table = brands_soup.find('table', {'class': 'zebra'})
    brands = []

    # Extract all 'a' tags within the table and get their text
    if table:
        for link in table.find_all('a'):
            brand_name = link.text.strip()
            if brand_name:
                brands.append(re.sub(r" motorcycles", "", brand_name))

    # Sort the brands alphabetically
    brands = sorted(brands)

    # Save to JSON file
    os.makedirs(os.path.dirname(json_path), exist_ok=True)  # Create data directory if it doesn't exist
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(brands, f, indent=4)
    
    return brands

if __name__ == "__main__":
    brands = get_brands()
