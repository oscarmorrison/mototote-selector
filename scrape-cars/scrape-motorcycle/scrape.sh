#!/bin/bash

# Define the base URL
BASE_URL="https://www.autoevolution.com/moto/"

# Create a directory to store the downloaded pages
mkdir -p autoevolution_moto_pages

# Use wget to download the website recursively
wget --recursive --no-clobber --page-requisites --html-extension \
     --convert-links --domains=autoevolution.com --no-parent \
     --directory-prefix=autoevolution_moto_pages "$BASE_URL"