/**
 * Simple client-side router for the Tools App
 */
class Router {
    constructor() {
        this.routes = new Map();
        this.currentPage = null;
        this.init();
    }

    init() {
        // Set up event listeners
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());

        // Set up navigation click handlers
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                if (href && href.startsWith('#')) {
                    this.navigate(href);
                }
            }
        });
    }

    // Register a route
    register(path, pageComponent) {
        this.routes.set(path, pageComponent);
    }

    // Navigate to a route
    navigate(path) {
        if (path.startsWith('#')) {
            path = path.substring(1);
        }
        window.location.hash = path;
    }

    // Handle route changes
    handleRoute() {
        const hash = window.location.hash.substring(1) || 'home';
        const pageComponent = this.routes.get(hash);

        if (pageComponent) {
            this.loadPage(hash, pageComponent);
        } else {
            this.loadPage('404', this.routes.get('404') || this.get404Page());
        }
    }

    // Load a page
    async loadPage(pageName, pageComponent) {
        const content = document.getElementById('page-content');

        // Update active navigation
        this.updateActiveNav(pageName);

        // Show loading state
        content.innerHTML = this.getLoadingHTML();

        try {
            // Load page content
            const pageHTML = await pageComponent();

            // Animate page transition
            content.classList.add('page-exit');

            setTimeout(() => {
                content.innerHTML = pageHTML;
                content.classList.remove('page-exit');
                content.classList.add('page-enter');

                // Initialize page-specific functionality
                this.initializePageContent(pageName);

                // Remove animation class after animation completes
                setTimeout(() => {
                    content.classList.remove('page-enter');
                }, 300);
            }, 150);

            this.currentPage = pageName;

        } catch (error) {
            console.error('Error loading page:', error);
            content.innerHTML = this.getErrorHTML(error.message);
        }
    }

    // Update active navigation item
    updateActiveNav(pageName) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current page
        const activeLink = document.querySelector(`[data-page="${pageName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Get loading HTML
    getLoadingHTML() {
        return `
            <div class="flex items-center justify-center min-h-96">
                <div class="text-center">
                    <div class="loading-spinner mx-auto mb-4"></div>
                    <p class="text-base-content/70">Loading...</p>
                </div>
            </div>
        `;
    }

    // Get error HTML
    getErrorHTML(message) {
        return `
            <div class="alert alert-error">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <h3 class="font-bold">Error loading page</h3>
                    <div class="text-xs">${message}</div>
                </div>
            </div>
        `;
    }

    // Initialize page-specific content
    initializePageContent(pageName) {
        console.log('Initializing page content for:', pageName);

        // Initialize text case converter if on that page
        if (pageName === 'text-case') {
            const textInput = document.getElementById('text-input');
            console.log('Text input element found:', textInput);
            console.log('Tools app available:', !!window.toolsApp);

            if (textInput && window.toolsApp) {
                console.log('Converting initial text:', textInput.value);
                // Convert the initial sample text
                window.toolsApp.convertTextCase(textInput.value);
            }
        }
    }

    // Get 404 page
    get404Page() {
        return () => `
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

// Create global router instance
const router = new Router();
