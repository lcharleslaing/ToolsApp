/**
 * Main application file for Tools App
 */
class ToolsApp {
    constructor() {
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

        // Dynamic tool pages using tool loader
        router.register('text-case', () => toolLoader.getToolPage('text-case'));
        router.register('conversion', () => toolLoader.getToolPage('conversion'));
        router.register('text-counter', () => toolLoader.getToolPage('text-counter'));
        router.register('json-formatter', () => toolLoader.getToolPage('json-formatter'));
        router.register('color-picker', () => toolLoader.getToolPage('color-picker'));
        router.register('base64', () => toolLoader.getToolPage('base64'));
        router.register('url-encoder', () => toolLoader.getToolPage('url-encoder'));
        router.register('regex-tester', () => toolLoader.getToolPage('regex-tester'));
        router.register('hash-generator', () => toolLoader.getToolPage('hash-generator'));
        router.register('sql-query', () => toolLoader.getToolPage('sql-query'));
        router.register('db-manager', () => toolLoader.getToolPage('db-manager'));
        router.register('db-backup', () => toolLoader.getToolPage('db-backup'));

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
                    
                    <!-- Conversion Tools -->
                    <div class="tool-card card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-secondary">
                                <i class="fas fa-exchange-alt"></i>
                                Conversion Tools
                            </h3>
                            <p class="text-base-content/70">Convert between units, measurements, temperatures, and more.</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-secondary btn-sm" onclick="router.navigate('#conversion')">
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
