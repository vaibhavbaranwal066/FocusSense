// Navbar Component
function Navbar({ focusScore = 87, onSearch }) {
    const { isDark, toggleTheme } = useTheme();
    const [searchActive, setSearchActive] = React.useState(false);

    return React.createElement(
        'nav',
        { className: 'app-navbar' },

        // Left Section - Search & Title
        React.createElement(
            'div',
            { className: 'navbar-left' },
            React.createElement(
                'div',
                { 
                    className: 'navbar-search',
                    onFocus: () => setSearchActive(true),
                    onBlur: () => setSearchActive(false)
                },
                React.createElement(
                    'span',
                    { className: 'search-icon' },
                    '🔍'
                ),
                React.createElement(
                    'input',
                    {
                        type: 'text',
                        className: 'search-input',
                        placeholder: 'Search tasks, insights...',
                        onChange: (e) => onSearch && onSearch(e.target.value)
                    }
                )
            )
        ),

        // Right Section - Actions
        React.createElement(
            'div',
            { className: 'navbar-right' },

            // Focus Score Badge
            React.createElement(
                'div',
                { className: 'focus-badge' },
                React.createElement(
                    'span',
                    null,
                    'Focus Score'
                ),
                React.createElement(
                    'div',
                    { className: 'badge-score' },
                    focusScore
                )
            ),

            // Theme Toggle Button
            React.createElement(
                'button',
                {
                    className: 'navbar-action theme-toggle',
                    onClick: toggleTheme,
                    title: isDark ? 'Switch to light mode' : 'Switch to dark mode'
                },
                isDark 
                    ? React.createElement('span', null, '☀️')
                    : React.createElement('span', null, '🌙')
            ),

            // Notifications Button
            React.createElement(
                'button',
                {
                    className: 'navbar-action',
                    title: 'Notifications'
                },
                React.createElement('span', null, '🔔'),
                React.createElement(
                    'div',
                    {
                        style: {
                            position: 'absolute',
                            top: '-4px',
                            right: '-4px',
                            width: '10px',
                            height: '10px',
                            backgroundColor: '#10B981',
                            borderRadius: '50%',
                            animation: 'pulse 2s ease-in-out infinite'
                        }
                    }
                )
            ),

            // User Menu Button
            React.createElement(
                'button',
                {
                    className: 'navbar-action',
                    title: 'User menu'
                },
                React.createElement('span', null, '👤')
            )
        )
    );
}
