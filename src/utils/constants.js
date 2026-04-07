// Constants - Application-wide constants
const Constants = {
    // App configuration
    APP_NAME: 'FocusSense',
    APP_VERSION: '1.0.0',
    APP_TAGLINE: 'Premium Focus Management',

    // Navigation items
    NAVIGATION_ITEMS: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'main' },
        { id: 'analytics', label: 'Analytics', icon: '📈', section: 'main' },
        { id: 'insights', label: 'Insights', icon: '💡', section: 'features' },
        { id: 'goals', label: 'Goals', icon: '🎯', section: 'features' },
        { id: 'settings', label: 'Settings', icon: '⚙️', section: 'system' }
    ],

    // Theme values
    THEMES: {
        DARK: 'dark-theme',
        LIGHT: 'light-theme'
    },

    // Colors from design system
    COLORS: {
        PRIMARY: '#6366F1',
        PRIMARY_LIGHT: '#818CF8',
        PRIMARY_DARK: '#4F46E5',
        BG_DARK: '#0F172A',
        BG_LIGHT: '#FFFFFF',
        BG_SECONDARY: '#1E293B',
        BG_TERTIARY: '#334155',
        TEXT_PRIMARY: '#F1F5F9',
        TEXT_SECONDARY: '#CBD5E1',
        TEXT_TERTIARY: '#94A3B8',
        BORDER: '#1E293B',
        SUCCESS: '#10B981',
        WARNING: '#F59E0B',
        DANGER: '#EF4444',
        INFO: '#3B82F6'
    },

    // Breakpoints
    BREAKPOINTS: {
        XS: 0,
        SM: 480,
        MD: 768,
        LG: 1024,
        XL: 1400,
        XXL: 1920
    },

    // Animation durations (ms)
    DURATIONS: {
        FAST: 150,
        BASE: 250,
        SLOW: 350
    },

    // Z-index scale
    Z_INDEX: {
        DROPDOWN: 100,
        STICKY: 200,
        FIXED: 300,
        MODAL_BACKDROP: 400,
        MODAL: 500,
        POPOVER: 600,
        TOOLTIP: 700
    },

    // LocalStorage keys
    STORAGE_KEYS: {
        THEME: 'focussense-theme',
        USER_PREFS: 'focussense-prefs',
        CACHE: 'focussense-cache'
    }
};
