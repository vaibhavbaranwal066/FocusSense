/**
 * ProgressBar Component
 * Animated progress bar with segmentation and status indicators
 * Features:
 * - Smooth animations
 * - Segmented display
 * - Status indicators
 * - Custom colors
 * - Milestone markers
 */

const ProgressBar = (props) => {
  const {
    current = 0,
    goal = 100,
    height = 8,
    color = '#6366F1',
    backgroundColor = '#1E293B',
    animated = true,
    showPercentage = true,
    showValue = false,
    unit = '',
    milestones = [],
    status = 'progress'
  } = props;

  const percentage = Math.min((current / goal) * 100, 100);

  // Determine color based on status
  const statusColors = {
    'excellent': '#10B981',
    'good': '#06B6D4',
    'progress': '#6366F1',
    'warning': '#F59E0B',
    'danger': '#EF4444'
  };

  const barColor = statusColors[status] || color;

  // Animation style
  const animationStyle = animated ? {
    animation: `fillBar 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
    opacity: 0,
    '--bar-width': `${percentage}%`
  } : {
    width: `${percentage}%`
  };

  // Status icons
  const statusIcons = {
    'excellent': '✅',
    'good': '👍',
    'progress': '⏳',
    'warning': '⚠️',
    'danger': '🔴'
  };

  return React.createElement('div', {
    className: 'progress-bar-wrapper',
    style: {
      width: '100%'
    }
  },
    // Header with label and percentage
    React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        gap: '12px'
      }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#E2E8F0',
          fontSize: '12px',
          fontWeight: '500'
        }
      },
        React.createElement('span', { style: { fontSize: '14px' } }, statusIcons[status]),
        React.createElement('span', null, `${current}${unit} / ${goal}${unit}`)
      ),
      showPercentage && React.createElement('div', {
        style: {
          color: barColor,
          fontSize: '12px',
          fontWeight: '600',
          minWidth: '40px',
          textAlign: 'right'
        }
      }, `${Math.round(percentage)}%`)
    ),

    // Progress bar container
    React.createElement('div', {
      style: {
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        backgroundColor: backgroundColor,
        borderRadius: `${height}px`,
        overflow: 'hidden',
        border: `1px solid #334155`
      }
    },
      // Milestone markers
      milestones && milestones.length > 0 && React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          pointerEvents: 'none'
        }
      },
        milestones.map((milestone, index) => {
          const pos = (milestone.value / goal) * 100;
          return React.createElement('div', {
            key: `milestone-${index}`,
            style: {
              position: 'absolute',
              left: `${pos}%`,
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'rgba(148, 163, 184, 0.5)',
              transform: 'translateX(-50%)',
              opacity: pos < percentage ? 0.7 : 0.3
            },
            title: milestone.label
          });
        })
      ),

      // Fill bar
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          background: barColor,
          borderRadius: `${height}px`,
          transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          width: `${percentage}%`,
          boxShadow: `0 0 12px ${barColor}40`,
          ...animationStyle
        }
      })
    ),

    // Milestone labels
    milestones && milestones.length > 0 && React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '6px',
        fontSize: '10px',
        color: '#64748B'
      }
    },
      milestones.map((milestone, index) => (
        React.createElement('div', {
          key: `label-${index}`,
          style: {
            textAlign: 'center'
          }
        }, milestone.label)
      ))
    )
  );
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProgressBar;
}
