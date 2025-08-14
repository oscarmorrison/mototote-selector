# MotoTote Vehicle Selector Widget

A comprehensive vehicle and motorcycle selector widget for Shopify themes. This widget helps customers find the right MotoTote carrier for their specific vehicle or motorcycle.

## Quick Installation

### Step 1: Upload Assets

1. Navigate to your Shopify admin panel
2. Go to **Online Store** > **Themes**
3. Click **Actions** > **Edit code**
4. In the **Assets** folder, upload all files from the `dist/` directory that start with `mototote-widget-`

### Step 2: Add Widget to Your Theme

Simply add these two lines to any template where you want the widget to appear:

```liquid
<script src="{{ 'mototote-widget.js' | asset_url }}"></script>
<mototote-widget></mototote-widget>
```

That's it! The widget will automatically load and display.

## Features

- **Vehicle Selection**: Support for 40+ vehicle makes (Acura, Audi, BMW, Ford, Honda, etc.)
- **Motorcycle Selection**: Support for 500+ motorcycle brands
- **Year-based Filtering**: Filter vehicles by year (2000-2025)
- **Model & Trim Selection**: Detailed model and trim options
- **Carrier Recommendations**: Automatic carrier suggestions based on vehicle specifications
- **Responsive Design**: Works on desktop and mobile devices
- **Easy Integration**: Simple installation on any Shopify theme

## Installation Details

### Required Files to Upload:
- `mototote-widget.js` (Main widget JavaScript)
- `mototote-widget-index.json` (Vehicle/motorcycle index)
- `mototote-widget-carrier-metrics.csv` (Carrier data)
- All `mototote-widget-vehicle-*.json` files (Vehicle data)
- All `mototote-widget-motorcycle-*.json` files (Motorcycle data)

### Where to Add the Code:

**Product Page Template (`product.liquid`):**
```liquid
{% comment %} Add this where you want the widget to appear {% endcomment %}
<script src="{{ 'mototote-widget.js' | asset_url }}"></script>
<mototote-widget></mototote-widget>
```

**Any Other Page Template:**
```liquid
<script src="{{ 'mototote-widget.js' | asset_url }}"></script>
<mototote-widget></mototote-widget>
```

## Advanced Configuration

For advanced customization, you can pass attributes to the widget:

```liquid
<mototote-widget
  product-id="{{ product.id }}"
  product-title="{{ product.title }}"
  default-type="vehicle"
  theme="light">
</mototote-widget>
```

## Widget Features

### Vehicle Selection
- **Make Selection**: Choose from 40+ vehicle makes
- **Year Filter**: Filter by year (2000-2025)
- **Model Selection**: Select specific model
- **Trim Selection**: Choose exact trim level
- **Automatic Carrier Matching**: Get carrier recommendations based on vehicle specs

### Motorcycle Selection
- **Brand Selection**: Choose from 500+ motorcycle brands
- **Year Filter**: Filter by year (1980-2025)
- **Model Selection**: Select specific model
- **Engine Size**: Filter by engine displacement
- **Carrier Compatibility**: Get compatible carrier options

### User Experience
- **Responsive Design**: Works on all screen sizes
- **Fast Loading**: Optimized data loading
- **Error Handling**: Graceful fallbacks for missing data
- **Accessibility**: WCAG compliant design

## Customization

### Styling
The widget uses CSS custom properties for easy theming. You can override these in your theme's CSS:

```css
:root {
  --mototote-primary-color: #007bff;
  --mototote-secondary-color: #6c757d;
  --mototote-success-color: #28a745;
  --mototote-danger-color: #dc3545;
  --mototote-border-radius: 4px;
  --mototote-font-family: inherit;
}
```

### Data Integration
The widget automatically loads vehicle and motorcycle data from the JSON files. To update the data:

1. Replace the JSON files in your Assets folder
2. Clear your browser cache
3. The widget will automatically use the new data

## Troubleshooting

### Widget Not Loading
1. Check that all required files are uploaded to Assets
2. Verify the file paths in your theme code
3. Check browser console for JavaScript errors
4. Ensure the widget element is properly placed

### Missing Vehicle/Motorcycle Data
1. Verify all JSON files are uploaded correctly
2. Check that the `mototote-widget-index.json` file is accessible
3. Clear browser cache and reload the page

### Styling Issues
1. Check for CSS conflicts with your theme
2. Verify the widget container has proper dimensions
3. Test on different screen sizes

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- **Initial Load**: ~186KB (gzipped)
- **Data Files**: ~2MB total (all vehicle/motorcycle data)
- **Loading Strategy**: Lazy loading of vehicle/motorcycle data
- **Caching**: Browser caching for optimal performance

## Support

For technical support or questions about the widget:

1. Check the browser console for error messages
2. Verify all installation steps were completed
3. Test with a different browser
4. Contact support with specific error details

## Changelog

### Version 1.0.0
- Initial release
- Support for 40+ vehicle makes
- Support for 500+ motorcycle brands
- Responsive design
- Shopify theme integration
- Simple web component installation

## Shopify CDN Usage

For Shopify themes, you can load the widget directly from the CDN without uploading assets:

```liquid
{% comment %} In your Shopify theme (e.g., theme.liquid or a section) {% endcomment %}
<link rel="preconnect" href="https://oscarmorrison.com">
<script type="module" src="https://oscarmorrison.com/mototote-selector/widget-main.js?v=2025-08-14" crossorigin="anonymous"></script>
<script type="module">
  import { initWidget } from 'https://oscarmorrison.com/mototote-selector/widget-main.js?v=2025-08-14';
  const el = document.querySelector('[data-mototote]');
  if (el) initWidget(el, { make: el.dataset.make, type: el.dataset.type });
</script>

{% comment %} Add this element where you want the widget to appear {% endcomment %}
<div data-mototote data-make="ford" data-type="vehicle"></div>
```

### CDN Benefits
- **No Asset Upload**: Load directly from GitHub Pages
- **Automatic Updates**: Deployments automatically update the CDN
- **Global CDN**: Fast loading worldwide
- **Version Control**: Use `?v=YYYYMMDD` for cache-busting

### Usage Options
```liquid
{% comment %} Vehicle selector {% endcomment %}
<div data-mototote data-make="honda" data-type="vehicle"></div>

{% comment %} Motorcycle selector {% endcomment %}
<div data-mototote data-make="yamaha" data-type="motorcycle"></div>

{% comment %} Dynamic make from product {% endcomment %}
<div data-mototote data-make="{{ product.vendor | downcase }}" data-type="vehicle"></div>
```

## License

This widget is proprietary software. Unauthorized distribution or modification is prohibited.
