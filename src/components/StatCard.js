// Stat Card Component
function StatCard({ title, value, change, trend = 'neutral', icon = '📊', loading = false }) {
    if (loading) {
        return React.createElement(
            'div',
            { className: 'stat-card' },
            React.createElement(
                'div',
                { className: 'stat-card-content' },
                React.createElement('div', { 
                    className: 'skeleton skeleton-avatar',
                    style: { borderRadius: 'var(--radius-lg)' }
                }),
                React.createElement(
                    'div',
                    { className: 'skeleton-content', style: { flex: 1 } },
                    React.createElement('div', { className: 'skeleton skeleton-title' }),
                    React.createElement('div', { className: 'skeleton skeleton-text' })
                )
            )
        );
    }

    return React.createElement(
        'div',
        { className: 'stat-card' },
        React.createElement(
            'div',
            { className: 'stat-card-content' },
            React.createElement(
                'div',
                { className: 'stat-icon' },
                icon
            ),
            React.createElement(
                'div',
                { className: 'stat-info' },
                React.createElement(
                    'div',
                    { className: 'stat-label' },
                    title
                ),
                React.createElement(
                    'div',
                    { className: 'stat-value' },
                    value
                ),
                React.createElement(
                    'div',
                    { className: `stat-change ${trend}` },
                    React.createElement(
                        'span',
                        null,
                        trend === 'positive' ? '↑' : trend === 'negative' ? '↓' : '→'
                    ),
                    React.createElement(
                        'span',
                        null,
                        change
                    )
                )
            )
        )
    );
}

// Focus Score Card Component
function FocusScoreCard({ score = 87, loading = false }) {
    if (loading) {
        return React.createElement(
            'div',
            { className: 'stat-card' },
            React.createElement('div', { 
                className: 'skeleton skeleton-avatar',
                style: { width: '120px', height: '120px', borderRadius: '50%' }
            })
        );
    }

    return React.createElement(
        'div',
        { className: 'stat-card' },
        React.createElement(
            'div',
            { className: 'stat-card-content' },
            React.createElement(CircularProgress, { value: score, max: 100, size: 120 }),
            React.createElement(
                'div',
                { className: 'stat-info' },
                React.createElement(
                    'div',
                    { className: 'stat-label' },
                    'Focus Score'
                ),
                React.createElement(
                    'p',
                    { className: 'text-secondary', style: { margin: 0, fontSize: 'var(--font-size-sm)' } },
                    'Today\'s performance'
                ),
                React.createElement(
                    'div',
                    { className: 'stat-change positive', style: { marginTop: 'var(--spacing-md)' } },
                    React.createElement('span', null, '↑'),
                    React.createElement('span', null, '+5 from yesterday')
                )
            )
        )
    );
}
