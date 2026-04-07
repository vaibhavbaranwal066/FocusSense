// Sidebar Component
function Sidebar({ activeItem, onNavigate }) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

    const sidebarContent = React.createElement(
        React.Fragment,
        null,
        // Sidebar Header
        React.createElement(
            'div',
            { className: 'sidebar-header' },
            React.createElement(
                'div',
                { className: 'logo' },
                React.createElement(
                    'div',
                    { className: 'logo-icon' },
                    '◉'
                ),
                React.createElement(
                    'span',
                    null,
                    'FocusSense'
                )
            )
        ),

        // Navigation
        React.createElement(
            'nav',
            { className: 'sidebar-nav' },
            React.createElement(
                'div',
                { className: 'nav-section' },
                React.createElement(
                    'div',
                    { className: 'nav-section-title' },
                    'Main'
                ),
                [
                    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                    { id: 'analytics', label: 'Analytics', icon: '📈' }
                ].map(item =>
                    React.createElement(
                        'div',
                        {
                            key: item.id,
                            className: `nav-item ${activeItem === item.id ? 'active' : ''}`,
                            onClick: () => {
                                onNavigate(item.id);
                                if (window.innerWidth <= 1024) {
                                    setIsMobileSidebarOpen(false);
                                }
                            }
                        },
                        React.createElement('span', { className: 'nav-icon' }, item.icon),
                        React.createElement('span', { className: 'nav-label' }, item.label)
                    )
                )
            ),

            React.createElement(
                'div',
                { className: 'nav-section' },
                React.createElement(
                    'div',
                    { className: 'nav-section-title' },
                    'Features'
                ),
                [
                    { id: 'insights', label: 'Insights', icon: '💡' },
                    { id: 'goals', label: 'Goals', icon: '🎯' }
                ].map(item =>
                    React.createElement(
                        'div',
                        {
                            key: item.id,
                            className: `nav-item ${activeItem === item.id ? 'active' : ''}`,
                            onClick: () => {
                                onNavigate(item.id);
                                if (window.innerWidth <= 1024) {
                                    setIsMobileSidebarOpen(false);
                                }
                            }
                        },
                        React.createElement('span', { className: 'nav-icon' }, item.icon),
                        React.createElement('span', { className: 'nav-label' }, item.label)
                    )
                )
            ),

            React.createElement(
                'div',
                { className: 'nav-section' },
                React.createElement(
                    'div',
                    { className: 'nav-section-title' },
                    'System'
                ),
                React.createElement(
                    'div',
                    {
                        className: `nav-item ${activeItem === 'settings' ? 'active' : ''}`,
                        onClick: () => {
                            onNavigate('settings');
                            if (window.innerWidth <= 1024) {
                                setIsMobileSidebarOpen(false);
                            }
                        }
                    },
                    React.createElement('span', { className: 'nav-icon' }, '⚙️'),
                    React.createElement('span', { className: 'nav-label' }, 'Settings')
                )
            )
        ),

        // Sidebar Footer
        React.createElement(
            'div',
            { className: 'sidebar-footer', style: { position: 'absolute', bottom: 0, width: '100%' } },
            React.createElement(
                'div',
                { className: 'user-profile' },
                React.createElement(
                    'div',
                    { className: 'user-avatar' },
                    'A'
                ),
                React.createElement(
                    'div',
                    { className: 'user-info' },
                    React.createElement(
                        'div',
                        { className: 'user-name' },
                        'Admin'
                    ),
                    React.createElement(
                        'div',
                        { className: 'user-status' },
                        'Premium'
                    )
                )
            )
        )
    );

    return React.createElement(
        'aside',
        { 
            className: `app-sidebar ${isMobileSidebarOpen ? 'active' : ''}`,
            style: { position: 'relative', overflow: 'auto', paddingBottom: '120px' }
        },
        sidebarContent
    );
}
