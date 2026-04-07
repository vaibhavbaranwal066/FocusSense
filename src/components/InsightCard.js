// Insight Card Component
function InsightCard({ icon, title, description, metric, loading = false }) {
    if (loading) {
        return React.createElement(
            'div',
            { className: 'insight-card' },
            React.createElement('div', { className: 'skeleton skeleton-avatar', style: { width: '40px', height: '40px', borderRadius: 'var(--radius-md)' } }),
            React.createElement('div', { className: 'skeleton skeleton-title' }),
            React.createElement('div', { className: 'skeleton skeleton-text' })
        );
    }

    return React.createElement(
        'div',
        { className: 'insight-card' },
        React.createElement(
            'div',
            { className: 'insight-header' },
            React.createElement(
                'div',
                { className: 'insight-icon' },
                icon
            ),
            React.createElement(
                'h4',
                { className: 'insight-title' },
                title
            )
        ),
        React.createElement(
            'div',
            { className: 'insight-content' },
            React.createElement(
                'p',
                { className: 'insight-text' },
                description
            ),
            metric && React.createElement(
                'div',
                { className: 'insight-metric' },
                React.createElement(
                    'span',
                    { className: 'metric-label' },
                    metric.label
                ),
                React.createElement(
                    'span',
                    { className: 'metric-value' },
                    metric.value
                )
            )
        )
    );
}
