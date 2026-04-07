// Circular Progress Component
function CircularProgress({ value = 87, max = 100, size = 120 }) {
    const radius = (size - 16) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / max) * circumference;

    return React.createElement(
        'div',
        { 
            className: 'circular-progress',
            style: { width: size, height: size }
        },
        React.createElement(
            'svg',
            {
                className: 'circular-progress-svg',
                viewBox: `0 0 ${size} ${size}`
            },
            // Define gradient
            React.createElement(
                'defs',
                null,
                React.createElement(
                    'linearGradient',
                    {
                        id: 'scoreGradient',
                        x1: '0%',
                        y1: '0%',
                        x2: '100%',
                        y2: '100%'
                    },
                    React.createElement('stop', {
                        offset: '0%',
                        stopColor: '#6366F1',
                        stopOpacity: 1
                    }),
                    React.createElement('stop', {
                        offset: '100%',
                        stopColor: '#818CF8',
                        stopOpacity: 1
                    })
                )
            ),
            // Background circle
            React.createElement('circle', {
                className: 'circular-progress-bg',
                cx: size / 2,
                cy: size / 2,
                r: radius,
                strokeWidth: 8
            }),
            // Progress circle
            React.createElement('circle', {
                className: 'circular-progress-fill',
                cx: size / 2,
                cy: size / 2,
                r: radius,
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                style: {
                    '--dashoffset': offset
                }
            })
        ),
        // Center text
        React.createElement(
            'div',
            { className: 'circular-progress-text' },
            React.createElement(
                'span',
                { className: 'progress-number' },
                value
            ),
            React.createElement(
                'span',
                { className: 'progress-label' },
                'Score'
            )
        )
    );
}
