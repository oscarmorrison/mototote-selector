# MotoTote Widget Setup Guide

This guide explains how to set up the MotoTote Widget as an embeddable component for Shopify websites without AJAX or cross-origin issues.

## Features

- ✅ **No AJAX calls** - All data is bundled inline
- ✅ **No cross-origin issues** - Self-contained web component
- ✅ **Shopify compatible** - Works with Shopify's CSP restrictions
- ✅ **Responsive design** - Works on all device sizes
- ✅ **Red button styling** - Matches your brand colors

## Quick Setup

### 1. Build the Widget

```bash
# Install dependencies (if not already done)
yarn install

# Bundle data and build widget
yarn build:widget
```

This will:
- Bundle all vehicle and motorcycle data into a single JSON file
- Build the widget as a UMD module
- Generate `dist/mototote-widget.js`

### 2. Upload to Shopify

1. Go to your Shopify admin → Online Store → Themes
2. Click "Actions" → "Edit code"
3. In the Assets folder, upload `dist/mototote-widget.js`
4. Open your theme's `theme.liquid` file (or specific page template)
5. Add this script tag in the `<head>` section:

```html
<script src="{{ 'mototote-widget.js' | asset_url }}"></script>
```

### 3. Add the Widget

Add this HTML element where you want the widget to appear:

```html
<mototote-widget></mototote-widget>
```

## Example Implementation

### For a Product Page

Add to your product template (e.g., `product.liquid`):

```html
{% comment %} Add this in the head section {% endcomment %}
<script src="{{ 'mototote-widget.js' | asset_url }}"></script>

{% comment %} Add this where you want the widget {% endcomment %}
<div class="mototote-widget-section">
  <h2>Find Your Perfect Motorcycle Carrier</h2>
  <mototote-widget></mototote-widget>
</div>
```

### For a Custom Page

Create a new page template or add to an existing page:

```html
{% comment %} In your page template {% endcomment %}
<script src="{{ 'mototote-widget.js' | asset_url }}"></script>

<div class="page-width">
  <mototote-widget></mototote-widget>
</div>
```

## Widget Features

The widget includes:

- **Vehicle Selection**: Choose make, year, model, and trim
- **Motorcycle Selection**: Choose motorcycle brand, year, and model
- **Manual Input**: Enter motorcycle specifications manually
- **Carrier Recommendations**: Get personalized carrier suggestions
- **Compatibility Checking**: Verify towing capacity and tongue weight
- **Responsive Design**: Works on desktop, tablet, and mobile

## Styling

The widget comes with built-in styling that:
- Uses red buttons (#cc0000) with black hover (#000000)
- Has rounded, pill-shaped buttons
- Uses Helvetica font family
- Is fully responsive
- Includes proper focus states for accessibility

## Customization

### CSS Customization

The widget uses Shadow DOM, so you can customize it by targeting the `:host` selector:

```css
mototote-widget {
  --button-primary-bg: #your-color;
  --button-primary-bg-hover: #your-hover-color;
}
```

### Data Updates

To update vehicle or motorcycle data:

1. Run the data scraping scripts in the `scrape-cars/` and `scrape-motorcycles/` folders
2. Rebuild the widget: `yarn build:widget`
3. Upload the new `mototote-widget.js` file to Shopify

## Troubleshooting

### Widget Not Loading

- Check that the script is loaded before the widget element
- Verify the file path in Shopify assets
- Check browser console for errors

### Styling Issues

- The widget uses Shadow DOM, so external CSS won't affect it
- Use CSS custom properties for customization
- Ensure the widget element has proper dimensions

### Performance

- The widget bundles all data inline, so initial load may be larger
- Consider lazy loading the script for better performance
- The widget is optimized for production builds

## Development

### Local Development

```bash
# Start development server
yarn dev

# View demo page
open widget-demo.html
```

### Building for Production

```bash
# Build widget with bundled data
yarn build:widget

# Test the built widget
open widget-demo.html
```

## File Structure

```
mototote-selector/
├── src/
│   ├── Widget.jsx              # Main widget component
│   ├── WidgetWebComponent.jsx  # Web component wrapper
│   ├── widget-main.jsx         # Widget entry point
│   ├── data/
│   │   └── bundled-data.json   # Bundled vehicle/motorcycle data
│   └── utils/
│       └── data-utils.js       # Data access utilities
├── dist/
│   └── mototote-widget.js      # Built widget file
├── scripts/
│   └── bundle-data.js          # Data bundling script
└── widget-demo.html            # Demo page
```

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify all files are properly uploaded to Shopify
3. Test with the demo page first
4. Ensure your Shopify theme supports custom elements
