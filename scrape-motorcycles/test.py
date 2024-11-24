from _0_get_brands import get_brands

# Get the brands using the imported function
brands = get_brands()

# Example usage
print("List of Motorcycle Brands:")
for brand in brands:
    print(f"- {brand}")

print(f"\nTotal number of brands: {len(brands)}")
