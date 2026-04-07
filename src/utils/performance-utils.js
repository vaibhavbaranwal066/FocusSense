/**
 * Performance Optimization Utilities
 * Helper functions for React memoization, lazy loading, and render optimization
 */

// Memoization helper for components
const withPerformance = (Component, displayName = Component.name) => {
  const Memoized = React.memo(Component, (prevProps, nextProps) => {
    // Custom comparison - return true if props are equal (skip re-render)
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  });

  Memoized.displayName = `withPerformance(${displayName})`;
  return Memoized;
};

// useCallback wrapper for event handlers
const useOptimizedCallback = (callback, dependencies) => {
  return React.useCallback(callback, dependencies);
};

// useMemo wrapper for expensive computations
const useOptimizedMemo = (computeFn, dependencies) => {
  return React.useMemo(computeFn, dependencies);
};

// Debounce helper for resize events
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Throttle helper for frequent events
const useThrottle = (value, interval) => {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastUpdated = React.useRef(null);

  React.useEffect(() => {
    const now = Date.now();

    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const id = setTimeout(() => {
        lastUpdated.current = now;
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(id);
    }
  }, [value, interval]);

  return throttledValue;
};

// Intersection Observer hook for lazy loading
const useIntersection = (ref, options = {}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isVisible;
};

// Image lazy loader
const LazyImage = (props) => {
  const { src, alt, fallback = '', className = '', ...rest } = props;
  const [loaded, setLoaded] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(fallback);
  const ref = React.useRef(null);
  const isVisible = useIntersection(ref);

  React.useEffect(() => {
    if (!isVisible) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setLoaded(true);
    };
  }, [isVisible, src]);

  return React.createElement('img', {
    ref,
    src: imageSrc,
    alt,
    className: className + (loaded ? ' loaded' : ' loading'),
    style: {
      opacity: loaded ? 1 : 0.5,
      transition: 'opacity 300ms ease-out'
    },
    ...rest
  });
};

// Virtual list component for large datasets
const VirtualList = (props) => {
  const { items, itemHeight, containerHeight, renderItem, renderKey } = props;
  const [scrollTop, setScrollTop] = React.useState(0);
  const containerRef = React.useRef(null);

  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return React.createElement('div', {
    ref: containerRef,
    onScroll: handleScroll,
    style: {
      height: containerHeight,
      overflow: 'auto',
      position: 'relative'
    }
  },
    React.createElement('div', {
      style: {
        height: items.length * itemHeight,
        position: 'relative'
      }
    },
      React.createElement('div', {
        style: {
          transform: `translateY(${offsetY}px)`,
          transition: 'transform 50ms linear'
        }
      },
        visibleItems.map((item, index) =>
          React.createElement('div', {
            key: renderKey ? renderKey(item) : startIndex + index,
            style: {
              height: itemHeight,
              overflow: 'hidden'
            }
          }, renderItem(item, startIndex + index))
        )
      )
    )
  );
};

// Performance monitor (dev only)
const useRenderTime = (componentName) => {
  React.useEffect(() => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`);
      }
    };
  });
};

// Export all
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    withPerformance,
    useOptimizedCallback,
    useOptimizedMemo,
    useDebounce,
    useThrottle,
    useIntersection,
    LazyImage,
    VirtualList,
    useRenderTime
  };
}
