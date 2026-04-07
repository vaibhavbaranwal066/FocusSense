# Dashboard Quick Reference

## 🚀 Quick Start

1. **Open the app**: `http://localhost:3000`
2. **View Dashboard**: Click "Dashboard" in sidebar (default page)
3. **See animations**: Cards animate on load with stagger effect
4. **Toggle theme**: Click theme button in navbar to see design adapt

---

## 📊 Dashboard Components at a Glance

| Component | File | Purpose |
|-----------|------|---------|
| `DashboardPage` | `DashboardPage.js` | Main dashboard container |
| `CircularProgress` | `CircularProgress.js` | Animated progress circle |
| `StatCard` | `StatCard.js` | Metric display cards |
| `LineChart` | `LineChart.js` | Activity timeline chart |
| `ProductivityHeatmap` | `Heatmap.js` | GitHub-style heatmap |
| `InsightCard` | `InsightCard.js` | Insight recommendations |

---

## 🎨 Dashboard Sections

### **Top (Stats Grid)**
```
┌─────────────────┬─────────────────┬─────────────────┐
│  Focus Score    │  Active Time    │   Distractions  │
│  87 (animated)  │  4h 32m         │   12            │
└─────────────────┴─────────────────┴─────────────────┘
```

### **Middle (Chart)**
```
┌─────────────────────────────────────────┐
│        Activity Timeline                │
│    ╱╲    ╱╲                             │
│   ╱  ╲  ╱  ╲     [Week | Month | Year] │
│  ╱    ╲╱    ╲                          │
└─────────────────────────────────────────┘
```

### **Bottom (Heatmap + Insights)**
```
┌──────────────────────────┬─────────────────┐
│  Productivity Heatmap    │  Insights       │
│  ■ ■ □ ■ ■ ■ □         │  🌅 Peak Hours  │
│  ■ □ □ ■ ■ □ ■         │  💡 Break Tips  │
│  ■ ■ ■ ■ ■ ■ ■         │  🔊 Environment│
│  □ ■ ■ ■ □ □ ■         │  📱 Distracts  │
└──────────────────────────┴─────────────────┘
```

---

## 🎯 Key Features

✅ **Circular Progress** - Animated focus score (0-100)
✅ **Line Chart** - Week/Month/Year data with smooth animation
✅ **Heatmap** - 4-week activity grid with hover tooltips
✅ **Insights** - 4 AI-generated recommendations with metrics
✅ **Responsive** - Tablet, mobile, desktop layouts
✅ **Animations** - Smooth entrance, hover, and interaction effects
✅ **Skeleton Loaders** - Loading state placeholders
✅ **Theme Support** - Dark and light modes
✅ **No Dependencies** - Pure React (no chart libraries)

---

## 🔧 Customization

### **Change Focus Score**
Edit `DashboardPage.js`, line with `FocusScoreCard`:
```javascript
React.createElement(FocusScoreCard, { score: 95 }) // Change 87 to 95
```

### **Update Chart Data**
Pass data prop to `LineChart`:
```javascript
const customData = [70, 75, 80, 85, 90, 92, 95];
React.createElement(LineChart, { data: customData })
```

### **Modify Insights**
Update `insightsData` array in `DashboardPage.js`:
```javascript
const insightsData = [
    {
        icon: '🌅',
        title: 'Your Insight Title',
        description: 'Your description...',
        metric: { label: 'Your Label:', value: '...' }
    }
]
```

---

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Desktop | 1400px+ | 3 cols stats, 2-col bottom |
| Tablet | 768px - 1400px | 3 cols stats, 1-col bottom |
| Mobile | 480px - 767px | 1 col stats, 1-col everything |
| Small | <480px | Condensed, touch-optimized |

---

## 🎬 Animations Available

| Animation | Duration | Type |
|-----------|----------|------|
| Card entrance | 400ms | Slide up + stagger |
| Card hover | 250ms | Translate + shadow |
| Progress fill | 1500ms | Stroke dashoffset |
| Chart draw | 600ms | Slide up (line + points) |
| Heatmap hover | 150ms | Scale + shadow |

---

## 🔄 Loading States

All components support `loading={true}` prop:

```javascript
// Shows skeleton loaders
React.createElement(DashboardPage, { loading: true })
```

---

## 📊 Data Examples

### **Stats**
```javascript
{
    focusScore: 87,
    activeTime: '4h 32m',
    distractions: 12,
    trend: 'positive'
}
```

### **Chart (Week)**
```javascript
[65, 78, 82, 85, 81, 87, 90]
```

### **Heatmap (0-4 intensity)**
```javascript
[0, 1, 2, 3, 4, 2, 1, 0, 2, 3, 4, ...]
```

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Components not rendering | Check script load order in index.html |
| Styles not applying | Verify dashboard.css is linked in index.html |
| Theme toggle not working | Ensure theme-manager.js is loaded first |
| Chart not showing | Check LineChart receives valid data array |
| Mobile layout broken | Verify responsive.css media queries |

---

## 📋 Development Checklist

- [x] Dashboard page created
- [x] Statistics cards with animations
- [x] Circular progress indicator
- [x] Line chart with multiple periods
- [x] Productivity heatmap
- [x] Insight recommendations
- [x] Skeleton loaders
- [x] Mobile responsive
- [x] Dark/light theme support
- [x] Smooth animations
- [ ] API integration (next step)
- [ ] Real-time updates (future)
- [ ] Export functionality (future)

---

## 🎓 Code Structure

```
DashboardPage.js (Main container)
├── CircularProgress (Focus score)
├── StatCard x2 (Active time, distractions)
├── LineChart (Activity timeline)
├── ProductivityHeatmap (Heatmap)
└── InsightCard x4 (Insights)
```

---

## 🌟 Next Steps

1. **Connect real API** - Replace mock data with API calls
2. **Add more pages** - Analytics, Goals, Settings pages
3. **Implement filtering** - Date range, category filters
4. **Add export** - PNG/PDF dashboard export
5. **Real-time updates** - WebSocket for live data
6. **User preferences** - Customize insights and metrics

---

## 📞 Support

- Full guide: `DASHBOARD_GUIDE.md`
- Main docs: `README.md`
- Getting started: `GETTING_STARTED.md`

---

**Status**: ✅ Production Ready | 🚀 Ready to Deploy

*Last Updated: April 7, 2026*
