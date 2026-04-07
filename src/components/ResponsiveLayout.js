/**
 * Responsive Mobile Drawer Sidebar
 * Replaces fixed sidebar on mobile devices with a slide-out drawer
 */

const MobileDrawer = (props) => {
  const { isOpen, onClose, children } = props;

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return React.createElement('div', {
    className: 'mobile-drawer-wrapper',
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: isOpen ? 1000 : -1,
      pointerEvents: isOpen ? 'auto' : 'none'
    }
  },
    // Overlay (backdrop)
    React.createElement('div', {
      onClick: onClose,
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 300ms ease-out',
        pointerEvents: isOpen ? 'auto' : 'none'
      }
    }),

    // Drawer content
    React.createElement('div', {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '240px',
        background: 'linear-gradient(to bottom, #0F172A 0%, #1E293B 100%)',
        border: '1px solid #1E293B',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        overflowY: 'auto',
        zIndex: 1001,
        boxShadow: isOpen ? '0 8px 24px rgba(0, 0, 0, 0.3)' : 'none',
        display: 'flex',
        flexDirection: 'column'
      }
    },
      // Close button
      React.createElement('div', {
        style: {
          padding: '16px',
          display: 'flex',
          justifyContent: 'flex-end'
        }
      },
        React.createElement('button', {
          onClick: onClose,
          style: {
            background: 'transparent',
            border: 'none',
            color: '#94A3B8',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            transition: 'all 200ms ease'
          },
          onMouseEnter: (e) => {
            e.target.style.background = 'rgba(148, 163, 184, 0.1)';
            e.target.style.color = '#F1F5F9';
          },
          onMouseLeave: (e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#94A3B8';
          }
        }, '✕')
      ),

      // Drawer content
      React.createElement('div', {
        style: {
          flex: 1,
          overflow: 'auto',
          padding: '0 16px 16px'
        }
      }, children)
    )
  );
};

// Responsive app wrapper
const ResponsiveLayout = (props) => {
  const {
    sidebar,
    navbar,
    mainContent,
    onSidebarToggle = null
  } = props;

  const [isMobile, setIsMobile] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Check screen size
  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    onSidebarToggle && onSidebarToggle(!drawerOpen);
  };

  return React.createElement('div', {
    style: {
      display: 'flex',
      height: '100vh',
      overflow: 'hidden'
    }
  },
    // Fixed sidebar (desktop only)
    !isMobile && React.createElement('div', {
      style: {
        width: '240px',
        borderRight: '1px solid #1E293B',
        overflow: 'auto'
      }
    }, sidebar),

    // Mobile drawer
    isMobile && React.createElement(MobileDrawer, {
      isOpen: drawerOpen,
      onClose: () => setDrawerOpen(false)
    }, sidebar),

    // Main content
    React.createElement('div', {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }
    },
      // Top navbar with menu button
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '12px 16px' : '0',
          borderBottom: '1px solid #1E293B'
        }
      },
        // Mobile menu button
        isMobile && React.createElement('button', {
          onClick: toggleDrawer,
          style: {
            background: 'transparent',
            border: 'none',
            color: '#F1F5F9',
            fontSize: '20px',
            marginRight: '16px',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }, '☰'),

        // Navbar content
        React.createElement('div', {
          style: {
            flex: 1,
            minHeight: isMobile ? 'auto' : '64px',
            display: 'flex',
            alignItems: 'center'
          }
        }, navbar)
      ),

      // Page content
      React.createElement('div', {
        style: {
          flex: 1,
          overflow: 'auto'
        }
      }, mainContent)
    )
  );
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MobileDrawer,
    ResponsiveLayout
  };
}
