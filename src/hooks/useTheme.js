// useTheme Hook
// Custom hook for managing theme state in React components
function useTheme() {
    const [theme, setTheme] = React.useState(() => themeManager.getTheme());

    React.useEffect(() => {
        const handleThemeChange = (event) => {
            setTheme(event.detail.theme);
        };

        window.addEventListener('themechange', handleThemeChange);

        return () => {
            window.removeEventListener('themechange', handleThemeChange);
        };
    }, []);

    const toggleTheme = React.useCallback(() => {
        const newTheme = themeManager.toggleTheme();
        setTheme(newTheme);
    }, []);

    const setAppTheme = React.useCallback((newTheme) => {
        themeManager.setTheme(newTheme);
        setTheme(newTheme);
    }, []);

    return {
        theme,
        isDark: theme === 'dark-theme',
        toggleTheme,
        setTheme: setAppTheme
    };
}
