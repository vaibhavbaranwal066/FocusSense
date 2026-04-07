# Dashboard Developer Guide

## 🛠️ Component API Reference

### **CircularProgress**

Animated circular progress indicator.

```javascript
React.createElement(CircularProgress, {
    value: 87,      // Current progress (0-100)
    max: 100,       // Maximum value
    size: 120       // Diameter in pixels
})
```

**Props:**
- `value` (number): Current value, default: 87
- `max` (number): Maximum value, default: 100
- `size` (number): Diameter, default: 120

**Output:** Animated SVG circle with center text

---

### **StatCard**

Display metric with trend indicator.

```javascript
// Basic stat card
React.createElement(StatCard, {
    title: 'Active Time',
    value: '4h 32m',
    icon: '⏱️',
    change: '+45 min',
    trend: 'positive',
    loading: false
})

// Focus score card (specialized)
React.createElement(FocusScoreCard, {
    score: 87,
    loading: false
})
```

**Props:**
- `title` (string): Card label
- `value` (string): Main metric value
- `icon` (string): Emoji icon
- `change` (string): Trend text
- `trend` (string): 'positive' | 'negative' | 'neutral'
- `loading` (boolean): Shows skeleton if true

**Trends:**
- `positive` - Green with ↑
- `negative` - Red with ↓
- `neutral` - Gray with →

---

### **LineChart**

SVG line chart with multiple time periods.

```javascript
// Default data (auto-generated)
React.createElement(LineChart, {
    data: null,
    loading: false
})

// Custom data
const customData = [65, 72, 78, 85, 82, 90, 95];
React.createElement(LineChart, {
    data: customData,
    loading: false
})
```

**Props:**
- `data` (array): Data points, default: null (uses built-in)
- `loading` (boolean): Shows skeleton if true

**Data Format:**
- Array of numbers (0-100)
- Any length supported (auto-calculates Y-axis)
- Week: 7 values
- Month: 14 values
- Year: 12 values

**Features:**
- Period toggle (Week, Month, Year)
- Automatic state management
- Responsive SVG scaling

---

### **ProductivityHeatmap**

GitHub-style contribution heatmap.

```javascript
// Auto-generated data (random 0-4)
React.createElement(ProductivityHeatmap, {
    data: null,
    loading: false
})

// Custom data (28 values, 0-4)
const customData = [0, 1, 2, 3, 4, 2, 1, ...];
React.createElement(ProductivityHeatmap, {
    data: customData,
    loading: false
})
```

**Props:**
- `data` (array): 28 values (0-4), default: null
- `loading` (boolean): Shows skeleton if true

**Intensity Levels:**
- 0: No activity (gray)
- 1: Low (light indigo)
- 2: Normal (medium indigo)
- 3: High (dark indigo)
- 4: Very High (primary indigo)

**Features:**
- 4 weeks × 7 days grid
- Hover tooltips with day names
- Interactive scaling
- Color legend

---

### **InsightCard**

Recommendation card with metric.

```javascript
React.createElement(InsightCard, {
    icon: '🌅',
    title: 'Peak Hours',
    description: 'You focus best between 9 AM and 11 AM. Schedule important tasks during this window.',
    metric: { 
        label: 'Productivity:',
        value: '+18%'
    },
    loading: false
})
```

**Props:**
- `icon` (string): Emoji icon
- `title` (string): Card title
- `description` (string): Detailed text
- `metric` (object): { label: string, value: string }
- `loading` (boolean): Shows skeleton if true

**Metric Object:**
```javascript
{
    label: 'Productivity:',  // Left side text
    value: '+18%'            // Right side highlighted value
}
```

---

### **DashboardPage**

Main dashboard container with all components.

```javascript
React.createElement(DashboardPage, {
    loading: false
})
```

**Props:**
- `loading` (boolean): Shows all skeletons if true

**Structure:**
```
Page Header
├─ Stats Grid (3 cards)
├─ Activity Chart
└─ Bottom Grid
   ├─ Heatmap (2fr)
   └─ Insights (1fr)
```

---

## 🎨 Customization Examples

### **Change Theme Colors**

Edit `src/styles/global.css`:

```css
:root {
    --primary: #6366F1;        /* Change primary color */
    --primary-light: #818CF8;  /* Light variant */
    --primary-dark: #4F46E5;   /* Dark variant */
}
```

All dashboard components automatically use these variables.

---

### **Customize Focus Score**

In `src/components/DashboardPage.js`:

```javascript
// Change the score value
React.createElement(FocusScoreCard, { 
    score: 95  // Change 87 to any value 0-100
})
```

---

### **Add Custom Insight**

In `src/components/DashboardPage.js`, update `insightsData`:

```javascript
const insightsData = [
    // ... existing insights ...
    {
        icon: '⚡',
        title: 'Your Custom Insight',
        description: 'Your custom description here with actionable advice.',
        metric: { label: 'Your Label:', value: 'Your Value' }
    }
];
```

---

### **Integrate with API**

Replace mock data with real data:

```javascript
// In DashboardPage.js
React.useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/api/dashboard');
            const data = await response.json();
            
            // Update component state with real data
            setStatsData(data.stats);
            setChartData(data.chart);
            setHeatmapData(data.heatmap);
            setInsights(data.insights);
        } catch (error) {
            console.error('Failed to load dashboard:', error);
        }
    };
    
    fetchData();
}, []);
```

---

### **Custom Chart Data**

```javascript
// Weekly data
const weekData = [65, 78, 82, 85, 81, 87, 90];
React.createElement(LineChart, { data: weekData })

// Monthly data
const monthData = [68, 72, 75, 78, 82, 85, 87, 84, 88, 90, 87, 85, 89, 91];
React.createElement(LineChart, { data: monthData })

// Yearly data
const yearData = [65, 68, 70, 75, 78, 82, 85, 87, 90, 88, 92, 95];
React.createElement(LineChart, { data: yearData })
```

---

### **Custom Heatmap Data**

```javascript
// Generate based on API
async function getHeatmapData() {
    const response = await fetch('/api/heatmap');
    const data = await response.json();
    // Expects: [0, 1, 2, 3, 4, 2, 1, ...] (28 values)
    return data;
}
```

---

## 🔧 Advanced Customization

### **Change Card Styling**

Edit `src/styles/dashboard.css`:

```css
.stat-card {
    background: linear-gradient(135deg, var(--bg-secondary) 0%, rgba(30, 41, 59, 0.8) 100%);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    /* Modify as needed */
}

.stat-card:hover {
    transform: translateY(-4px);  /* Adjust hover effect */
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
}
```

---

### **Adjust Animation Timing**

Edit `src/styles/dashboard.css` or `src/styles/animations.css`:

```css
@keyframes fillCircle {
    to {
        opacity: 1;
        stroke-dashoffset: var(--dashoffset, 100);
    }
}

.circular-progress-fill {
    animation: fillCircle 1.5s ease-out forwards;  /* Change 1.5s */
}
```

---

### **Add Loading Simulation**

In `DashboardPage.js`:

```javascript
const [pageLoading, setPageLoading] = React.useState(true);

React.useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
        setPageLoading(false);
    }, 2000);  // 2 second loading time
    
    return () => clearTimeout(timer);
}, []);

// Pass to components
React.createElement(DashboardPage, { loading: pageLoading })
```

---

## 📊 Data Transformation Examples

### **Format API Response**

```javascript
// API returns raw data
const apiData = {
    focusScore: 87,
    activeTimeMinutes: 272,
    distractionCount: 12,
    weekData: [65, 78, 82, 85, 81, 87, 90]
};

// Transform for component
const statsData = [
    {
        title: 'Active Time',
        value: `${Math.floor(apiData.activeTimeMinutes / 60)}h ${apiData.activeTimeMinutes % 60}m`,
        icon: '⏱️',
        change: '+45 min',
        trend: 'positive'
    }
];
```

---

## 🎬 Animation Customization

### **Modify Card Entrance**

Edit keyframe in `animations.css`:

```css
@keyframes slideUp {
    from {
        transform: translateY(20px);  /* Increase for more dramatic effect */
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.stat-card {
    animation: slideUp 400ms ease-out 50ms both;  /* Adjust timing */
}
```

---

### **Add New Animation**

```css
@keyframes customFade {
    0% {
        opacity: 0;
        filter: blur(10px);
    }
    100% {
        opacity: 1;
        filter: blur(0);
    }
}

.stat-card {
    animation: customFade 500ms ease-out forwards;
}
```

---

## 🧪 Testing Examples

### **Test Component Rendering**

```javascript
// Basic rendering test
const card = React.createElement(StatCard, {
    title: 'Test Card',
    value: '100',
    icon: '✓',
    change: 'Test',
    trend: 'positive'
});

// Verify in browser console
console.log(card);
```

### **Test Loading States**

```javascript
// Test skeleton loader
React.createElement(StatCard, { loading: true })

// Should show shimmer animation
```

---

## 📈 Performance Tips

1. **Memoize Components** (when using hooks)
```javascript
const MemoizedCard = React.useMemo(() => 
    React.createElement(StatCard, props),
    [props]
);
```

2. **Lazy Load Charts**
```javascript
// Only render chart when visible
const [showChart, setShowChart] = React.useState(false);

React.useEffect(() => {
    const timer = setTimeout(() => setShowChart(true), 500);
    return () => clearTimeout(timer);
}, []);

if (showChart) {
    React.createElement(LineChart);
}
```

3. **Debounce resize events**
```javascript
window.addEventListener('resize', 
    Utils.debounce(() => {
        // Recalculate chart dimensions
    }, 250)
);
```

---

## 🚀 Deployment Checklist

- [ ] Replace mock data with API calls
- [ ] Test responsive design on real devices
- [ ] Verify theme switching works
- [ ] Test animations on slower devices
- [ ] Check accessibility (WCAG)
- [ ] Optimize image assets
- [ ] Minify CSS/JS (if needed)
- [ ] Set up error boundaries
- [ ] Configure CDN for React
- [ ] Set up monitoring

---

## 🐛 Debugging Tips

### **Console Logging**

```javascript
// Debug data flow
console.log('Check data:', statsData);
console.log('Chart data:', chartData);
console.log('Heatmap data:', heatmapData);
```

### **Performance Profiling**

```javascript
// Measure render time
console.time('DashboardRender');
// ... render code ...
console.timeEnd('DashboardRender');
```

### **Check Animations**

Open DevTools → Elements → Check computed styles for animations

---

## 📚 Related Resources

- **React Docs**: https://react.dev
- **MDN CSS**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **SVG Guide**: https://developer.mozilla.org/en-US/docs/Web/SVG
- **Animations**: MDN Web Animations API docs

---

## ✨ Best Practices

1. **Keep data separate** - Store API logic in separate files
2. **Reuse components** - Make components as generic as possible
3. **Comment code** - Explain complex logic
4. **Test thoroughly** - Check all screen sizes
5. **Optimize animations** - Use transform and opacity
6. **Handle errors** - Show user-friendly error messages
7. **Monitor performance** - Track render times

---

**Developer Guide Complete!** 🎉

For more info, see:
- `DASHBOARD_GUIDE.md` - Feature documentation
- `DASHBOARD_QUICK_REF.md` - Quick reference
- `README.md` - Project overview

*Last Updated: April 7, 2026*
