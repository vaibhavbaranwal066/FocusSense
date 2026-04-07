// Productivity Heatmap Component
function ProductivityHeatmap({ data = null, loading = false }) {
    const [tooltip, setTooltip] = React.useState(null);

    // Default data (4 weeks x 7 days)
    const defaultData = Array(28).fill(0).map(() => Math.floor(Math.random() * 5));
    const heatmapData = data || defaultData;

    const getLevelClass = (value) => {
        if (value === 0) return 'level-0';
        if (value === 1) return 'level-1';
        if (value === 2) return 'level-2';
        if (value === 3) return 'level-3';
        return 'level-4';
    };

    const getDayLabel = (index) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[index % 7];
    };

    const getActivityLabel = (value) => {
        const labels = ['No activity', 'Low', 'Normal', 'High', 'Very High'];
        return labels[value];
    };

    if (loading) {
        return React.createElement(
            'div',
            { className: 'heatmap-section' },
            React.createElement('div', { className: 'skeleton skeleton-title', style: { width: '200px', marginBottom: 'var(--spacing-lg)' } }),
            React.createElement('div', { className: 'skeleton', style: { height: '150px', borderRadius: 'var(--radius-md)' } })
        );
    }

    return React.createElement(
        'div',
        { className: 'heatmap-section' },
        React.createElement(
            'div',
            { className: 'heatmap-header' },
            React.createElement(
                'h3',
                { className: 'heatmap-title' },
                'Productivity Heatmap'
            ),
            React.createElement(
                'p',
                { className: 'heatmap-description' },
                'Last 4 weeks activity overview'
            )
        ),
        React.createElement(
            'div',
            { className: 'heatmap-container' },
            React.createElement(
                'div',
                { className: 'heatmap-grid' },
                heatmapData.map((value, index) =>
                    React.createElement(
                        'div',
                        {
                            key: index,
                            className: `heatmap-cell ${getLevelClass(value)}`,
                            onMouseEnter: () => setTooltip(index),
                            onMouseLeave: () => setTooltip(null)
                        },
                        React.createElement(
                            'span',
                            {
                                className: 'heatmap-tooltip',
                                style: { 
                                    opacity: tooltip === index ? 1 : 0,
                                    visibility: tooltip === index ? 'visible' : 'hidden'
                                }
                            },
                            `${getDayLabel(index)}: ${getActivityLabel(value)}`
                        )
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'heatmap-legend' },
            React.createElement(
                'span',
                { style: { marginRight: 'var(--spacing-md)' } },
                'Less'
            ),
            ['level-0', 'level-1', 'level-2', 'level-3', 'level-4'].map(level =>
                React.createElement(
                    'div',
                    { key: level, className: 'legend-label' },
                    React.createElement('div', { 
                        className: `legend-color heatmap-cell ${level}`,
                        style: { width: '14px', height: '14px' }
                    })
                )
            ),
            React.createElement(
                'span',
                null,
                'More'
            )
        )
    );
}
