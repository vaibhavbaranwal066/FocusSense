// Updated Dashboard Page Component with Live Tracking
function DashboardPage({ loading = false }) {
    const [pageLoading, setPageLoading] = React.useState(loading);
    const [trackingStats, setTrackingStats] = React.useState(null);
    const [focusScore, setFocusScore] = React.useState(0);
    const [insights, setInsights] = React.useState([]);
    const [chartData, setChartData] = React.useState([
        45, 52, 48, 61, 55, 67, 72, 58, 64, 71, 68, 75
    ]);

    const tracking = useTracking();

    React.useEffect(() => {
        // Initialize tracking data
        tracking.getTrackingData();
        setPageLoading(false);

        // Update tracking data every 5 seconds
        const interval = setInterval(() => {
            const stats = tracking.getSessionStats();
            setTrackingStats(stats);

            // Calculate focus score with penalties
            const score = ActivityCalculator.calculateAdjustedFocusScore(stats);
            setFocusScore(score);

            // Generate insights
            const trackingData = tracking.getTrackingData();
            const newInsights = ActivityCalculator.generateInsights(stats, trackingData);
            setInsights(newInsights);

            // Update chart data
            const timeline = tracking.getActivityTimeline();
            if (timeline.length > 0) {
                const recentActivities = timeline.slice(-12);
                const newChartData = recentActivities.map(() => 40 + Math.random() * 40);
                setChartData(newChartData);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Get display stats
    const stats = {
        activeTime: trackingStats ? Math.round(trackingStats.activeTime / 60) : 0,
        idleTime: trackingStats ? Math.round(trackingStats.idleTime / 60) : 0,
        tabSwitches: trackingStats?.tabSwitches || 0,
        clicks: trackingStats?.clicks || 0,
        keystrokes: trackingStats?.keystrokes || 0,
        sessionDuration: trackingStats ? Math.round(trackingStats.sessionDuration / 60) : 0
    };

    // Get display insights
    const displayInsights = insights.length > 0 ? insights : [
        {
            title: 'Peak Hours',
            description: 'Building your activity profile...',
            metric: '--:-- --',
            icon: '📊'
        },
        {
            title: 'Break Pattern',
            description: 'Continuous tracking enabled',
            metric: '--% breaks',
            icon: '☕'
        },
        {
            title: 'Environment',
            description: 'Monitor your workspace',
            metric: 'Active',
            icon: '🌍'
        },
        {
            title: 'Distractions',
            description: 'Tab switches monitored',
            metric: `${stats.tabSwitches} switches`,
            icon: '🔄'
        }
    ];

    return React.createElement(
        'div',
        { className: 'dashboard-container' },

        // Activity Tracker - Background monitoring
        React.createElement(ActivityTracker, {}),

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
                'Real-time activity tracking and focus analytics'
            )
        ),

        // Stats Grid (Top Section)
        React.createElement(
            'div',
            { className: 'stats-grid' },
            React.createElement(FocusScoreCard, { score: focusScore, loading: pageLoading }),
            React.createElement(StatCard, {
                title: 'Active Time',
                value: stats.activeTime,
                icon: '⏱️',
                unit: 'min',
                change: '+12%',
                trend: 'up',
                loading: pageLoading
            }),
            React.createElement(StatCard, {
                title: 'Tab Switches',
                value: stats.tabSwitches,
                icon: '🔄',
                unit: 'times',
                change: stats.tabSwitches > 10 ? '+8' : '-3',
                trend: stats.tabSwitches > 10 ? 'down' : 'up',
                loading: pageLoading
            })
        ),

        // Session Details
        React.createElement(
            'div',
            {
                style: {
                    background: 'var(--card-background)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: 'var(--shadow-sm)',
                    marginBottom: '40px'
                }
            },
            React.createElement('h3', { style: {
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                margin: '0 0 16px 0'
            }}, 'Current Session'),
            React.createElement('div', {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '16px'
                }
            },
                React.createElement('div', { style: { padding: '12px', backgroundColor: 'var(--background-secondary)', borderRadius: '8px' }},
                    React.createElement('p', { style: { color: 'var(--text-tertiary)', margin: '0', fontSize: '12px' }}, 'Duration'),
                    React.createElement('p', { style: { color: 'var(--text-primary)', margin: '4px 0 0 0', fontSize: '18px', fontWeight: '600' }}, `${stats.sessionDuration}m`)
                ),
                React.createElement('div', { style: { padding: '12px', backgroundColor: 'var(--background-secondary)', borderRadius: '8px' }},
                    React.createElement('p', { style: { color: 'var(--text-tertiary)', margin: '0', fontSize: '12px' }}, 'Clicks'),
                    React.createElement('p', { style: { color: 'var(--text-primary)', margin: '4px 0 0 0', fontSize: '18px', fontWeight: '600' }}, stats.clicks)
                ),
                React.createElement('div', { style: { padding: '12px', backgroundColor: 'var(--background-secondary)', borderRadius: '8px' }},
                    React.createElement('p', { style: { color: 'var(--text-tertiary)', margin: '0', fontSize: '12px' }}, 'Keystrokes'),
                    React.createElement('p', { style: { color: 'var(--text-primary)', margin: '4px 0 0 0', fontSize: '18px', fontWeight: '600' }}, stats.keystrokes)
                ),
                React.createElement('div', { style: { padding: '12px', backgroundColor: 'var(--background-secondary)', borderRadius: '8px' }},
                    React.createElement('p', { style: { color: 'var(--text-tertiary)', margin: '0', fontSize: '12px' }}, 'Idle Time'),
                    React.createElement('p', { style: { color: 'var(--text-primary)', margin: '4px 0 0 0', fontSize: '18px', fontWeight: '600' }}, `${stats.idleTime}m`)
                )
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
                displayInsights.slice(0, 4).map((insight, index) =>
                    React.createElement(InsightCard, {
                        key: index,
                        title: insight.title,
                        description: insight.description,
                        metric: insight.metric,
                        icon: insight.icon,
                        loading: pageLoading
                    })
                )
            )
        )
    );
}
