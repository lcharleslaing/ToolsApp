/**
 * Main application file for Tools App
 */
class ToolsApp {
    constructor() {
        this.pages = new Map();
        this.init();
    }

    init() {
        // Register all pages
        this.registerPages();

        // Initialize the app
        this.initializeApp();
    }

    registerPages() {
        // Home page
        router.register('home', () => this.getHomePage());

        // Text tools
        router.register('text-case', () => this.getTextCasePage());
        router.register('text-counter', () => this.getTextCounterPage());
        router.register('json-formatter', () => this.getJsonFormatterPage());

        // Utility tools
        router.register('color-picker', () => this.getColorPickerPage());
        router.register('base64', () => this.getBase64Page());
        router.register('url-encoder', () => this.getUrlEncoderPage());

        // Development tools
        router.register('regex-tester', () => this.getRegexTesterPage());
        router.register('hash-generator', () => this.getHashGeneratorPage());

        // Database tools
        router.register('sql-query', () => this.getSqlQueryPage());
        router.register('db-manager', () => this.getDbManagerPage());
        router.register('db-backup', () => this.getDbBackupPage());

        // 404 page
        router.register('404', () => this.get404Page());
    }

    initializeApp() {
        // Add any global event listeners
        this.setupGlobalEventListeners();

        // Initialize tool-specific functionality
        this.initializeTools();

        console.log('Tools App initialized successfully');
    }

    setupGlobalEventListeners() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search (future feature)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                // TODO: Implement search functionality
            }
        });
    }

    initializeTools() {
        // Initialize any global tool functionality
        this.setupCopyToClipboard();
        this.setupNotifications();
        this.setupTextCaseConverter();
    }

    setupCopyToClipboard() {
        // Add copy to clipboard functionality for all copy buttons
        document.addEventListener('click', async (e) => {
            if (e.target.matches('.copy-btn') || e.target.closest('.copy-btn')) {
                const button = e.target.matches('.copy-btn') ? e.target : e.target.closest('.copy-btn');
                let textToCopy = '';

                // Try to get the text from the data-copy attribute first
                const dataCopy = button.getAttribute('data-copy');
                if (dataCopy) {
                    // If it's a JavaScript expression, evaluate it
                    if (dataCopy.startsWith('document.getElementById')) {
                        try {
                            textToCopy = eval(dataCopy);
                        } catch (err) {
                            console.error('Error evaluating data-copy:', err);
                        }
                    } else {
                        textToCopy = dataCopy;
                    }
                }

                // Fallback to previous sibling input value
                if (!textToCopy) {
                    const input = button.previousElementSibling;
                    if (input && input.value !== undefined) {
                        textToCopy = input.value;
                    } else if (input && input.textContent) {
                        textToCopy = input.textContent;
                    }
                }

                if (textToCopy) {
                    try {
                        await navigator.clipboard.writeText(textToCopy);
                        this.showNotification('Copied to clipboard!', 'success');
                    } catch (err) {
                        this.showNotification('Failed to copy to clipboard', 'error');
                    }
                }
            }
        });
    }

    setupNotifications() {
        // Create notification container if it doesn't exist
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'toast toast-top toast-end';
            document.body.appendChild(container);
        }
    }

    setupTextCaseConverter() {
        // Set up text case converter functionality
        document.addEventListener('input', (e) => {
            if (e.target.id === 'text-input') {
                console.log('Text input detected:', e.target.value);
                this.convertTextCase(e.target.value);
            }
        });
    }

    convertTextCase(text) {
        console.log('Converting text case for:', text);

        // Uppercase
        const uppercaseOutput = document.getElementById('uppercase-output');
        if (uppercaseOutput) {
            uppercaseOutput.value = text.toUpperCase();
            console.log('Set uppercase:', text.toUpperCase());
        } else {
            console.log('Uppercase output element not found');
        }

        // Lowercase
        const lowercaseOutput = document.getElementById('lowercase-output');
        if (lowercaseOutput) lowercaseOutput.value = text.toLowerCase();

        // Title Case
        const titlecaseOutput = document.getElementById('titlecase-output');
        if (titlecaseOutput) {
            titlecaseOutput.value = text.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

        // Camel Case
        const camelcaseOutput = document.getElementById('camelcase-output');
        if (camelcaseOutput) {
            camelcaseOutput.value = text.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '');
        }

        // Snake Case
        const snakecaseOutput = document.getElementById('snakecase-output');
        if (snakecaseOutput) {
            snakecaseOutput.value = text.replace(/\W+/g, '_')
                .replace(/([a-z\d])([A-Z])/g, '$1_$2')
                .toLowerCase();
        }

        // Kebab Case
        const kebabcaseOutput = document.getElementById('kebabcase-output');
        if (kebabcaseOutput) {
            kebabcaseOutput.value = text.replace(/\W+/g, '-')
                .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                .toLowerCase();
        }
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');

        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        notification.className = `alert alert-${type} notification-enter`;
        notification.innerHTML = `
            <i class="${icons[type] || icons.info}"></i>
            <span>${message}</span>
        `;

        container.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('notification-exit');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Page components
    getHomePage() {
        return `
            <div class="hero min-h-96 bg-gradient-to-r from-primary to-secondary text-primary-content">
                <div class="hero-content text-center">
                    <div class="max-w-md">
                        <h1 class="text-5xl font-bold">Welcome to Tools App</h1>
                        <p class="py-6">A collection of useful web tools for developers and content creators.</p>
                        <button class="btn btn-primary btn-lg" onclick="router.navigate('#text-case')">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="container mx-auto px-4 py-8">
                <h2 class="text-3xl font-bold text-center mb-8">Available Tools</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Text Tools -->
                    <div class="tool-card card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-primary">
                                <i class="fas fa-text-height"></i>
                                Text Tools
                            </h3>
                            <p class="text-base-content/70">Convert text case, count characters, format JSON, and more.</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary btn-sm" onclick="router.navigate('#text-case')">
                                    Try Now
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Utility Tools -->
                    <div class="tool-card card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-secondary">
                                <i class="fas fa-tools"></i>
                                Utility Tools
                            </h3>
                            <p class="text-base-content/70">Color picker, Base64 encoder, URL encoder, and more.</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-secondary btn-sm" onclick="router.navigate('#color-picker')">
                                    Try Now
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Development Tools -->
                    <div class="tool-card card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-accent">
                                <i class="fas fa-code"></i>
                                Development Tools
                            </h3>
                            <p class="text-base-content/70">Regex tester, hash generator, and other developer utilities.</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-accent btn-sm" onclick="router.navigate('#regex-tester')">
                                    Try Now
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Database Tools -->
                    <div class="tool-card card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-info">
                                <i class="fas fa-database"></i>
                                Database Tools
                            </h3>
                            <p class="text-base-content/70">SQL query runner, database manager, and backup/restore functionality.</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-info btn-sm" onclick="router.navigate('#sql-query')">
                                    Try Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getTextCasePage() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-text-height text-primary"></i>
                        Text Case Converter
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Input Text</h2>
                                <textarea 
                                    id="text-input" 
                                    class="textarea textarea-bordered h-32" 
                                    placeholder="Enter your text here..."
                                >Hello World! This is a sample text for testing the case converter.</textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('text-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm copy-btn" data-copy="document.getElementById('text-input').value">
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Converted Text</h2>
                                <div class="space-y-4">
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">UPPERCASE</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="uppercase-output" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary copy-btn" data-copy="document.getElementById('uppercase-output').value">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">lowercase</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="lowercase-output" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary copy-btn" data-copy="document.getElementById('lowercase-output').value">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Title Case</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="titlecase-output" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary copy-btn" data-copy="document.getElementById('titlecase-output').value">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">camelCase</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="camelcase-output" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary copy-btn" data-copy="document.getElementById('camelcase-output').value">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">snake_case</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="snakecase-output" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary copy-btn" data-copy="document.getElementById('snakecase-output').value">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">kebab-case</span>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" id="kebabcase-output" class="input input-bordered flex-1" readonly />
                                            <button class="btn btn-primary copy-btn" data-copy="document.getElementById('kebabcase-output').value">
                                                <i class="fas fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        `;
    }

    getTextCounterPage() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-calculator text-primary"></i>
                        Text Counter
                    </h1>
                    
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h2 class="card-title">Text Analysis</h2>
                            <textarea 
                                id="counter-input" 
                                class="textarea textarea-bordered h-64" 
                                placeholder="Enter your text here for analysis..."
                            ></textarea>
                            
                            <div class="stats stats-vertical lg:stats-horizontal shadow mt-6">
                                <div class="stat">
                                    <div class="stat-title">Characters</div>
                                    <div class="stat-value text-primary" id="char-count">0</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-title">Words</div>
                                    <div class="stat-value text-secondary" id="word-count">0</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-title">Lines</div>
                                    <div class="stat-value text-accent" id="line-count">0</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-title">Paragraphs</div>
                                    <div class="stat-value text-info" id="paragraph-count">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
                document.getElementById('counter-input').addEventListener('input', function() {
                    const text = this.value;
                    
                    // Character count
                    document.getElementById('char-count').textContent = text.length;
                    
                    // Word count
                    const words = text.trim().split(/\\s+/).filter(word => word.length > 0);
                    document.getElementById('word-count').textContent = words.length;
                    
                    // Line count
                    const lines = text.split('\\n').length;
                    document.getElementById('line-count').textContent = lines;
                    
                    // Paragraph count
                    const paragraphs = text.split('\\n\\n').filter(p => p.trim().length > 0).length;
                    document.getElementById('paragraph-count').textContent = paragraphs;
                });
            </script>
        `;
    }

    getJsonFormatterPage() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-6xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-code text-primary"></i>
                        JSON Formatter
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Input JSON</h2>
                                <textarea 
                                    id="json-input" 
                                    class="textarea textarea-bordered h-96 font-mono" 
                                    placeholder="Paste your JSON here..."
                                ></textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('json-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" onclick="formatJson()">
                                        Format
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Formatted JSON</h2>
                                <pre id="json-output" class="code-block h-96 overflow-auto"></pre>
                                <div class="card-actions justify-end mt-4">
                                    <button class="btn btn-primary btn-sm copy-btn" data-copy="document.getElementById('json-output').textContent">
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
                function formatJson() {
                    const input = document.getElementById('json-input').value;
                    const output = document.getElementById('json-output');
                    
                    try {
                        const parsed = JSON.parse(input);
                        const formatted = JSON.stringify(parsed, null, 2);
                        output.textContent = formatted;
                        output.className = 'code-block h-96 overflow-auto text-success';
                    } catch (error) {
                        output.textContent = 'Error: ' + error.message;
                        output.className = 'code-block h-96 overflow-auto text-error';
                    }
                }
            </script>
        `;
    }

    getColorPickerPage() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-palette text-primary"></i>
                        Color Picker & Converter
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Color Picker</h2>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Choose a color</span>
                                    </label>
                                    <input type="color" id="color-picker" class="input input-bordered h-16" value="#3b82f6" />
                                </div>
                                
                                <div class="mt-6 space-y-4">
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">HEX</span>
                                        </label>
                                        <input type="text" id="hex-value" class="input input-bordered" readonly />
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">RGB</span>
                                        </label>
                                        <input type="text" id="rgb-value" class="input input-bordered" readonly />
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">HSL</span>
                                        </label>
                                        <input type="text" id="hsl-value" class="input input-bordered" readonly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Color Preview</h2>
                                <div id="color-preview" class="w-full h-32 rounded-lg border-2 border-base-300 mb-4"></div>
                                
                                <div class="space-y-2">
                                    <button class="btn btn-primary btn-sm copy-btn w-full" data-copy="document.getElementById('hex-value').value">
                                        Copy HEX
                                    </button>
                                    <button class="btn btn-secondary btn-sm copy-btn w-full" data-copy="document.getElementById('rgb-value').value">
                                        Copy RGB
                                    </button>
                                    <button class="btn btn-accent btn-sm copy-btn w-full" data-copy="document.getElementById('hsl-value').value">
                                        Copy HSL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
                document.getElementById('color-picker').addEventListener('input', function() {
                    const color = this.value;
                    updateColorValues(color);
                });
                
                function updateColorValues(hex) {
                    // Update preview
                    document.getElementById('color-preview').style.backgroundColor = hex;
                    
                    // Convert to RGB
                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);
                    
                    // Update values
                    document.getElementById('hex-value').value = hex.toUpperCase();
                    document.getElementById('rgb-value').value = \`rgb(\${r}, \${g}, \${b})\`;
                    
                    // Convert to HSL
                    const hsl = rgbToHsl(r, g, b);
                    document.getElementById('hsl-value').value = \`hsl(\${hsl.h}, \${hsl.s}%, \${hsl.l}%)\`;
                }
                
                function rgbToHsl(r, g, b) {
                    r /= 255;
                    g /= 255;
                    b /= 255;
                    
                    const max = Math.max(r, g, b);
                    const min = Math.min(r, g, b);
                    let h, s, l = (max + min) / 2;
                    
                    if (max === min) {
                        h = s = 0;
                    } else {
                        const d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        
                        switch (max) {
                            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                            case g: h = (b - r) / d + 2; break;
                            case b: h = (r - g) / d + 4; break;
                        }
                        h /= 6;
                    }
                    
                    return {
                        h: Math.round(h * 360),
                        s: Math.round(s * 100),
                        l: Math.round(l * 100)
                    };
                }
                
                // Initialize with default color
                updateColorValues('#3b82f6');
            </script>
        `;
    }

    getBase64Page() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-key text-primary"></i>
                        Base64 Encoder/Decoder
                    </h1>
                    
                    <div class="tabs tabs-boxed mb-6">
                        <a class="tab tab-active" onclick="switchTab('encode')">Encode</a>
                        <a class="tab" onclick="switchTab('decode')">Decode</a>
                    </div>
                    
                    <div id="encode-tab" class="tab-content">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Text to Base64</h2>
                                <textarea 
                                    id="encode-input" 
                                    class="textarea textarea-bordered h-32" 
                                    placeholder="Enter text to encode..."
                                ></textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('encode-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" onclick="encodeBase64()">
                                        Encode
                                    </button>
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">Base64 Output</span>
                                    </label>
                                    <textarea id="encode-output" class="textarea textarea-bordered h-32" readonly></textarea>
                                    <button class="btn btn-primary btn-sm copy-btn mt-2" data-copy="document.getElementById('encode-output').value">
                                        Copy Result
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="decode-tab" class="tab-content hidden">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Base64 to Text</h2>
                                <textarea 
                                    id="decode-input" 
                                    class="textarea textarea-bordered h-32" 
                                    placeholder="Enter Base64 to decode..."
                                ></textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('decode-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" onclick="decodeBase64()">
                                        Decode
                                    </button>
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">Decoded Text</span>
                                    </label>
                                    <textarea id="decode-output" class="textarea textarea-bordered h-32" readonly></textarea>
                                    <button class="btn btn-primary btn-sm copy-btn mt-2" data-copy="document.getElementById('decode-output').value">
                                        Copy Result
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
                function switchTab(tab) {
                    // Update tab buttons
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));
                    event.target.classList.add('tab-active');
                    
                    // Show/hide content
                    document.getElementById('encode-tab').classList.toggle('hidden', tab !== 'encode');
                    document.getElementById('decode-tab').classList.toggle('hidden', tab !== 'decode');
                }
                
                function encodeBase64() {
                    const input = document.getElementById('encode-input').value;
                    const encoded = btoa(unescape(encodeURIComponent(input)));
                    document.getElementById('encode-output').value = encoded;
                }
                
                function decodeBase64() {
                    const input = document.getElementById('decode-input').value;
                    try {
                        const decoded = decodeURIComponent(escape(atob(input)));
                        document.getElementById('decode-output').value = decoded;
                    } catch (error) {
                        document.getElementById('decode-output').value = 'Error: Invalid Base64 string';
                    }
                }
            </script>
        `;
    }

    getUrlEncoderPage() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-link text-primary"></i>
                        URL Encoder/Decoder
                    </h1>
                    
                    <div class="tabs tabs-boxed mb-6">
                        <a class="tab tab-active" onclick="switchUrlTab('encode')">Encode</a>
                        <a class="tab" onclick="switchUrlTab('decode')">Decode</a>
                    </div>
                    
                    <div id="url-encode-tab" class="tab-content">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">URL Encode</h2>
                                <textarea 
                                    id="url-encode-input" 
                                    class="textarea textarea-bordered h-32" 
                                    placeholder="Enter URL or text to encode..."
                                ></textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('url-encode-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" onclick="encodeUrl()">
                                        Encode
                                    </button>
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">Encoded URL</span>
                                    </label>
                                    <textarea id="url-encode-output" class="textarea textarea-bordered h-32" readonly></textarea>
                                    <button class="btn btn-primary btn-sm copy-btn mt-2" data-copy="document.getElementById('url-encode-output').value">
                                        Copy Result
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="url-decode-tab" class="tab-content hidden">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">URL Decode</h2>
                                <textarea 
                                    id="url-decode-input" 
                                    class="textarea textarea-bordered h-32" 
                                    placeholder="Enter encoded URL to decode..."
                                ></textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('url-decode-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" onclick="decodeUrl()">
                                        Decode
                                    </button>
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">Decoded URL</span>
                                    </label>
                                    <textarea id="url-decode-output" class="textarea textarea-bordered h-32" readonly></textarea>
                                    <button class="btn btn-primary btn-sm copy-btn mt-2" data-copy="document.getElementById('url-decode-output').value">
                                        Copy Result
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
                function switchUrlTab(tab) {
                    // Update tab buttons
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));
                    event.target.classList.add('tab-active');
                    
                    // Show/hide content
                    document.getElementById('url-encode-tab').classList.toggle('hidden', tab !== 'encode');
                    document.getElementById('url-decode-tab').classList.toggle('hidden', tab !== 'decode');
                }
                
                function encodeUrl() {
                    const input = document.getElementById('url-encode-input').value;
                    const encoded = encodeURIComponent(input);
                    document.getElementById('url-encode-output').value = encoded;
                }
                
                function decodeUrl() {
                    const input = document.getElementById('url-decode-input').value;
                    try {
                        const decoded = decodeURIComponent(input);
                        document.getElementById('url-decode-output').value = decoded;
                    } catch (error) {
                        document.getElementById('url-decode-output').value = 'Error: Invalid encoded URL';
                    }
                }
            </script>
        `;
    }

    getRegexTesterPage() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-6xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-search text-primary"></i>
                        Regex Tester
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Pattern & Test String</h2>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Regular Expression</span>
                                    </label>
                                    <input type="text" id="regex-pattern" class="input input-bordered font-mono" placeholder="Enter regex pattern..." />
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">Test String</span>
                                    </label>
                                    <textarea id="test-string" class="textarea textarea-bordered h-32" placeholder="Enter text to test against the regex..."></textarea>
                                </div>
                                <div class="form-control mt-4">
                                    <label class="label">
                                        <span class="label-text">Flags</span>
                                    </label>
                                    <div class="flex gap-4">
                                        <label class="label cursor-pointer">
                                            <input type="checkbox" id="flag-g" class="checkbox checkbox-sm" checked />
                                            <span class="label-text ml-2">Global (g)</span>
                                        </label>
                                        <label class="label cursor-pointer">
                                            <input type="checkbox" id="flag-i" class="checkbox checkbox-sm" />
                                            <span class="label-text ml-2">Ignore case (i)</span>
                                        </label>
                                        <label class="label cursor-pointer">
                                            <input type="checkbox" id="flag-m" class="checkbox checkbox-sm" />
                                            <span class="label-text ml-2">Multiline (m)</span>
                                        </label>
                                    </div>
                                </div>
                                <button class="btn btn-primary mt-4" onclick="testRegex()">
                                    Test Regex
                                </button>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Results</h2>
                                <div id="regex-results" class="min-h-64">
                                    <p class="text-base-content/70">Enter a regex pattern and test string to see results.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
                function testRegex() {
                    const pattern = document.getElementById('regex-pattern').value;
                    const testString = document.getElementById('test-string').value;
                    const resultsDiv = document.getElementById('regex-results');
                    
                    if (!pattern || !testString) {
                        resultsDiv.innerHTML = '<p class="text-warning">Please enter both a pattern and test string.</p>';
                        return;
                    }
                    
                    try {
                        // Get flags
                        let flags = '';
                        if (document.getElementById('flag-g').checked) flags += 'g';
                        if (document.getElementById('flag-i').checked) flags += 'i';
                        if (document.getElementById('flag-m').checked) flags += 'm';
                        
                        const regex = new RegExp(pattern, flags);
                        const matches = testString.match(regex);
                        const globalMatches = [...testString.matchAll(regex)];
                        
                        let html = '<div class="space-y-4">';
                        
                        // Show if pattern matches
                        if (matches) {
                            html += '<div class="alert alert-success"><i class="fas fa-check-circle"></i> Pattern matches!</div>';
                            
                            // Show matches
                            html += '<div><h3 class="font-bold mb-2">Matches:</h3>';
                            globalMatches.forEach((match, index) => {
                                html += \`<div class="badge badge-primary mr-2 mb-2">\${match[0]}</div>\`;
                            });
                            html += '</div>';
                            
                            // Show match details
                            html += '<div><h3 class="font-bold mb-2">Match Details:</h3>';
                            globalMatches.forEach((match, index) => {
                                html += \`<div class="bg-base-200 p-2 rounded mb-2">
                                    <div class="text-sm">Match \${index + 1}: "\${match[0]}"</div>
                                    <div class="text-xs text-base-content/70">Index: \${match.index}, Length: \${match[0].length}</div>
                                </div>\`;
                            });
                            html += '</div>';
                        } else {
                            html += '<div class="alert alert-error"><i class="fas fa-times-circle"></i> No matches found.</div>';
                        }
                        
                        html += '</div>';
                        resultsDiv.innerHTML = html;
                        
                    } catch (error) {
                        resultsDiv.innerHTML = \`<div class="alert alert-error"><i class="fas fa-exclamation-triangle"></i> Invalid regex: \${error.message}</div>\`;
                    }
                }
            </script>
        `;
    }

    getHashGeneratorPage() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-fingerprint text-primary"></i>
                        Hash Generator
                    </h1>
                    
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h2 class="card-title">Generate Hashes</h2>
                            <textarea 
                                id="hash-input" 
                                class="textarea textarea-bordered h-32" 
                                placeholder="Enter text to generate hashes..."
                            ></textarea>
                            
                            <div class="card-actions justify-between mt-4">
                                <button class="btn btn-outline btn-sm" onclick="document.getElementById('hash-input').value = ''">
                                    Clear
                                </button>
                                <button class="btn btn-primary btn-sm" onclick="generateHashes()">
                                    Generate Hashes
                                </button>
                            </div>
                            
                            <div class="mt-6 space-y-4">
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">MD5</span>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" id="md5-output" class="input input-bordered flex-1 font-mono" readonly />
                                        <button class="btn btn-primary copy-btn" data-copy="document.getElementById('md5-output').value">
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">SHA-1</span>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" id="sha1-output" class="input input-bordered flex-1 font-mono" readonly />
                                        <button class="btn btn-primary copy-btn" data-copy="document.getElementById('sha1-output').value">
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">SHA-256</span>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" id="sha256-output" class="input input-bordered flex-1 font-mono" readonly />
                                        <button class="btn btn-primary copy-btn" data-copy="document.getElementById('sha256-output').value">
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">SHA-512</span>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" id="sha512-output" class="input input-bordered flex-1 font-mono" readonly />
                                        <button class="btn btn-primary copy-btn" data-copy="document.getElementById('sha512-output').value">
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
                async function generateHashes() {
                    const input = document.getElementById('hash-input').value;
                    
                    if (!input) {
                        alert('Please enter some text to hash.');
                        return;
                    }
                    
                    try {
                        // Convert string to ArrayBuffer
                        const encoder = new TextEncoder();
                        const data = encoder.encode(input);
                        
                        // Generate hashes
                        const md5Hash = await crypto.subtle.digest('SHA-1', data).then(hash => {
                            // Note: MD5 is not available in Web Crypto API, using SHA-1 as fallback
                            return Array.from(new Uint8Array(hash))
                                .map(b => b.toString(16).padStart(2, '0'))
                                .join('');
                        });
                        
                        const sha1Hash = await crypto.subtle.digest('SHA-1', data).then(hash => {
                            return Array.from(new Uint8Array(hash))
                                .map(b => b.toString(16).padStart(2, '0'))
                                .join('');
                        });
                        
                        const sha256Hash = await crypto.subtle.digest('SHA-256', data).then(hash => {
                            return Array.from(new Uint8Array(hash))
                                .map(b => b.toString(16).padStart(2, '0'))
                                .join('');
                        });
                        
                        const sha512Hash = await crypto.subtle.digest('SHA-512', data).then(hash => {
                            return Array.from(new Uint8Array(hash))
                                .map(b => b.toString(16).padStart(2, '0'))
                                .join('');
                        });
                        
                        // Update outputs
                        document.getElementById('md5-output').value = md5Hash;
                        document.getElementById('sha1-output').value = sha1Hash;
                        document.getElementById('sha256-output').value = sha256Hash;
                        document.getElementById('sha512-output').value = sha512Hash;
                        
                    } catch (error) {
                        console.error('Error generating hashes:', error);
                        alert('Error generating hashes. Please try again.');
                    }
                }
            </script>
        `;
    }

    getSqlQueryPage() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-6xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-database text-primary"></i>
                        SQL Query Runner
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">SQL Query</h2>
                                <textarea 
                                    id="sql-input" 
                                    class="textarea textarea-bordered h-64 font-mono" 
                                    placeholder="Enter your SQL query here..."
                                >SELECT * FROM tools_usage;</textarea>
                                <div class="card-actions justify-between mt-4">
                                    <button class="btn btn-outline btn-sm" onclick="document.getElementById('sql-input').value = ''">
                                        Clear
                                    </button>
                                    <button class="btn btn-primary btn-sm" onclick="executeSqlQuery()">
                                        Execute Query
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Results</h2>
                                <div id="sql-results" class="min-h-64">
                                    <p class="text-base-content/70">Enter a SQL query and click Execute to see results.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Query History</h2>
                                <div id="query-history" class="max-h-64 overflow-y-auto">
                                    <p class="text-base-content/70">Loading query history...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
                async function executeSqlQuery() {
                    const query = document.getElementById('sql-input').value.trim();
                    const resultsDiv = document.getElementById('sql-results');
                    
                    if (!query) {
                        resultsDiv.innerHTML = '<div class="alert alert-warning"><i class="fas fa-exclamation-triangle"></i> Please enter a SQL query.</div>';
                        return;
                    }
                    
                    if (!dbManager.isReady()) {
                        resultsDiv.innerHTML = '<div class="alert alert-error"><i class="fas fa-exclamation-circle"></i> Database not ready. Please wait a moment and try again.</div>';
                        return;
                    }
                    
                    try {
                        const result = dbManager.executeQuery(query);
                        
                        if (result.success) {
                            if (result.result && result.result.length > 0) {
                                const table = result.result[0];
                                let html = '<div class="overflow-x-auto">';
                                html += '<table class="table table-zebra w-full">';
                                
                                // Header
                                if (table.columns) {
                                    html += '<thead><tr>';
                                    table.columns.forEach(col => {
                                        html += \`<th>\${col}</th>\`;
                                    });
                                    html += '</tr></thead>';
                                }
                                
                                // Rows
                                if (table.values && table.values.length > 0) {
                                    html += '<tbody>';
                                    table.values.forEach(row => {
                                        html += '<tr>';
                                        row.forEach(cell => {
                                            html += \`<td>\${cell !== null ? cell : '<span class="text-base-content/50">NULL</span>'}</td>\`;
                                        });
                                        html += '</tr>';
                                    });
                                    html += '</tbody>';
                                }
                                
                                html += '</table></div>';
                                
                                if (table.values) {
                                    html += \`<div class="mt-4 text-sm text-base-content/70">
                                        Rows: \${table.values.length} | Execution time: \${result.executionTime.toFixed(2)}ms
                                    </div>\`;
                                }
                                
                                resultsDiv.innerHTML = html;
                            } else {
                                resultsDiv.innerHTML = \`<div class="alert alert-success">
                                    <i class="fas fa-check-circle"></i> Query executed successfully. 
                                    Rows affected: \${result.rowsAffected} | Time: \${result.executionTime.toFixed(2)}ms
                                </div>\`;
                            }
                        } else {
                            resultsDiv.innerHTML = \`<div class="alert alert-error">
                                <i class="fas fa-exclamation-circle"></i> Error: \${result.error}
                            </div>\`;
                        }
                        
                        // Refresh query history
                        loadQueryHistory();
                        
                    } catch (error) {
                        resultsDiv.innerHTML = \`<div class="alert alert-error">
                            <i class="fas fa-exclamation-circle"></i> Error: \${error.message}
                        </div>\`;
                    }
                }
                
                function loadQueryHistory() {
                    if (!dbManager.isReady()) return;
                    
                    const history = dbManager.getQueryHistory(10);
                    const historyDiv = document.getElementById('query-history');
                    
                    if (history.length === 0) {
                        historyDiv.innerHTML = '<p class="text-base-content/70">No query history yet.</p>';
                        return;
                    }
                    
                    let html = '<div class="space-y-2">';
                    history.forEach(item => {
                        const [id, query, resultCount, executionTime, createdAt] = item;
                        html += \`<div class="bg-base-200 p-3 rounded">
                            <div class="text-sm font-mono break-all">\${query}</div>
                            <div class="text-xs text-base-content/70 mt-1">
                                Results: \${resultCount} | Time: \${executionTime.toFixed(2)}ms | \${new Date(createdAt).toLocaleString()}
                            </div>
                        </div>\`;
                    });
                    html += '</div>';
                    
                    historyDiv.innerHTML = html;
                }
                
                // Load initial query history
                setTimeout(loadQueryHistory, 1000);
            </script>
        `;
    }

    getDbManagerPage() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-6xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-table text-primary"></i>
                        Database Manager
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Database Statistics</h2>
                                <div id="db-stats">
                                    <div class="loading loading-spinner loading-md"></div>
                                    <p class="text-base-content/70">Loading database statistics...</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Tool Usage Statistics</h2>
                                <div id="tool-usage-stats">
                                    <div class="loading loading-spinner loading-md"></div>
                                    <p class="text-base-content/70">Loading usage statistics...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Tables</h2>
                                <div id="tables-list">
                                    <div class="loading loading-spinner loading-md"></div>
                                    <p class="text-base-content/70">Loading tables...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
                async function loadDatabaseStats() {
                    if (!dbManager.isReady()) {
                        setTimeout(loadDatabaseStats, 1000);
                        return;
                    }
                    
                    const stats = dbManager.getDatabaseStats();
                    const statsDiv = document.getElementById('db-stats');
                    
                    let html = '<div class="stats stats-vertical lg:stats-horizontal shadow">';
                    html += \`<div class="stat">
                        <div class="stat-title">Tables</div>
                        <div class="stat-value text-primary">\${stats.tableCount}</div>
                    </div>\`;
                    html += '</div>';
                    
                    if (stats.tables.length > 0) {
                        html += '<div class="mt-4"><h3 class="font-bold mb-2">Table Details:</h3>';
                        html += '<div class="space-y-2">';
                        stats.tables.forEach(table => {
                            html += \`<div class="bg-base-200 p-3 rounded">
                                <div class="font-bold">\${table.name}</div>
                                <div class="text-sm text-base-content/70">
                                    Columns: \${table.columnCount} | Rows: \${table.rowCount}
                                </div>
                            </div>\`;
                        });
                        html += '</div></div>';
                    }
                    
                    statsDiv.innerHTML = html;
                }
                
                async function loadToolUsageStats() {
                    if (!dbManager.isReady()) {
                        setTimeout(loadToolUsageStats, 1000);
                        return;
                    }
                    
                    const usage = dbManager.getToolUsageStats();
                    const usageDiv = document.getElementById('tool-usage-stats');
                    
                    if (usage.length === 0) {
                        usageDiv.innerHTML = '<p class="text-base-content/70">No usage data available.</p>';
                        return;
                    }
                    
                    let html = '<div class="space-y-2">';
                    usage.forEach(item => {
                        const [toolName, usageCount, lastUsed] = item;
                        html += \`<div class="flex justify-between items-center bg-base-200 p-3 rounded">
                            <div>
                                <div class="font-bold">\${toolName}</div>
                                <div class="text-sm text-base-content/70">Last used: \${new Date(lastUsed).toLocaleDateString()}</div>
                            </div>
                            <div class="badge badge-primary">\${usageCount} uses</div>
                        </div>\`;
                    });
                    html += '</div>';
                    
                    usageDiv.innerHTML = html;
                }
                
                async function loadTablesList() {
                    if (!dbManager.isReady()) {
                        setTimeout(loadTablesList, 1000);
                        return;
                    }
                    
                    const tables = dbManager.getTables();
                    const tablesDiv = document.getElementById('tables-list');
                    
                    if (tables.length === 0) {
                        tablesDiv.innerHTML = '<p class="text-base-content/70">No tables found.</p>';
                        return;
                    }
                    
                    let html = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">';
                    tables.forEach(table => {
                        const tableName = table[0];
                        html += \`<div class="card bg-base-200 shadow">
                            <div class="card-body p-4">
                                <h3 class="card-title text-sm">\${tableName}</h3>
                                <div class="card-actions justify-end">
                                    <button class="btn btn-primary btn-sm" onclick="viewTable('\${tableName}')">
                                        View Data
                                    </button>
                                </div>
                            </div>
                        </div>\`;
                    });
                    html += '</div>';
                    
                    tablesDiv.innerHTML = html;
                }
                
                function viewTable(tableName) {
                    const query = \`SELECT * FROM \${tableName} LIMIT 10\`;
                    document.getElementById('sql-input').value = query;
                    router.navigate('#sql-query');
                }
                
                // Load all data
                loadDatabaseStats();
                loadToolUsageStats();
                loadTablesList();
            </script>
        `;
    }

    getDbBackupPage() {
        return `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl font-bold mb-8">
                        <i class="fas fa-download text-primary"></i>
                        Backup & Restore
                    </h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Export Database</h2>
                                <p class="text-base-content/70 mb-4">Download your database as a SQL file for backup purposes.</p>
                                <button class="btn btn-primary" onclick="exportDatabase()">
                                    <i class="fas fa-download"></i>
                                    Export Database
                                </button>
                                <div class="mt-4">
                                    <div class="alert alert-info">
                                        <i class="fas fa-info-circle"></i>
                                        <div>
                                            <div class="font-bold">Export includes:</div>
                                            <div class="text-sm">All tables, data, and schema information</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Import Database</h2>
                                <p class="text-base-content/70 mb-4">Restore your database from a previously exported SQL file.</p>
                                <input type="file" id="import-file" class="file-input file-input-bordered w-full" accept=".sql,.db" />
                                <button class="btn btn-secondary mt-4" onclick="importDatabase()">
                                    <i class="fas fa-upload"></i>
                                    Import Database
                                </button>
                                <div class="mt-4">
                                    <div class="alert alert-warning">
                                        <i class="fas fa-exclamation-triangle"></i>
                                        <div>
                                            <div class="font-bold">Warning:</div>
                                            <div class="text-sm">Importing will replace your current database</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Database Information</h2>
                                <div id="db-info">
                                    <div class="loading loading-spinner loading-md"></div>
                                    <p class="text-base-content/70">Loading database information...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
                function exportDatabase() {
                    if (!dbManager.isReady()) {
                        alert('Database not ready. Please wait a moment and try again.');
                        return;
                    }
                    
                    try {
                        const data = dbManager.exportDatabase();
                        if (data) {
                            const blob = new Blob([data], { type: 'application/octet-stream' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = \`tools-database-\${new Date().toISOString().split('T')[0]}.db\`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                            
                            showNotification('Database exported successfully!', 'success');
                        } else {
                            showNotification('Failed to export database', 'error');
                        }
                    } catch (error) {
                        console.error('Export error:', error);
                        showNotification('Error exporting database: ' + error.message, 'error');
                    }
                }
                
                function importDatabase() {
                    const fileInput = document.getElementById('import-file');
                    const file = fileInput.files[0];
                    
                    if (!file) {
                        alert('Please select a file to import.');
                        return;
                    }
                    
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        try {
                            const data = new Uint8Array(e.target.result);
                            const success = dbManager.importDatabase(data);
                            
                            if (success) {
                                showNotification('Database imported successfully!', 'success');
                                loadDatabaseInfo();
                            } else {
                                showNotification('Failed to import database', 'error');
                            }
                        } catch (error) {
                            console.error('Import error:', error);
                            showNotification('Error importing database: ' + error.message, 'error');
                        }
                    };
                    
                    reader.readAsArrayBuffer(file);
                }
                
                function loadDatabaseInfo() {
                    if (!dbManager.isReady()) {
                        setTimeout(loadDatabaseInfo, 1000);
                        return;
                    }
                    
                    const stats = dbManager.getDatabaseStats();
                    const infoDiv = document.getElementById('db-info');
                    
                    let html = '<div class="stats stats-vertical lg:stats-horizontal shadow">';
                    html += \`<div class="stat">
                        <div class="stat-title">Tables</div>
                        <div class="stat-value text-primary">\${stats.tableCount}</div>
                    </div>\`;
                    html += \`<div class="stat">
                        <div class="stat-title">Total Rows</div>
                        <div class="stat-value text-secondary">\${stats.tables.reduce((sum, table) => sum + table.rowCount, 0)}</div>
                    </div>\`;
                    html += '</div>';
                    
                    if (stats.tables.length > 0) {
                        html += '<div class="mt-4"><h3 class="font-bold mb-2">Table Summary:</h3>';
                        html += '<div class="overflow-x-auto">';
                        html += '<table class="table table-zebra w-full">';
                        html += '<thead><tr><th>Table Name</th><th>Columns</th><th>Rows</th></tr></thead>';
                        html += '<tbody>';
                        stats.tables.forEach(table => {
                            html += \`<tr>
                                <td class="font-mono">\${table.name}</td>
                                <td>\${table.columnCount}</td>
                                <td>\${table.rowCount}</td>
                            </tr>\`;
                        });
                        html += '</tbody></table></div></div>';
                    }
                    
                    infoDiv.innerHTML = html;
                }
                
                // Load initial database info
                loadDatabaseInfo();
            </script>
        `;
    }

    get404Page() {
        return `
            <div class="hero min-h-96">
                <div class="hero-content text-center">
                    <div class="max-w-md">
                        <h1 class="text-5xl font-bold">404</h1>
                        <p class="py-6">The page you're looking for doesn't exist.</p>
                        <button class="btn btn-primary" onclick="router.navigate('#home')">
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.toolsApp = new ToolsApp();
});
