/**
 * Micro-Interactions & Effects Utilities
 * Ripple effects, smooth transitions, polished interactions
 */

// Ripple effect component (Material Design style)
const RippleButton = (props) => {
  const {
    onClick,
    children,
    className = '',
    disabled = false,
    style = {},
    variant = 'primary',
    ...rest
  } = props;

  const [ripples, setRipples] = React.useState([]);

  const handleMouseDown = (e) => {
    if (disabled) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = {
      id: Date.now(),
      x,
      y,
      size,
      startTime: Date.now()
    };

    setRipples(prev => [...prev, ripple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 600);

    // Call original onClick
    onClick && onClick(e);
  };

  // Determine button color based on variant
  const variantStyles = {
    primary: {
      background: '#6366F1',
      color: '#FFFFFF',
      borderColor: '#6366F1'
    },
    secondary: {
      background: 'transparent',
      color: '#6366F1',
      borderColor: '#6366F1'
    },
    danger: {
      background: '#EF4444',
      color: '#FFFFFF',
      borderColor: '#EF4444'
    }
  };

  return React.createElement('button', {
    onClick: handleMouseDown,
    disabled,
    className: `ripple-button ${className}`,
    style: {
      position: 'relative',
      padding: '10px 16px',
      border: '1px solid',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: disabled ? 'not-allowed' : 'pointer',
      overflow: 'hidden',
      transition: 'all 200ms ease',
      opacity: disabled ? 0.5 : 1,
      ...variantStyles[variant],
      ...style
    },
    ...rest
  },
    // Ripples
    ripples.map(ripple => {
      const elapsed = Date.now() - ripple.startTime;
      const progress = Math.min(elapsed / 600, 1);
      const scale = 4 + progress * 4;

      return React.createElement('span', {
        key: ripple.id,
        style: {
          position: 'absolute',
          left: ripple.x,
          top: ripple.y,
          width: ripple.size,
          height: ripple.size,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.5)',
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity: Math.max(0, 1 - progress),
          pointerEvents: 'none'
        }
      });
    }),
    children
  );
};

// Smooth transition wrapper
const SmoothTransition = (props) => {
  const { children, duration = 300, easing = 'ease-out' } = props;

  return React.createElement('div', {
    style: {
      animation: `fadeIn ${duration}ms ${easing}`,
      opacity: 0,
      '--duration': `${duration}ms`,
      '--easing': easing
    }
  }, children);
};

// Hover effect wrapper
const HoverEffect = (props) => {
  const { children, scale = 1.05, shadowLevel = 'md' } = props;
  const [isHovered, setIsHovered] = React.useState(false);

  const shadowMap = {
    sm: '0 2px 8px rgba(0,0,0,0.1)',
    md: '0 4px 16px rgba(0,0,0,0.15)',
    lg: '0 8px 24px rgba(0,0,0,0.2)',
    xl: '0 12px 32px rgba(0,0,0,0.25)'
  };

  return React.createElement('div', {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    style: {
      transform: isHovered ? `scale(${scale})` : 'scale(1)',
      boxShadow: isHovered ? shadowMap[shadowLevel] : 'none',
      transition: 'all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      cursor: 'pointer'
    }
  }, children);
};

// Animated counter component
const AnimatedCounter = (props) => {
  const {
    from = 0,
    to = 100,
    duration = 2000,
    formatter = (val) => Math.round(val).toString(),
    prefix = '',
    suffix = ''
  } = props;

  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    let startTime = null;

    const animate = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const value = from + (to - from) * easeProgress;

      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animation = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animation);
  }, [from, to, duration]);

  return React.createElement('span', {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, `${prefix}${formatter(count)}${suffix}`);
};

// Skeleton loader with shimmer effect
const Skeleton = (props) => {
  const {
    width = '100%',
    height = '20px',
    borderRadius = '8px',
    count = 1,
    spacing = '8px'
  } = props;

  return React.createElement('div', {
    style: { display: 'flex', flexDirection: 'column', gap: spacing }
  },
    Array(count).fill(null).map((_, index) =>
      React.createElement('div', {
        key: index,
        style: {
          width,
          height,
          borderRadius,
          background: 'linear-gradient(90deg, #1E293B 25%, #334155 50%, #1E293B 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
          opacity: 0.7
        }
      })
    )
  );
};

// Smooth scroll behavior
const useSmoothScroll = () => {
  const scrollToElement = React.useCallback((elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }, []);

  return { scrollToElement };
};

// Toast notification system
class ToastManager {
  static toasts = [];

  static show(message, type = 'info', duration = 3000) {
    const id = Date.now();
    const toast = { id, message, type, duration };

    this.toasts.push(toast);

    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, duration);

    return id;
  }

  static success(message, duration) {
    return this.show(message, 'success', duration);
  }

  static error(message, duration) {
    return this.show(message, 'error', duration);
  }

  static info(message, duration) {
    return this.show(message, 'info', duration);
  }

  static warning(message, duration) {
    return this.show(message, 'warning', duration);
  }
}

// Focus trap for modals
const useFocusTrap = (ref, isActive = true) => {
  React.useEffect(() => {
    if (!isActive || !ref.current) return;

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      const focusableElements = ref.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [ref, isActive]);
};

// Export all
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RippleButton,
    SmoothTransition,
    HoverEffect,
    AnimatedCounter,
    Skeleton,
    useSmoothScroll,
    ToastManager,
    useFocusTrap
  };
}
