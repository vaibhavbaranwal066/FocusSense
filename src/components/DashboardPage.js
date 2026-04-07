// Dashboard Page Component
function DashboardPage({ loading = false }) {
    const [pageLoading, setPageLoading] = React.useState(loading);

    // Simulated data
    const statsData = [
        {
            title: 'Active Time',
            value: '4h 32m',
            icon: '⏱️',
            change: '+45 min',
            trend: 'positive'
        },
        {
            title: 'Distractions',
            value: '12',
            icon: '🎯',
            change: '-3 from yesterday',
            trend: 'positive'
        }
    ];

    const insightsData = [
        {
            icon: '🌅',
            title: 'Peak Hours',
            description: 'You focus best between 9 AM and 11 AM. Schedule important tasks during this window.',
            metric: { label: 'Productivity:', value: '+18%' }
        },
        {
            icon: '💡',
            title: 'Break Pattern',
            description: 'Your optimal break is after 90 minutes of focused work. Practice the Pomodoro technique.',
            metric: { label: 'Recommendation:', value: '⭐⭐⭐' }
        },
        {
            icon: '🔊',
            title: 'Environment',
            description: 'Quiet environments improve your focus by 12%. Consider using noise-canceling headphones.',
            metric: { label: 'Impact:', value: '+12%' }
        },
        {
            icon: '📱',
            title: 'Distractions',
            description: 'Most distractions occur at 2 PM. Disable notifications during this critical period.',
            metric: { label: 'Alert time:', value: '2 PM' }
        }
    ];

    React.useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setPageLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return React.createElement(
        'div',
        { className: 'dashboard-container' },

        // Page Header
        React.createElement(
            'div',
            { className: 'page-header', style: { marginBottom: 'var(--spacing-lg)' } },
            React.createElement(
                'h1',
                { className: 'page-title' },
                'Dashboard'
            ),
            React.createElement(
                'p',
                { className: 'page-description' },
                'Welcome back! Here\'s your focus overview for today'
            )
        ),

        // Stats Grid (Top Section)
        React.createElement(
            'div',
            { className: 'stats-grid' },
            React.createElement(FocusScoreCard, { score: 87, loading: pageLoading }),
            ...statsData.map((stat, index) =>
                React.createElement(StatCard, {
                    key: index,
                    title: stat.title,
                    value: stat.value,
                    icon: stat.icon,
                    change: stat.change,
                    trend: stat.trend,
                    loading: pageLoading
                })
            )
        ),

        // Chart Section (Middle Section)
        React.createElement(LineChart, { loading: pageLoading }),

        // Bottom Section - Heatmap & Insights
        React.createElement(
            'div',
            { className: 'dashboard-bottom' },
            React.createElement(ProductivityHeatmap, { loading: pageLoading }),
            React.createElement(
                'div',
                { className: 'insights-section' },
                insightsData.map((insight, index) =>
                    React.createElement(InsightCard, {
                        key: index,
                        icon: insight.icon,
                        title: insight.title,
                        description: insight.description,
                        metric: insight.metric,
                        loading: pageLoading
                    })
                )
            )
        )
    );
}
