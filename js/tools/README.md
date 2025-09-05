# Tools Directory

This directory contains individual tool files for the Tools App. Each tool is a self-contained module that can be loaded dynamically.

## Structure

Each tool file should follow this pattern:
- **File naming**: `{tool-id}-tool.js`
- **Class naming**: `{ToolName}Tool` (PascalCase)
- **Global variable**: `{toolId}Tool` (camelCase)

## Tool Template

```javascript
/**
 * {Tool Name} Tool
 * Brief description of what the tool does
 */
class {ToolName}Tool {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Set up any event listeners for the tool
    }

    getPageHTML() {
        return `
            <!-- HTML content for the tool page -->
        `;
    }

    initialize() {
        // Optional: Initialize tool-specific functionality when page loads
    }
}

// Create global instance
const {toolId}Tool = new {ToolName}Tool();
```

## Required Methods

### `getPageHTML()`
Returns the HTML content for the tool's page. This method is called by the tool loader when the page is requested.

### `initialize()` (Optional)
Called after the page HTML is loaded. Use this for any initialization that needs to happen after the DOM elements are available.

## Event Handling

Tools should use global event listeners with specific selectors to avoid conflicts:

```javascript
document.addEventListener('input', (e) => {
    if (e.target.id === 'my-specific-input') {
        // Handle input
    }
});
```

## Available Tools

### Text Case Tool (`text-case-tool.js`)
Converts text between various case formats:
- UPPERCASE
- lowercase
- Title Case
- camelCase
- snake_case
- kebab-case

### Conversion Tool (`conversion-tool.js`)
Comprehensive unit conversion tool with 10 categories:
- Length (mm, cm, m, km, in, ft, yd, mi)
- Weight (mg, g, kg, oz, lb, st, t)
- Temperature (C, F, K, R)
- Area (mm², cm², m², km², in², ft², yd², ac, ha)
- Volume (ml, l, m³, cm³, in³, ft³, gal, qt, pt, fl oz)
- Time (ns, μs, ms, s, min, h, d, wk, mo, yr)
- Data Storage (b, B, KB, MB, GB, TB, PB)
- Speed (m/s, km/h, mph, ft/s, knot, c)
- Pressure (Pa, kPa, MPa, bar, atm, psi, torr)
- Energy (J, kJ, MJ, cal, kcal, Wh, kWh, BTU)

## Adding New Tools

1. Create a new file following the naming convention
2. Implement the required methods
3. Register the tool in `tool-loader.js`
4. Add navigation item in `index.html`
5. Update the home page in `app.js`

## Best Practices

- Keep tools self-contained and independent
- Use specific CSS classes and IDs to avoid conflicts
- Include proper error handling
- Add copy-to-clipboard functionality where appropriate
- Use the global notification system for user feedback
- Include sample data or placeholder text for better UX
