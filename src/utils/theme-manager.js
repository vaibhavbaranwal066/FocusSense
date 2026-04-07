// Theme Manager Utility
class ThemeManager {
    constructor() {
        this.THEME_KEY = 'focussense-theme';
        this.LIGHT_THEME = 'light-theme';
        this.DARK_THEME = 'dark-theme';
        this.initialize();
    }

    initialize() {
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const theme = savedTheme || (prefersDark ? this.DARK_THEME : this.LIGHT_THEME);
        this.setTheme(theme);

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.THEME_KEY)) {
                this.setTheme(e.matches ? this.DARK_THEME : this.LIGHT_THEME);
            }
        });
    }

    setTheme(theme) {
        const htmlElement = document.documentElement;
        const bodyElement = document.body;

        // Remove all theme classes
        bodyElement.classList.remove(this.LIGHT_THEME, this.DARK_THEME);

        if (theme === this.LIGHT_THEME) {
            bodyElement.classList.add(this.LIGHT_THEME);
            htmlElement.style.colorScheme = 'light';
        } else {
            bodyElement.classList.add(this.DARK_THEME);
            htmlElement.style.colorScheme = 'dark';
        }

        // Save preference
        localStorage.setItem(this.THEME_KEY, theme);

        // Dispatch custom event for theme changes
        const event = new CustomEvent('themechange', { detail: { theme } });
        window.dispatchEvent(event);
    }

    getTheme() {
        return document.body.classList.contains(this.LIGHT_THEME) 
            ? this.LIGHT_THEME 
            : this.DARK_THEME;
    }

    isDarkTheme() {
        return this.getTheme() === this.DARK_THEME;
    }

    toggleTheme() {
        const currentTheme = this.getTheme();
        const newTheme = currentTheme === this.LIGHT_THEME 
            ? this.DARK_THEME 
            : this.LIGHT_THEME;
        this.setTheme(newTheme);
        return newTheme;
    }
}

// Create global instance
const themeManager = new ThemeManager();
