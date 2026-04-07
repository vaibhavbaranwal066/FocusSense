// Line Chart Component
function LineChart({ data = null, loading = false }) {
    const [period, setPeriod] = React.useState('week');

    // Default data
    const defaultData = {
        week: [65, 78, 82, 85, 81, 87, 90],
        month: [68, 72, 75, 78, 82, 85, 87, 84, 88, 90, 87, 85, 89, 91],
        year: [65, 68, 70, 75, 78, 82, 85, 87, 90, 88, 92, 95]
    };

    const chartData = data || defaultData[period];
    const maxValue = Math.max(...chartData);
    const minValue = Math.min(...chartData);
    const range = maxValue - minValue;

    // Calculate path
    const width = 100;
    const height = 100;
    const pointSpacing = width / (chartData.length - 1);
    
    let pathData = '';
    let fillArea = '';

    chartData.forEach((value, index) => {
        const x = index * pointSpacing;
        const y = height - ((value - minValue) / range) * height;
        
        if (index === 0) {
            pathData += `M ${x} ${y}`;
            fillArea += `M ${x} ${y}`;
        } else {
            pathData += ` L ${x} ${y}`;
            fillArea += ` L ${x} ${y}`;
        }
    });

    // Complete fill area
    fillArea += ` L ${width} ${height} L 0 ${height} Z`;

    if (loading) {
        return React.createElement(
            'div',
            { className: 'chart-section' },
            React.createElement(
                'div',
                { className: 'chart-header' },
                React.createElement('div', { className: 'skeleton skeleton-title', style: { width: '150px' } })
            ),
            React.createElement('div', { className: 'skeleton', style: { height: '300px', borderRadius: 'var(--radius-md)' } })
        );
    }

    return React.createElement(
        'div',
        { className: 'chart-section' },
        React.createElement(
            'div',
            { className: 'chart-header' },
            React.createElement(
                'h3',
                { className: 'chart-title' },
                'Activity Timeline'
            ),
            React.createElement(
                'div',
                { className: 'chart-period' },
                ['Week', 'Month', 'Year'].map(label =>
                    React.createElement(
                        'button',
                        {
                            key: label,
                            className: `period-btn ${period === label.toLowerCase() ? 'active' : ''}`,
                            onClick: () => setPeriod(label.toLowerCase())
                        },
                        label
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'chart-container' },
            React.createElement(
                'svg',
                {
                    className: 'line-chart-svg',
                    viewBox: `0 0 ${width} ${height}`,
                    preserveAspectRatio: 'none'
                },
                React.createElement('defs', null,
                    React.createElement(
                        'linearGradient',
                        {
                            id: 'chartGradient',
                            x1: '0%',
                            y1: '0%',
                            x2: '0%',
                            y2: '100%'
                        },
                        React.createElement('stop', {
                            offset: '0%',
                            stopColor: '#6366F1',
                            stopOpacity: 0.3
                        }),
                        React.createElement('stop', {
                            offset: '100%',
                            stopColor: '#6366F1',
                            stopOpacity: 0
                        })
                    )
                ),
                // Fill area
                React.createElement('path', {
                    d: fillArea,
                    fill: 'url(#chartGradient)',
                    opacity: 0.5,
                    animation: 'fadeIn 800ms ease-out'
                }),
                // Line
                React.createElement('path', {
                    d: pathData,
                    stroke: '#6366F1',
                    strokeWidth: 2.5,
                    fill: 'none',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    animation: 'slideUp 600ms ease-out'
                }),
                // Points
                chartData.map((value, index) => {
                    const x = index * pointSpacing;
                    const y = height - ((value - minValue) / range) * height;
                    return React.createElement('circle', {
                        key: index,
                        cx: x,
                        cy: y,
                        r: 2.5,
                        fill: '#6366F1',
                        opacity: 0,
                        animation: `fadeIn 600ms ease-out ${index * 30}ms forwards`
                    });
                })
            )
        )
    );
}
