/**
 * Goals Page
 * Daily focus goal setting, tracking, and achievement system
 * Features:
 * - Goal input with validation
 * - Animated progress tracking
 * - Streak counter
 * - Achievement badges
 * - Historical calendar view
 */

const GoalsPage = () => {
  const [goalMinutes, setGoalMinutes] = React.useState(240);
  const [inputValue, setInputValue] = React.useState('');
  const [progress, setProgress] = React.useState(null);
  const [streak, setStreak] = React.useState(null);
  const [historicalGoals, setHistoricalGoals] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showSaved, setShowSaved] = React.useState(false);

  // Load goals data on mount
  React.useEffect(() => {
    setTimeout(() => {
      if (typeof GoalsManager !== 'undefined') {
        const currentGoal = GoalsManager.getDailyGoal();
        setGoalMinutes(currentGoal);
        setInputValue('');

        const tracking = localStorage.getItem('focussense-tracking');
        if (tracking) {
          const data = JSON.parse(tracking);
          const progressData = GoalsManager.getProgressToday(data.activeTime);
          setProgress(progressData);
        }

        const streakInfo = GoalsManager.getStreakInfo();
        setStreak(streakInfo);

        const historical = GoalsManager.getHistoricalGoals(30);
        setHistoricalGoals(historical);
      }
      setLoading(false);
    }, 400);
  }, []);

  const handleSetGoal = () => {
    const value = parseInt(inputValue) || goalMinutes;
    if (value >= 15 && value <= 480) {
      try {
        if (typeof GoalsManager !== 'undefined') {
          GoalsManager.setDailyGoal(value);
          setGoalMinutes(value);
          setInputValue('');
          setShowSaved(true);
          setTimeout(() => setShowSaved(false), 2000);

          // Refresh progress
          const tracking = localStorage.getItem('focussense-tracking');
          if (tracking) {
            const data = JSON.parse(tracking);
            const progressData = GoalsManager.getProgressToday(data.activeTime);
            setProgress(progressData);
          }
        }
      } catch (e) {
        console.error('Error setting goal:', e);
      }
    }
  };

  const handleCompleteGoal = () => {
    if (typeof GoalsManager !== 'undefined') {
      GoalsManager.completeGoal();
      const streakInfo = GoalsManager.getStreakInfo();
      setStreak(streakInfo);

      // Show celebration
      alert('🎉 Goal completed! Great work!');
    }
  };

  if (loading) {
    return React.createElement('div', {
      className: 'page-content',
      style: {
        padding: '32px',
        textAlign: 'center',
        animation: 'fadeIn 300ms ease-out'
      }
    }, '⏳ Loading goals...');
  }

  return React.createElement('div', {
    className: 'goals-page',
    style: {
      animation: 'fadeIn 300ms ease-out'
    }
  },
    React.createElement('div', {
      style: {
        padding: '32px',
        maxWidth: '1000px',
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
        }, '🎯 Daily Focus Goals'),
        React.createElement('p', {
          style: {
            color: '#94A3B8',
            margin: '0',
            fontSize: '14px'
          }
        }, 'Set and track your daily focus targets')
      ),

      // Goal setting section
      React.createElement('div', {
        style: {
          background: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)',
          border: '1px solid #1E293B',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          animation: 'slideUp 400ms ease-out 50ms both',
          opacity: 0
        }
      },
        React.createElement('h3', {
          style: {
            color: '#F1F5F9',
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 16px 0'
          }
        }, 'Set Your Daily Goal'),

        React.createElement('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '16px'
          }
        },
          React.createElement('div', null,
            React.createElement('label', {
              style: {
                display: 'block',
                color: '#94A3B8',
                fontSize: '12px',
                fontWeight: '500',
                marginBottom: '8px'
              }
            }, 'Goal (minutes)'),
            React.createElement('input', {
              type: 'number',
              value: inputValue,
              onChange: (e) => setInputValue(e.target.value),
              placeholder: goalMinutes.toString(),
              min: '15',
              max: '480',
              style: {
                width: '100%',
                padding: '12px',
                background: '#0F172A',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#F1F5F9',
                fontSize: '14px',
                transition: 'all 200ms ease'
              },
              onFocus: (e) => {
                e.target.style.borderColor = '#6366F1';
                e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
              },
              onBlur: (e) => {
                e.target.style.borderColor = '#334155';
                e.target.style.boxShadow = 'none';
              }
            })
          ),

          React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'flex-end',
              gap: '8px'
            }
          },
            React.createElement('button', {
              onClick: handleSetGoal,
              style: {
                flex: 1,
                padding: '12px 16px',
                background: '#6366F1',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 200ms ease'
              },
              onMouseEnter: (e) => {
                e.target.style.background = '#7C3AED';
                e.target.style.transform = 'translateY(-2px)';
              },
              onMouseLeave: (e) => {
                e.target.style.background = '#6366F1';
                e.target.style.transform = 'translateY(0)';
              }
            }, 'Set Goal'),

            showSaved && React.createElement('span', {
              style: {
                color: '#10B981',
                fontSize: '12px',
                fontWeight: '600',
                animation: 'fadeIn 200ms ease-out'
              }
            }, '✅ Saved!')
          )
        ),

        React.createElement('p', {
          style: {
            color: '#64748B',
            fontSize: '12px',
            margin: '0',
            fontStyle: 'italic'
          }
        }, `Current goal: ${goalMinutes} minutes (${Math.floor(goalMinutes / 60)}h ${goalMinutes % 60}m)`)
      ),

      // Progress section
      progress && React.createElement('div', {
        style: {
          background: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)',
          border: '1px solid #1E293B',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          animation: 'slideUp 400ms ease-out 100ms both',
          opacity: 0
        }
      },
        React.createElement('h3', {
          style: {
            color: '#F1F5F9',
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }
        }, 
          '📈 Today\'s Progress',
          React.createElement('span', {
            style: {
              fontSize: '12px',
              color: '#94A3B8',
              fontWeight: '400',
              marginLeft: 'auto'
            }
          }, progress.motivationalText)
        ),

        React.createElement(ProgressBar, {
          current: progress.activeMinutes,
          goal: progress.goalMinutes,
          height: 12,
          color: '#6366F1',
          animated: true,
          unit: ' min',
          status: progress.percentage >= 100 ? 'excellent' : progress.percentage >= 75 ? 'good' : 'progress',
          milestones: [
            { value: progress.goalMinutes * 0.25, label: '25%' },
            { value: progress.goalMinutes * 0.5, label: '50%' },
            { value: progress.goalMinutes * 0.75, label: '75%' }
          ]
        }),

        React.createElement('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginTop: '16px'
          }
        },
          [
            { icon: '✅', label: 'Completed', value: progress.completed ? 'Yes' : 'No' },
            { icon: '⏱️', label: 'Active Time', value: `${Math.floor(progress.activeMinutes / 60)}h ${Math.round(progress.activeMinutes % 60)}m` },
            { icon: '⏳', label: 'Remaining', value: `${Math.round(progress.remaining)} min` }
          ].map((stat, index) =>
            React.createElement('div', {
              key: index,
              style: {
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center'
              }
            },
              React.createElement('div', { style: { fontSize: '18px', marginBottom: '4px' } }, stat.icon),
              React.createElement('div', { style: { color: '#94A3B8', fontSize: '11px', marginBottom: '4px' } }, stat.label),
              React.createElement('div', { style: { color: '#F1F5F9', fontSize: '14px', fontWeight: '600' } }, stat.value)
            )
          )
        ),

        progress.completed && React.createElement('button', {
          onClick: handleCompleteGoal,
          style: {
            width: '100%',
            marginTop: '16px',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 200ms ease'
          },
          onMouseEnter: (e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.3)';
          },
          onMouseLeave: (e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }
        }, '🎉 Mark Goal as Completed')
      ),

      // Streak section
      streak && React.createElement('div', {
        style: {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
          border: '1px solid #A78BFA',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          animation: 'slideUp 400ms ease-out 150ms both',
          opacity: 0,
          color: '#FFFFFF'
        }
      },
        React.createElement('h3', {
          style: {
            fontSize: '24px',
            fontWeight: '700',
            margin: '0 0 16px 0',
            textAlign: 'center'
          }
        }, `🔥 Current Streak: ${streak.currentStreak} Days`),

        React.createElement('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            textAlign: 'center'
          }
        },
          [
            { label: 'Longest Streak', value: streak.longestStreak },
            { label: 'Days Completed', value: streak.totalDaysCompleted },
            { label: 'Streak Active', value: streak.streakActive ? '✅' : '❌' }
          ].map((stat, index) =>
            React.createElement('div', { key: index },
              React.createElement('div', { style: { fontSize: '12px', opacity: 0.9, marginBottom: '4px' } }, stat.label),
              React.createElement('div', { style: { fontSize: '20px', fontWeight: '700' } }, stat.value)
            )
          )
        )
      ),

      // Achievements section
      streak && streak.achievements.length > 0 && React.createElement('div', {
        style: {
          background: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)',
          border: '1px solid #1E293B',
          borderRadius: '12px',
          padding: '24px',
          animation: 'slideUp 400ms ease-out 200ms both',
          opacity: 0
        }
      },
        React.createElement('h3', {
          style: {
            color: '#F1F5F9',
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 16px 0'
          }
        }, '🏆 Achievements'),

        React.createElement('div', {
          style: {
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }
        },
          streak.achievements.map((achievement, index) =>
            React.createElement(AchievementBadge, {
              key: index,
              icon: achievement.icon,
              name: achievement.name,
              description: achievement.description,
              unlocked: achievement.unlocked,
              size: 'md'
            })
          )
        )
      ),

      // Calendar view
      historicalGoals.length > 0 && React.createElement('div', {
        style: {
          background: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)',
          border: '1px solid #1E293B',
          borderRadius: '12px',
          padding: '24px',
          animation: 'slideUp 400ms ease-out 250ms both',
          opacity: 0
        }
      },
        React.createElement('h3', {
          style: {
            color: '#F1F5F9',
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 16px 0'
          }
        }, '📅 Last 30 Days'),

        React.createElement('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(30px, 1fr))',
            gap: '4px'
          }
        },
          historicalGoals.map((day, index) =>
            React.createElement('div', {
              key: index,
              title: `${day.date}: ${day.completed ? '✅ Completed' : '❌ Not completed'}`,
              style: {
                aspectRatio: '1',
                borderRadius: '4px',
                background: day.completed
                  ? 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)'
                  : '#1E293B',
                border: '1px solid ' + (day.completed ? '#10B981' : '#334155'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                fontSize: '10px',
                color: day.completed ? '#FFFFFF' : '#64748B',
                fontWeight: '600'
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }, day.completed ? '✓' : '')
          )
        )
      )
    )
  );
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GoalsPage;
}
