/**
 * Theme management for the Tools App
 */
class ThemeManager {
    constructor() {
        this.themes = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter'];
        this.currentTheme = this.getStoredTheme() || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
        this.updateThemeButton();
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.cycleTheme());
        }
    }

    getStoredTheme() {
        return localStorage.getItem('tools-app-theme');
    }

    setStoredTheme(theme) {
        localStorage.setItem('tools-app-theme', theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.setStoredTheme(theme);
    }

    cycleTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        const nextTheme = this.themes[nextIndex];
        this.applyTheme(nextTheme);
        this.updateThemeButton();
        this.showThemeNotification(nextTheme);
    }

    updateThemeButton() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                // Update icon based on theme
                if (this.currentTheme === 'dark' || this.currentTheme === 'night' || this.currentTheme === 'dracula') {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }
        }
    }

    showThemeNotification(theme) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'toast toast-top toast-end';
        notification.innerHTML = `
            <div class="alert alert-info">
                <i class="fas fa-palette"></i>
                <span>Theme changed to: ${theme}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Method to set specific theme
    setTheme(theme) {
        if (this.themes.includes(theme)) {
            this.applyTheme(theme);
            this.updateThemeButton();
            this.showThemeNotification(theme);
        }
    }

    // Get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Get all available themes
    getAvailableThemes() {
        return [...this.themes];
    }
}

// Create global theme manager instance
const themeManager = new ThemeManager();
