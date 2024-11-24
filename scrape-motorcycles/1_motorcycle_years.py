import requests
from bs4 import BeautifulSoup
import json

BASE_URL = 'https://bikez.com'
YEARS_URL = BASE_URL + '/years/index.php'

response = requests.get(YEARS_URL)
html_output = response.content
soup = BeautifulSoup(html_output, 'html.parser')

years_links = []
for year_link in soup.find_all('a'):
    text = year_link.get_text()
    if text.isdigit():
        link = year_link.get('href')
        clean_link = link.replace('../', '/')
        years_links.append({"year": text, "link": BASE_URL + clean_link})
        print(f"Year: {text}, Link: {BASE_URL + clean_link}")

# Sort the list by year (low to high)
years_links.sort(key=lambda x: int(x["year"]))

# Save to JSON file
with open('data/1_motorcycle_years.json', 'w') as f:
    json.dump(years_links, f, indent=4)
