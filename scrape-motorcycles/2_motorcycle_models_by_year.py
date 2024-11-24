import json
import requests
from bs4 import BeautifulSoup
import os
import re

# https://bikez.com/year/2000-motorcycle-models.php

def get_url(year):
    return f"https://bikez.com/year/{year}-motorcycle-models.php"

def parse_motorcycle_row(row, year):
    # Get all table cells
    cells = row.find_all('td')
    if not cells:  # No cells at all
        return None
        
    # Look for model link in any cell that has one
    model_link = None
    make = None
    
    for cell in cells:
        # Skip ad cells
        if 'data-freestar-ad' in cell.attrs or 'rowspan' in cell.attrs:
            continue
            
        # If cell has colspan=2, it contains both model and make
        if cell.get('colspan') == '2':
            model_link = cell.find('a')
            if model_link:
                make = model_link.text.split()[0]  # First word is usually the make
                break
        # Normal case: separate cells for model and make
        elif not model_link:
            model_link = cell.find('a')
        elif not make:
            make = cell.text.strip()
            break
    
    if not (model_link and make):
        return None
        
    # Add year validation using regex
    href = model_link['href']
    url_year_match = re.search(r'_(\d{4})\.php$', href)
    if not url_year_match or url_year_match.group(1) != str(year):
        return None
        
    # Clean up model name by removing make from the start
    model_name = model_link.text.strip()
    if model_name.lower().startswith(make.lower()):
        model_name = model_name[len(make):].strip()
    
    # Clean up URL by removing '..' and ensuring proper format
    href = model_link['href'].replace('..', '')
    model_url = f"https://bikez.com{href}"
    
    return {
        'make': make,
        'model': model_name,
        'year': year,
        'url': model_url
    }

def get_models_by_year(year):
    url = get_url(year)
    response = requests.get(url)
    html_output = response.content
    soup = BeautifulSoup(html_output, 'html.parser')
    
    # Find the zebra table and get all rows except header
    table = soup.find('table', class_='zebra')
    if not table:
        return []
        
    rows = table.find_all('tr')[1:]  # Skip the header row
    
    return [result for row in rows 
            if (result := parse_motorcycle_row(row, year)) is not None]

def save_motorcycles(motorcycles, year):
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    # Save to JSON file
    filename = f'data/{year}_motorcycles.json'
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(motorcycles, f, indent=2)
    print(f"Saved {len(motorcycles)} motorcycles to {filename}")

# Replace the test code with a year range loop
start_year = 1980
end_year = 2025

for year in range(start_year, end_year + 1):
    print(f"Processing year {year}...")
    try:
        motorcycles = get_models_by_year(year)
        save_motorcycles(motorcycles, year)
    except Exception as e:
        print(f"Error processing year {year}: {e}")