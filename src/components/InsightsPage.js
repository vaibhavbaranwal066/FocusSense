/**
 * Insights Page
 * Displays AI-style insights and personalized recommendations
 * Features:
 * - Rule-based insight generation
 * - Chat-style UI
 * - Severity levels with icons
 * - Actionable recommendations
 * - Historical trend analysis
 */

const InsightsPage = () => {
  const [insights, setInsights] = React.useState([]);
  const [recommendation, setRecommendation] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    // Simulate loading
    setTimeout(() => {
      const trackingData = localStorage.getItem('focussense-tracking');
      if (trackingData) {
        const data = JSON.parse(trackingData);
        
        // Generate insights using the insights engine
        if (typeof InsightsEngine !== 'undefined') {
          const generated = InsightsEngine.generateInsights(data);
          setInsights(generated);

          const topRecommendation = InsightsEngine.getTopRecommendation(generated);
          setRecommendation(topRecommendation);
        }
      }
      setLoading(false);
    }, 600);
  }, []);

  // Severity styling
  const getSeverityStyle = (severity) => {
    const styles = {
      'critical': {
        background: 'rgba(239, 68, 68, 0.1)',
        borderColor: '#EF4444',
        textColor: '#FCA5A5'
      },
      'warning': {
        background: 'rgba(245, 158, 11, 0.1)',
        borderColor: '#F59E0B',
        textColor: '#FDE047'
      },
      'positive': {
        background: 'rgba(16, 185, 129, 0.1)',
        borderColor: '#10B981',
        textColor: '#86EFAC'
      },
      'info': {
        background: 'rgba(99, 102, 241, 0.1)',
        borderColor: '#6366F1',
        textColor: '#A5B4FC'
      }
    };
    return styles[severity] || styles.info;
  };

  // Get severity icon
  const getSeverityIcon = (severity) => {
    const icons = {
      'critical': '⚠️',
      'warning': '🔔',
      'positive': '✨',
      'info': 'ℹ️'
    };
    return icons[severity] || 'ℹ️';
  };

  return React.createElement('div', {
    className: 'insights-page',
    style: {
      animation: 'fadeIn 300ms ease-out'
    }
  },
    React.createElement('div', {
      style: {
        padding: '32px',
        maxWidth: '900px',
        margin: '0 auto'
      }
    },
      // Header
      React.createElement('div', {
        style: {
          marginBottom: '32px'
        }
      },
        React.createElement('h1', {
          style: {
            fontSize: '32px',
            fontWeight: '700',
            color: '#F1F5F9',
            margin: '0 0 8px 0'
          }
        }, '💡 Insights & Recommendations'),
        React.createElement('p', {
          style: {
            color: '#94A3B8',
            margin: '0',
            fontSize: '14px'
          }
        }, 'Personalized insights based on your activity patterns')
      ),

      // Top recommendation banner
      recommendation && React.createElement('div', {
        style: {
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
          animation: 'slideUp 400ms ease-out 50ms both',
          opacity: 0
        }
      },
        React.createElement('div', {
          style: {
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start'
          }
        },
          React.createElement('div', { style: { fontSize: '28px', minWidth: '40px' } }, '🎯'),
          React.createElement('div', {
            style: { flex: 1 }
          },
            React.createElement('h3', {
              style: {
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '700',
                margin: '0 0 4px 0'
              }
            }, 'Top Priority'),
            React.createElement('p', {
              style: {
                color: '#E0E7FF',
                fontSize: '13px',
                margin: '0 0 12px 0',
                lineHeight: '1.5'
              }
            }, recommendation.message),
            recommendation.action && React.createElement('button', {
              onClick: () => console.log('Action clicked'),
              style: {
                background: '#FFFFFF',
                color: '#6366F1',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 200ms ease'
              },
              onMouseEnter: (e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
              },
              onMouseLeave: (e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }, recommendation.action)
          )
        )
      ),

      // Insights list
      loading ? React.createElement('div', {
        style: {
          textAlign: 'center',
          padding: '40px 20px',
          color: '#64748B'
        }
      }, '⏳ Generating insights...') :
      insights.length === 0 ? React.createElement('div', {
        style: {
          textAlign: 'center',
          padding: '40px 20px',
          background: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)',
          borderRadius: '12px',
          color: '#94A3B8'
        }
      }, '😊 Great job! No issues detected. Keep up the focus!') :
      React.createElement('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }
      },
        insights.map((insight, index) => {
          const severity = getSeverityStyle(insight.severity);
          return React.createElement('div', {
            key: index,
            style: {
              background: severity.background,
              border: `1px solid ${severity.borderColor}`,
              borderRadius: '12px',
              padding: '16px',
              animation: `slideUp 400ms ease-out ${50 + index * 50}ms both`,
              opacity: 0,
              transition: 'all 200ms ease',
              cursor: 'pointer'
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.transform = 'translateX(4px)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${severity.borderColor}40`;
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = 'none';
            }
          },
            React.createElement('div', {
              style: {
                display: 'flex',
                gap: '16px'
              }
            },
              React.createElement('div', {
                style: {
                  fontSize: '24px',
                  minWidth: '32px',
                  lineHeight: '1'
                }
              }, getSeverityIcon(insight.severity)),

              React.createElement('div', { style: { flex: 1 } },
                // Title
                React.createElement('div', {
                  style: {
                    color: severity.textColor,
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }
                },
                  insight.title,
                  insight.severity === 'positive' && React.createElement('span', { style: { color: '#10B981', fontSize: '12px' } }, '+' + insight.impact)
                ),

                // Message
                React.createElement('p', {
                  style: {
                    color: '#E2E8F0',
                    fontSize: '13px',
                    margin: '0 0 8px 0',
                    lineHeight: '1.5'
                  }
                }, insight.message),

                // Action button
                insight.action && React.createElement('button', {
                  onClick: () => console.log('Insight action:', insight.action),
                  style: {
                    background: 'transparent',
                    color: severity.textColor,
                    border: `1px solid ${severity.borderColor}`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 200ms ease'
                  },
                  onMouseEnter: (e) => {
                    e.target.style.background = severity.borderColor + '20';
                  },
                  onMouseLeave: (e) => {
                    e.target.style.background = 'transparent';
                  }
                }, `→ ${insight.action}`)
              )
            )
          );
        })
      ),

      // Footer
      React.createElement('div', {
        style: {
          marginTop: '32px',
          padding: '20px',
          background: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)',
          border: '1px solid #1E293B',
          borderRadius: '12px',
          textAlign: 'center',
          animation: 'slideUp 400ms ease-out 300ms both',
          opacity: 0
        }
      },
        React.createElement('p', {
          style: {
            color: '#94A3B8',
            fontSize: '12px',
            margin: '0'
          }
        }, '🤖 Insights are generated using advanced activity analysis algorithms and are updated in real-time as you use FocusSense.'),
        React.createElement('p', {
          style: {
            color: '#64748B',
            fontSize: '11px',
            margin: '8px 0 0 0'
          }
        }, 'Last updated: ' + new Date().toLocaleTimeString())
      )
    )
  );
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InsightsPage;
}
