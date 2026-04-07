// Main Layout Component
function MainLayout({ activeItem, onNavigate }) {
    const renderContent = () => {
        // Dashboard page - use dedicated component
        if (activeItem === 'dashboard') {
            return React.createElement(DashboardPage, { loading: false });
        }

        // Analytics page
        if (activeItem === 'analytics') {
            return React.createElement(AnalyticsPage, {});
        }

        // Insights page
        if (activeItem === 'insights') {
            return React.createElement(InsightsPage, {});
        }

        // Goals page
        if (activeItem === 'goals') {
            return React.createElement(GoalsPage, {});
        }

        // Settings page - placeholder
        if (activeItem === 'settings') {
            const content = {
                title: 'Settings',
                description: 'Configure your FocusSense preferences'
            };

            return React.createElement(
                'div',
                { className: 'main-container' },
                React.createElement(
                    'div',
                    { className: 'page-header' },
                    React.createElement(
                        'h1',
                        { className: 'page-title' },
                        content.title
                    ),
                    React.createElement(
                        'p',
                        { className: 'page-description' },
                        content.description
                    )
                ),
                React.createElement(
                    'div',
                    { 
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: 'var(--spacing-xl)'
                        }
                    },
                    [1, 2, 3].map(index =>
                        React.createElement(
                            'div',
                            {
                                key: index,
                                className: 'card',
                                style: {
                                    animation: `slideUp 400ms ease-out ${index * 50}ms both`
                                }
                            },
                            React.createElement(
                                'div',
                                { style: { marginBottom: 'var(--spacing-md)' } },
                                React.createElement(
                                    'h3',
                                    { style: { margin: '0 0 var(--spacing-sm) 0', fontSize: 'var(--font-size-lg)' } },
                                    `${content.title} - Card ${index}`
                                ),
                                React.createElement(
                                    'p',
                                    { 
                                        className: 'text-secondary',
                                        style: { margin: 0, fontSize: 'var(--font-size-sm)' }
                                    },
                                    'Coming soon - feature in development'
                                )
                            )
                        )
                    )
                )
            );
        }

        // Default content
        const contentMap = {
            analytics: {
                title: 'Analytics',
                description: 'Detailed insights into your focus patterns'
            },
            insights: {
                title: 'Insights',
                description: 'AI-powered recommendations for better focus'
            },
            goals: {
                title: 'Goals',
                description: 'Manage and track your focus goals'
            },
            settings: {
                title: 'Settings',
                description: 'Configure your FocusSense preferences'
            }
        };

        const content = contentMap[activeItem] || contentMap.analytics;

        return React.createElement(
            'div',
            { className: 'main-container' },
            React.createElement(
                'div',
                { className: 'page-header' },
                React.createElement(
                    'h1',
                    { className: 'page-title' },
                    content.title
                ),
                React.createElement(
                    'p',
                    { className: 'page-description' },
                    content.description
                )
            ),

            React.createElement(
                'div',
                { 
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'var(--spacing-xl)'
                    }
                },
                [1, 2, 3, 4, 5, 6].map(index =>
                    React.createElement(
                        'div',
                        {
                            key: index,
                            className: 'card',
                            style: {
                                animation: `slideUp 400ms ease-out ${index * 50}ms both`
                            }
                        },
                        React.createElement(
                            'div',
                            { style: { marginBottom: 'var(--spacing-md)' } },
                            React.createElement(
                                'h3',
                                { style: { margin: '0 0 var(--spacing-sm) 0', fontSize: 'var(--font-size-lg)' } },
                                `${content.title} - Card ${index}`
                            ),
                            React.createElement(
                                'p',
                                { 
                                    className: 'text-secondary',
                                    style: { margin: 0, fontSize: 'var(--font-size-sm)' }
                                },
                                'Coming soon - feature in development'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 
                                style: {
                                    width: '100%',
                                    height: '100px',
                                    backgroundColor: 'var(--bg-tertiary)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-tertiary)',
                                    fontSize: 'var(--font-size-sm)',
                                    marginBottom: 'var(--spacing-lg)'
                                }
                            },
                            'Placeholder Content'
                        ),
                        React.createElement(
                            'button',
                            { className: 'btn btn-ghost btn-sm' },
                            'Learn More'
                        )
                    )
                )
            )
        );
    };

    return React.createElement(
        'div',
        { className: 'app-content' },
        renderContent()
    );
}
