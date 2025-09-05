# Tools App

A modern, responsive web application built with HTML, CSS, and JavaScript using TailwindCSS and DaisyUI. This is a collection of useful tools for developers and content creators that can be run locally without any server setup.

## Features

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Multiple theme options with persistent storage
- **Smooth Animations**: Page transitions and hover effects
- **Accessible**: Built with accessibility in mind

### 🛠️ Available Tools

#### Text Tools
- **Text Case Converter**: Convert text between uppercase, lowercase, title case, and camelCase
- **Text Counter**: Analyze text with character, word, line, and paragraph counts
- **JSON Formatter**: Format and validate JSON with syntax highlighting

#### Utility Tools
- **Color Picker**: Pick colors and convert between HEX, RGB, and HSL formats
- **Base64 Encoder/Decoder**: Encode and decode text using Base64
- **URL Encoder/Decoder**: Encode and decode URLs

#### Development Tools
- **Regex Tester**: Test regular expressions with real-time matching
- **Hash Generator**: Generate MD5, SHA-1, SHA-256, and SHA-512 hashes

#### Database Tools
- **SQL Query Runner**: Execute SQL queries with real-time results and query history
- **Database Manager**: View database statistics, table information, and tool usage analytics
- **Backup & Restore**: Export and import database files for backup purposes

## Project Structure

```
Tools/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # Custom CSS styles
├── js/
│   ├── router.js           # Client-side routing system
│   ├── theme.js            # Theme management
│   ├── database.js         # SQLite database management using SQL.js
│   └── app.js              # Main application logic and page components
└── README.md               # This file
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs as a static file

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! The app is ready to use

### Usage
1. **Navigation**: Use the sidebar to navigate between different tools
2. **Mobile**: Tap the hamburger menu icon to access navigation on mobile devices
3. **Themes**: Click the theme button in the sidebar to cycle through available themes
4. **Copy to Clipboard**: Most tools have copy buttons for easy result copying

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup and modern features
- **CSS3**: Custom styles and animations
- **JavaScript (ES6+)**: Modern JavaScript with classes and async/await
- **TailwindCSS**: Utility-first CSS framework via CDN
- **DaisyUI**: Component library for TailwindCSS via CDN
- **Font Awesome**: Icons via CDN
- **SQL.js**: WebAssembly SQLite implementation for client-side database

### Architecture
- **Single Page Application (SPA)**: Client-side routing with hash-based navigation
- **Modular Design**: Separate files for routing, theming, database management, and application logic
- **Component-based**: Each tool is a self-contained component
- **Local Database**: SQLite database running in the browser using WebAssembly
- **No Dependencies**: Pure vanilla JavaScript, no build process required

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Database Features

The Tools app includes a built-in SQLite database that provides:

### Built-in Tables
- **tools_usage**: Tracks usage statistics for each tool
- **user_notes**: Store personal notes and documentation
- **query_history**: Logs all SQL queries with execution times

### Database Tools
1. **SQL Query Runner**: Execute any SQL query with real-time results
2. **Database Manager**: View statistics, table schemas, and data
3. **Backup & Restore**: Export/import database files

### Usage Tracking
The app automatically tracks:
- Tool usage frequency
- Last used timestamps
- Query execution times
- Database statistics

### Data Persistence
- Database is stored in browser memory
- Export/import functionality for backup
- No server required - everything runs locally

## Adding New Tools

To add a new tool to the application:

1. **Add Navigation Item**: Add a new menu item in `index.html`:
```html
<li><a href="#new-tool" class="nav-link" data-page="new-tool">
    <i class="fas fa-icon"></i>
    New Tool
</a></li>
```

2. **Register Route**: Add the route in `js/app.js`:
```javascript
router.register('new-tool', () => this.getNewToolPage());
```

3. **Create Page Component**: Add a new method in the `ToolsApp` class:
```javascript
getNewToolPage() {
    return `
        <div class="container mx-auto px-4 py-8">
            <!-- Your tool HTML here -->
        </div>
    `;
}
```

## Customization

### Themes
The app includes 30+ built-in DaisyUI themes. You can:
- Cycle through themes using the theme button
- Set a default theme by modifying `theme.js`
- Add custom themes by extending the `themes` array

### Styling
- Modify `styles/main.css` for custom styles
- Use TailwindCSS classes for component styling
- DaisyUI components can be customized with utility classes

### Adding Features
- **New Pages**: Follow the pattern in `app.js`
- **Global Features**: Add to the `ToolsApp` class initialization
- **Utilities**: Add helper functions to the appropriate files

## Performance

- **Fast Loading**: CDN resources load quickly
- **No Build Process**: Direct file execution
- **Efficient Routing**: Client-side routing with minimal overhead
- **Optimized Assets**: Minimal custom CSS and JavaScript

## Security

- **Client-Side Only**: No server-side processing
- **Local Storage**: Theme preferences stored locally
- **No External APIs**: All processing happens in the browser
- **Safe Operations**: All tools use standard web APIs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tool or improvement
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions, issues, or feature requests, please open an issue in the repository.

---

**Note**: This application is designed to run as a static file and doesn't require any server setup. Simply open `index.html` in your browser to start using the tools.
# ToolsApp
