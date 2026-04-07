/**
 * AchievementBadge Component
 * Displays achievement badges with unlock animations and details
 * Features:
 * - Animated unlock effect
 * - Tooltip with achievement info
 * - Locked/unlocked states
 * - Custom styling
 */

const AchievementBadge = (props) => {
  const {
    icon = '🏆',
    name = 'Achievement',
    description = 'Keep working to unlock',
    unlocked = false,
    onClick = null,
    size = 'md',
    showLabel = true
  } = props;

  const sizeMap = {
    sm: { container: 60, font: 12 },
    md: { container: 80, font: 14 },
    lg: { container: 100, font: 16 }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return React.createElement('div', {
    className: 'achievement-badge-wrapper',
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      transition: 'transform 200ms ease',
      group: 'hover'
    },
    onMouseEnter: (e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onClick: onClick
  },
    // Badge circle
    React.createElement('div', {
      style: {
        position: 'relative',
        width: `${currentSize.container}px`,
        height: `${currentSize.container}px`,
        borderRadius: '50%',
        background: unlocked
          ? 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)'
          : 'linear-gradient(135deg, #334155 0%, #1E293B 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: unlocked ? '2px solid #10B981' : '2px solid #475569',
        boxShadow: unlocked
          ? '0 0 20px rgba(99, 102, 241, 0.4)'
          : '0 0 0px rgba(0, 0, 0, 0)',
        transition: 'all 300ms ease',
        animation: unlocked ? `badgeUnlock 600ms ease-out` : 'none'
      }
    },
      // Icon
      React.createElement('div', {
        style: {
          fontSize: `${currentSize.font * 1.5}px`,
          filter: unlocked ? 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.6))' : 'grayscale(100%)',
          transition: 'filter 300ms ease'
        }
      }, icon),

      // Locked indicator
      !unlocked && React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: '-4px',
          right: '-4px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: '#1F2937',
          border: '2px solid #374151',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px'
        }
      }, '🔒')
    ),

    // Label
    showLabel && React.createElement('div', {
      style: {
        textAlign: 'center'
      }
    },
      React.createElement('div', {
        style: {
          color: unlocked ? '#10B981' : '#94A3B8',
          fontSize: '12px',
          fontWeight: '600',
          transition: 'color 300ms ease'
        }
      }, name),

      description && React.createElement('div', {
        style: {
          color: '#64748B',
          fontSize: '11px',
          marginTop: '2px',
          maxWidth: '100px',
          lineHeight: '1.3'
        }
      }, description)
    ),

    // Glow effect on hover for unlocked
    unlocked && React.createElement('div', {
      style: {
        position: 'absolute',
        inset: '-8px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
        opacity: 0,
        transition: 'opacity 300ms ease',
        pointerEvents: 'none'
      },
      className: 'badge-glow'
    })
  );
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AchievementBadge;
}
