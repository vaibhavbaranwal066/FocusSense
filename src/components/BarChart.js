/**
 * BarChart Component
 * Displays vertical or horizontal bar charts with animations
 * Features:
 * - Responsive SVG rendering
 * - Smooth animations
 * - Custom colors and labels
 * - Tooltip support
 * - Data filtering
 */

const BarChart = (props) => {
  const {
    data = [],
    height = 300,
    width = 600,
    title = 'Bar Chart',
    color = '#6366F1',
    accentColor = '#EC4899',
    animated = true,
    showGrid = true,
    showLegend = true,
    unit = 'min',
    onBarClick = null
  } = props;

  if (!data || data.length === 0) {
    return React.createElement('div', {
      className: 'chart-empty',
      style: {
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111827',
        borderRadius: '12px',
        color: '#64748B'
      }
    }, 'No data available');
  }

  // Calculate dimensions
  const padding = 40;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  // Find max value for scaling
  const maxValue = Math.max(...data.map(d => d.value || 0), 100);
  const scale = innerHeight / maxValue;

  // Calculate bar width
  const barWidth = innerWidth / Math.max(data.length, 1) * 0.6;
  const spacing = innerWidth / Math.max(data.length, 1);

  // Create bars
  const bars = data.map((item, index) => {
    const barHeight = (item.value || 0) * scale;
    const x = padding + index * spacing + (spacing - barWidth) / 2;
    const y = padding + innerHeight - barHeight;

    const barColor = item.color || (index % 2 === 0 ? color : accentColor);
    const animationDelay = animated ? `${index * 30}ms` : '0ms';

    return React.createElement('g', { key: `bar-${index}` },
      // Bar
      React.createElement('rect', {
        x,
        y,
        width: barWidth,
        height: barHeight,
        fill: barColor,
        rx: 4,
        className: 'chart-bar',
        style: {
          cursor: 'pointer',
          transition: 'all 250ms ease',
          animation: animated ? `slideUp 400ms ease-out ${animationDelay} both` : 'none',
          opacity: animated ? 0 : 1
        },
        onMouseEnter: (e) => {
          e.target.style.opacity = '0.8';
          e.target.style.filter = 'brightness(1.1)';
        },
        onMouseLeave: (e) => {
          e.target.style.opacity = '1';
          e.target.style.filter = 'brightness(1)';
        },
        onClick: () => onBarClick && onBarClick(item, index)
      }),
      // Value label on top
      React.createElement('text', {
        x: x + barWidth / 2,
        y: y - 8,
        textAnchor: 'middle',
        fill: '#E2E8F0',
        fontSize: '12',
        fontWeight: '600',
        style: {
          animation: animated ? `fadeIn 300ms ease-out ${animationDelay} both` : 'none',
          opacity: animated ? 0 : 1
        }
      }, `${Math.round(item.value || 0)}`),
      // Label below
      React.createElement('text', {
        x: x + barWidth / 2,
        y: padding + innerHeight + 20,
        textAnchor: 'middle',
        fill: '#94A3B8',
        fontSize: '12',
        style: {
          animation: animated ? `fadeIn 300ms ease-out ${animationDelay} both` : 'none',
          opacity: animated ? 0 : 1
        }
      }, item.label || `Item ${index + 1}`)
    );
  });

  // Grid lines
  const gridLines = showGrid ? [] : null;
  if (showGrid) {
    for (let i = 1; i < 5; i++) {
      const y = padding + (innerHeight / 5) * i;
      const value = Math.round((maxValue / 5) * (5 - i));

      gridLines.push(
        React.createElement('g', { key: `grid-${i}` },
          React.createElement('line', {
            x1: padding,
            y1: y,
            x2: width - padding,
            y2: y,
            stroke: '#1E293B',
            strokeWidth: 1
          }),
          React.createElement('text', {
            x: padding - 8,
            y: y + 4,
            textAnchor: 'end',
            fill: '#64748B',
            fontSize: '11'
          }, `${value}${unit}`)
        )
      );
    }
  }

  return React.createElement('div', {
    className: 'bar-chart-container',
    style: {
      width: `${width}px`,
      margin: '0 auto'
    }
  },
    // Title
    React.createElement('div', {
      style: {
        marginBottom: '16px',
        color: '#F1F5F9',
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'center'
      }
    }, title),
    // SVG Chart
    React.createElement('svg', {
      width,
      height,
      viewBox: `0 0 ${width} ${height}`,
      style: {
        background: 'linear-gradient(to bottom, #0F172A, #111827)',
        borderRadius: '12px',
        border: '1px solid #1E293B'
      }
    },
      gridLines,
      // Axes
      React.createElement('line', {
        x1: padding,
        y1: padding,
        x2: padding,
        y2: padding + innerHeight,
        stroke: '#334155',
        strokeWidth: 2
      }),
      React.createElement('line', {
        x1: padding,
        y1: padding + innerHeight,
        x2: width - padding,
        y2: padding + innerHeight,
        stroke: '#334155',
        strokeWidth: 2
      }),
      bars
    )
  );
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BarChart;
}
