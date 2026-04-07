/**
 * Advanced Analytics Page
 * Displays comprehensive focus analytics with multiple visualizations
 * Features:
 * - Filter by Today/Week/Month
 * - Bar chart for focus time
 * - Pie chart for activity breakdown
 * - Line chart trend
 * - Summary statistics
 * - Animated transitions
 */

const AnalyticsPage = () => {
  const [filter, setFilter] = React.useState('today');
  const [loading, setLoading] = React.useState(true);
  const [analyticsData, setAnalyticsData] = React.useState(null);
  const [activeChart, setActiveChart] = React.useState('focus-time');

  // Get tracking data
  const useTrackingData = () => {
    const stored = localStorage.getItem('focussense-tracking');
    return stored ? JSON.parse(stored) : null;
  };

  // Generate analytics data based on filter
  const generateAnalyticsData = (filterType) => {
    const trackingData = useTrackingData();
    if (!trackingData) {
      return null;
    }

    const today = new Date().toISOString().split('T')[0];

    // Simulate historical data (in production, this comes from backend)
    let data = {
      today: {
        focusTime: [
          { label: '00:00-04:00', value: 0 },
          { label: '04:00-08:00', value: 15 },
          { label: '08:00-12:00', value: 120 },
          { label: '12:00-16:00', value: 95 },
          { label: '16:00-20:00', value: 110 },
          { label: '20:00-24:00', value: 60 }
        ],
        activityBreakdown: [
          { label: 'Focused Work', value: Math.round(trackingData.keystrokes / 10), color: '#6366F1' },
          { label: 'Browsing', value: Math.round(trackingData.clicks * 0.3), color: '#EC4899' },
          { label: 'Idle Time', value: Math.round(trackingData.idleTime / 60000), color: '#64748B' },
          { label: 'Searching', value: Math.round(trackingData.tabSwitches * 5), color: '#8B5CF6' }
        ],
        focusScore: Math.round((trackingData.activeTime / (trackingData.activeTime + trackingData.idleTime)) * 100),
        totalFocusTime: Math.round(trackingData.activeTime / 60000),
        avgSessionLength: Math.round(trackingData.activeTime / 60000 / 1),
        distractions: trackingData.tabSwitches,
        totalSessions: 1
      },
      week: {
        focusTime: [
          { label: 'Monday', value: 240 },
          { label: 'Tuesday', value: 265 },
          { label: 'Wednesday', value: 290 },
          { label: 'Thursday', value: 275 },
          { label: 'Friday', value: 300 },
          { label: 'Saturday', value: 180 },
          { label: 'Sunday', value: 150 }
        ],
        activityBreakdown: [
          { label: 'Focused Work', value: 75, color: '#6366F1' },
          { label: 'Browsing', value: 15, color: '#EC4899' },
          { label: 'Idle Time', value: 8, color: '#64748B' },
          { label: 'Searching', value: 2, color: '#8B5CF6' }
        ],
        focusScore: 78,
        totalFocusTime: 1700,
        avgSessionLength: 45,
        distractions: 145,
        totalSessions: 42
      },
      month: {
        focusTime: [
          { label: 'Week 1', value: 1200 },
          { label: 'Week 2', value: 1350 },
          { label: 'Week 3', value: 1280 },
          { label: 'Week 4', value: 1420 }
        ],
        activityBreakdown: [
          { label: 'Focused Work', value: 76, color: '#6366F1' },
          { label: 'Browsing', value: 14, color: '#EC4899' },
          { label: 'Idle Time', value: 7, color: '#64748B' },
          { label: 'Searching', value: 3, color: '#8B5CF6' }
        ],
        focusScore: 76,
        totalFocusTime: 5250,
        avgSessionLength: 41,
        distractions: 580,
        totalSessions: 168
      }
    };

    return data[filterType] || data.today;
  };

  // Load analytics on mount or filter change
  React.useEffect(() => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      const data = generateAnalyticsData(filter);
      setAnalyticsData(data);
      setLoading(false);
    }, 400);
  }, [filter]);

  if (loading) {
    return React.createElement('div', {
      className: 'page-content',
      style: {
        animation: 'fadeIn 300ms ease-out'
      }
    },
      React.createElement('div', {
        style: {
          padding: '32px',
          maxWidth: '1400px',
          margin: '0 auto'
        }
      },
        // Skeleton loading
        React.createElement('div', { style: { height: '40px', background: '#1E293B', borderRadius: '8px', marginBottom: '24px', animation: 'skeleton 1.5s ease-in-out infinite' } }),
        React.createElement('div', { style: { height: '300px', background: '#1E293B', borderRadius: '8px', animation: 'skeleton 1.5s ease-in-out infinite' } })
      )
    );
  }

  if (!analyticsData) {
    return React.createElement('div', {
      className: 'page-content',
      style: { padding: '32px', textAlign: 'center', color: '#94A3B8' }
    }, 'No analytics data available');
  }

  // Calculate trend
  const focusScoreTrend = analyticsData.focusScore >= 75 ? 'up' : analyticsData.focusScore >= 50 ? 'stable' : 'down';

  return React.createElement('div', {
    className: 'analytics-page',
    style: {
      animation: 'fadeIn 300ms ease-out'
    }
  },
    React.createElement('div', {
      style: {
        padding: '32px',
        maxWidth: '1400px',
        margin: '0 auto'
      }
    },
      // Header with filters
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          gap: '16px',
          flexWrap: 'wrap'
        }
      },
        React.createElement('div', null,
          React.createElement('h1', {
            style: {
              fontSize: '32px',
              fontWeight: '700',
              color: '#F1F5F9',
              margin: '0'
            }
          }, '📊 Analytics'),
          React.createElement('p', {
            style: {
              color: '#94A3B8',
              margin: '4px 0 0 0',
              fontSize: '14px'
            }
          }, 'Comprehensive focus and productivity insights')
        ),
        // Filter buttons
        React.createElement('div', {
          style: {
            display: 'flex',
            gap: '8px',
            background: '#0F172A',
            padding: '4px',
            borderRadius: '8px',
            border: '1px solid #1E293B'
          }
        },
          ['today', 'week', 'month'].map(f => 
            React.createElement('button', {
              key: f,
              onClick: () => setFilter(f),
              style: {
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                background: filter === f ? '#6366F1' : 'transparent',
                color: filter === f ? '#FFFFFF' : '#94A3B8',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                textTransform: 'capitalize'
              },
              onMouseEnter: (e) => {
                if (filter !== f) e.target.style.background = 'rgba(99, 102, 241, 0.1)';
              },
              onMouseLeave: (e) => {
                if (filter !== f) e.target.style.background = 'transparent';
              }
            }, f)
          )
        )
      ),

      // Summary statistics
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }
      },
        [
          { icon: '🎯', label: 'Focus Score', value: analyticsData.focusScore, unit: '%', trend: focusScoreTrend },
          { icon: '⏱️', label: 'Total Focus Time', value: analyticsData.totalFocusTime, unit: 'min' },
          { icon: '📈', label: 'Avg Session', value: analyticsData.avgSessionLength, unit: 'min' },
          { icon: '🔄', label: 'Distractions', value: analyticsData.distractions, unit: 'count' }
        ].map((stat, index) =>
          React.createElement('div', {
            key: index,
            style: {
              background: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)',
              border: '1px solid #1E293B',
              borderRadius: '12px',
              padding: '16px',
              animation: `slideUp 400ms ease-out ${index * 50}ms both`,
              opacity: 0
            }
          },
            React.createElement('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }
            },
              React.createElement('div', { style: { fontSize: '20px' } }, stat.icon),
              stat.trend && React.createElement('span', {
                style: {
                  color: stat.trend === 'up' ? '#10B981' : stat.trend === 'down' ? '#EF4444' : '#F59E0B',
                  fontSize: '12px',
                  fontWeight: '600'
                }
              }, stat.trend === 'up' ? '📈' : stat.trend === 'down' ? '📉' : '➡️')
            ),
            React.createElement('div', {
              style: { color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }
            }, stat.label),
            React.createElement('div', {
              style: { color: '#F1F5F9', fontSize: '24px', fontWeight: '700' }
            }, `${stat.value}${stat.unit}`)
          )
        )
      ),

      // Charts
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }
      },
        React.createElement('div', {
          style: {
            background: 'linear-gradient(135deg, #0F172A 0%, #111827 100%)',
            border: '1px solid #1E293B',
            borderRadius: '12px',
            padding: '20px',
            animation: 'slideUp 400ms ease-out 100ms both',
            opacity: 0
          }
        },
          React.createElement(BarChart, {
            data: analyticsData.focusTime,
            width: 500,
            height: 280,
            title: `📊 ${filter.charAt(0).toUpperCase() + filter.slice(1)} Focus Time`,
            color: '#6366F1',
            unit: 'min'
          })
        ),
        React.createElement('div', {
          style: {
            background: 'linear-gradient(135deg, #0F172A 0%, #111827 100%)',
            border: '1px solid #1E293B',
            borderRadius: '12px',
            padding: '20px',
            animation: 'slideUp 400ms ease-out 150ms both',
            opacity: 0
          }
        },
          React.createElement(PieChart, {
            data: analyticsData.activityBreakdown,
            width: 500,
            height: 300,
            title: '📈 Activity Breakdown'
          })
        )
      ),

      // Detailed insights
      React.createElement('div', {
        style: {
          background: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)',
          border: '1px solid #1E293B',
          borderRadius: '12px',
          padding: '20px',
          animation: 'slideUp 400ms ease-out 200ms both',
          opacity: 0
        }
      },
        React.createElement('h3', {
          style: { color: '#F1F5F9', fontSize: '16px', fontWeight: '600', margin: '0 0 16px 0' }
        }, '💡 Key Insights'),
        React.createElement('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '12px'
          }
        },
          [
            { icon: '🎯', text: `Your focus score is ${analyticsData.focusScore}%. ${analyticsData.focusScore >= 75 ? 'Excellent focus!' : 'Keep improving!'}` },
            { icon: '📈', text: `You focused for ${analyticsData.totalFocusTime} minutes with an average session of ${analyticsData.avgSessionLength} minutes.` },
            { icon: '🔄', text: `You had ${analyticsData.distractions} distractions during this period. Focus mode can help.` },
            { icon: '💪', text: `You completed ${analyticsData.totalSessions} focus sessions. Great consistency!` }
          ].map((insight, index) =>
            React.createElement('div', {
              key: index,
              style: {
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '13px',
                color: '#E2E8F0',
                display: 'flex',
                gap: '8px'
              }
            },
              React.createElement('span', { style: { fontSize: '16px', minWidth: '20px' } }, insight.icon),
              insight.text
            )
          )
        )
      )
    )
  );
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnalyticsPage;
}
