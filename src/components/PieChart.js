/**
 * PieChart Component
 * Displays pie/donut charts with animations and interactive legend
 * Features:
 * - Responsive SVG rendering
 * - Animated slice entrance
 * - Interactive legend with hover effects
 * - Tooltip support
 * - Custom colors
 */

const PieChart = (props) => {
  const {
    data = [],
    height = 300,
    width = 400,
    title = 'Pie Chart',
    donut = true,
    animated = true,
    showLegend = true,
    onSliceClick = null
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

  // Calculate total and percentages
  const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
  const slices = data.map((item, index) => {
    const percent = total > 0 ? (item.value || 0) / total : 0;
    return {
      ...item,
      percent,
      percentage: Math.round(percent * 100)
    };
  });

  // Generate colors if not provided
  const defaultColors = [
    '#6366F1', '#EC4899', '#8B5CF6', '#06B6D4', '#10B981',
    '#F59E0B', '#EF4444', '#14B8A6', '#3B82F6', '#F97316'
  ];

  // Place slices with angles
  const centerX = width / 2;
  const centerY = height / 2.2;
  const outerRadius = Math.min(width, height) / 3;
  const innerRadius = donut ? outerRadius * 0.6 : 0;

  let currentAngle = -90;
  const paths = [];

  slices.forEach((slice, index) => {
    const color = slice.color || defaultColors[index % defaultColors.length];
    const sliceAngle = slice.percent * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    // Convert angles to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Calculate points
    const x1Outer = centerX + outerRadius * Math.cos(startRad);
    const y1Outer = centerY + outerRadius * Math.sin(startRad);
    const x2Outer = centerX + outerRadius * Math.cos(endRad);
    const y2Outer = centerY + outerRadius * Math.sin(endRad);

    const x1Inner = centerX + innerRadius * Math.cos(startRad);
    const y1Inner = centerY + innerRadius * Math.sin(startRad);
    const x2Inner = centerX + innerRadius * Math.cos(endRad);
    const y2Inner = centerY + innerRadius * Math.sin(endRad);

    // Flag for large arc
    const largeArc = sliceAngle > 180 ? 1 : 0;

    // Build path
    let pathData = `M ${x1Outer} ${y1Outer}`;
    pathData += ` A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}`;
    pathData += ` L ${x2Inner} ${y2Inner}`;
    pathData += ` A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1Inner} ${y1Inner}`;
    pathData += ' Z';

    // Calculate label position
    const labelAngle = (startRad + endRad) / 2;
    const labelRadius = (outerRadius + innerRadius) / 2;
    const labelX = centerX + labelRadius * Math.cos(labelAngle);
    const labelY = centerY + labelRadius * Math.sin(labelAngle);

    const animationDelay = animated ? `${index * 50}ms` : '0ms';

    paths.push(
      React.createElement('g', { key: `slice-${index}` },
        // Slice
        React.createElement('path', {
          d: pathData,
          fill: color,
          opacity: 0.9,
          className: 'pie-slice',
          style: {
            cursor: 'pointer',
            transition: 'all 250ms ease',
            animation: animated ? `fadeIn 400ms ease-out ${animationDelay} both` : 'none',
            opacity: animated ? 0 : 0.9
          },
          onMouseEnter: (e) => {
            e.target.style.opacity = '1';
            e.target.style.filter = 'brightness(1.2)';
          },
          onMouseLeave: (e) => {
            e.target.style.opacity = '0.9';
            e.target.style.filter = 'brightness(1)';
          },
          onClick: () => onSliceClick && onSliceClick(slice, index)
        }),
        // Percentage label
        slice.percentage > 5 && React.createElement('text', {
          x: labelX,
          y: labelY,
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          fill: '#FFFFFF',
          fontSize: '12',
          fontWeight: '600',
          style: {
            animation: animated ? `fadeIn 400ms ease-out ${animationDelay + 100}ms both` : 'none',
            opacity: animated ? 0 : 1,
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }
        }, `${slice.percentage}%`)
      )
    );

    currentAngle = endAngle;
  });

  // Legend
  const legend = showLegend ? React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '12px',
      marginTop: '16px',
      padding: '0 16px'
    }
  },
    slices.map((slice, index) => {
      const color = slice.color || defaultColors[index % defaultColors.length];
      return React.createElement('div', {
        key: `legend-${index}`,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 200ms ease',
          background: 'rgba(100, 116, 139, 0.1)',
          fontSize: '12px'
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = 'rgba(100, 116, 139, 0.2)';
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = 'rgba(100, 116, 139, 0.1)';
        }
      },
        React.createElement('div', {
          style: {
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: color
          }
        }),
        React.createElement('div', {
          style: { flex: 1 }
        },
          React.createElement('div', { style: { color: '#E2E8F0', fontWeight: '500' } }, slice.label),
          React.createElement('div', { style: { color: '#94A3B8', fontSize: '11px' } }, 
            `${slice.value} (${slice.percentage}%)`
          )
        )
      );
    })
  ) : null;

  return React.createElement('div', {
    className: 'pie-chart-container',
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
      height: height - 40,
      viewBox: `0 0 ${width} ${height}`,
      style: {
        background: 'linear-gradient(to bottom, #0F172A, #111827)',
        borderRadius: '12px',
        border: '1px solid #1E293B'
      }
    },
      paths
    ),
    legend
  );
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PieChart;
}
