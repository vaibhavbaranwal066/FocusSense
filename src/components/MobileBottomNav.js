/**
 * Mobile Bottom Navigation
 * Provides touch-friendly navigation at bottom of mobile screen
 */

const MobileBottomNav = (props) => {
  const { currentPage = 'dashboard', onNavigate } = props;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'goals', label: 'Goals', icon: '🎯' }
  ];

  const isActive = (itemId) => currentPage === itemId;

  return React.createElement('nav', {
    style: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(to top, #0F172A 0%, #1E293B 100%)',
      borderTop: '1px solid #1E293B',
      padding: '8px 0',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 100,
      backdropFilter: 'blur(10px)',
      height: '60px'
    }
  },
    navItems.map(item =>
      React.createElement('button', {
        key: item.id,
        onClick: () => onNavigate(item.id),
        style: {
          background: 'transparent',
          border: 'none',
          color: isActive(item.id) ? '#6366F1' : '#94A3B8',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          padding: '8px 12px',
          borderRadius: '8px',
          transition: 'all 200ms ease',
          flex: 1,
          maxWidth: '80px',
          fontSize: '12px',
          fontWeight: '500'
        },
        onMouseEnter: (e) => {
          if (!isActive(item.id)) {
            e.currentTarget.style.color = '#CBD5E1';
            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
          }
        },
        onMouseLeave: (e) => {
          if (!isActive(item.id)) {
            e.currentTarget.style.color = '#94A3B8';
            e.currentTarget.style.background = 'transparent';
          }
        }
      },
        React.createElement('span', {
          style: { fontSize: '20px' }
        }, item.icon),
        React.createElement('span', null, item.label)
      )
    )
  );
};

// Responsive container for bottom nav
const BottomNavContainer = (props) => {
  const { children, currentPage, onNavigate, showBottomNav = true } = props;
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return React.createElement('div', {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%'
    }
  },
    // Main content with padding for bottom nav on mobile
    React.createElement('div', {
      style: {
        width: '100%',
        height: '100%',
        paddingBottom: isMobile && showBottomNav ? '60px' : '0',
        overflow: 'auto'
      }
    }, children),

    // Bottom navigation on mobile
    isMobile && showBottomNav && React.createElement(MobileBottomNav, {
      currentPage: currentPage,
      onNavigate: onNavigate
    })
  );
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MobileBottomNav,
    BottomNavContainer
  };
}
