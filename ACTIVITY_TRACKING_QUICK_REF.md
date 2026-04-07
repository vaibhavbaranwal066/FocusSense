# Activity Tracking - Quick Reference

---

## 🎯 What's Being Tracked

| Metric | Unit | Method |
|--------|------|--------|
| Active Time | Seconds | Recorded when activity detected < 30s ago |
| Idle Time | Seconds | Recorded when no activity > 30s |
| Tab Switches | Count | document.visibilitychange event |
| Clicks | Count | document click event (throttled 500ms) |
| Keystrokes | Count | document keydown event (throttled 300ms) |

---

## 📊 Focus Score Calculation

```
focusScore = (activeTime / totalTime) × 100

Penalties:
- Idle: up to -30 points (if >50% idle)
- Tab Switches: up to -25 points (if >60 switches/hour)
- Distractions: up to -25 points (if >60% clicks)

Final Score: 0-100
```

### Score Levels
| Score | Level | Color |
|-------|-------|-------|
| 90-100 | Excellent | 🟢 Green |
| 75-89 | Good | 🔵 Blue |
| 60-74 | Moderate | 🟡 Amber |
| 40-59 | Poor | 🔴 Red |
| 0-39 | Very Poor | 🔴 Dark Red |

---

## 🔧 Using the Tracking System

### In React Components

```javascript
// Get tracking instance
const tracking = useTracking();

// Get current stats
const stats = tracking.getSessionStats();
// {
//   date: "2026-04-07",
//   activeTime: 1800000,    // ms
//   idleTime: 300000,
//   tabSwitches: 5,
//   clicks: 145,
//   keystrokes: 3420,
//   sessionDuration: 2100   // seconds
// }

// Calculate focus score
const score = ActivityCalculator.calculateAdjustedFocusScore(stats);
// 73
```

### Get Insights

```javascript
const tracking = useTracking();
const stats = tracking.getSessionStats();
const trackingData = tracking.getTrackingData();

// Generate insights
const insights = ActivityCalculator.generateInsights(stats, trackingData);
// [
//   { title: 'Peak Hours', description: '...', metric: '10:00', icon: '📊' },
//   { title: 'Idle Time', description: '...', metric: '18% idle', icon: '😴' },
//   ...
// ]
```

### Peak Hours Analysis

```javascript
const peaks = tracking.getPeakHours();
// [
//   { hour: 10, activity: 185 },
//   { hour: 9, activity: 172 },
//   { hour: 14, activity: 156 }
// ]
```

---

## 💾 Data Stored in localStorage

```javascript
// Key: 'focussense-tracking'
{
  date: "2026-04-07",
  activeTime: 1800000,
  idleTime: 300000,
  tabSwitches: 5,
  clicks: 145,
  keystrokes: 3420,
  startTime: 1712500000000,
  lastActivityTime: 1712505000000,
  isSessionActive: true,
  hourlyData: { /* hour snapshots */ },
  activityLog: [ /* last 100 events */ ]
}
```

**Auto-resets at midnight** (new date detected automatically)

---

## 🎨 Dashboard Integration

```jsx
// Activity Tracker runs in background (automatically)
React.createElement(ActivityTracker, {})

// Stats display real-time data
React.createElement(FocusScoreCard, { 
  value: focusScore,    // 73
  trend: 'up'
})

React.createElement(StatCard, {
  title: 'Active Time',
  value: 30,            // minutes
  icon: '⏱️'
})

// Insights auto-generated from tracking data
const insights = ActivityCalculator.generateInsights(stats, trackingData);
```

---

## 📈 Common Queryes

### "What's my current focus score?"
```javascript
const stats = tracking.getSessionStats();
const score = ActivityCalculator.calculateAdjustedFocusScore(stats);
console.log(score); // 73
```

### "How long have I been active?"
```javascript
const stats = tracking.getSessionStats();
console.log(Math.round(stats.activeTime / 60)); // 30 minutes
```

### "How many times did I switch tabs?"
```javascript
const stats = tracking.getSessionStats();
console.log(stats.tabSwitches); // 5
```

### "When do I focus best?"
```javascript
const peaks = tracking.getPeakHours();
console.log(peaks[0]); // { hour: 10, activity: 185 }
```

### "What's my break frequency?"
```javascript
const breaks = tracking.getBreakFrequency();
console.log(breaks.estimatedBreaks); // 3
```

---

## ⚠️ When Score Drops

| Issue | Penalty | Solution |
|-------|---------|----------|
| High idle time | -5 to -30 | Take scheduled breaks |
| Tab switching | -2 to -25 | Stay focused on one task |
| Mouse heavy | -5 to -25 | Use keyboard shortcuts |

---

## 🎛️ Configuration

| Setting | Value | File | Line |
|---------|-------|------|------|
| Idle Threshold | 30000 ms (30s) | useTracking.js | 7 |
| Click Throttle | 500 ms | ActivityTracker.js | 85 |
| Keystroke Throttle | 300 ms | ActivityTracker.js | 91 |
| Dashboard Update | 5000 ms | DashboardPage.js | 20 |

---

## 🔄 Session Management

```javascript
const tracking = useTracking();

// Pause tracking (user steps away)
tracking.pauseSession();

// Resume tracking
tracking.resumeSession();

// Reset daily data (new day)
tracking.resetDailyData();

// Get tracking data
const data = tracking.getTrackingData();
```

---

## 📋 Recommendations Engine

```javascript
const tracking = useTracking();
const stats = tracking.getSessionStats();

// Get AI recommendations
const recs = ActivityCalculator.getRecommendations(stats);
// [
//   { priority: 'high', text: 'Take regular breaks...' },
//   { priority: 'medium', text: 'Reduce tab switching...' }
// ]
```

---

## 🐛 Debug Tracking

```javascript
// Check current data
JSON.parse(localStorage.getItem('focussense-tracking'))

// Monitor events
console.log('Tracking enabled:', tracking.getTrackingData())

// Test score calculation
const testStats = {
  activeTime: 3600,
  idleTime: 600,
  sessionDuration: 4200,
  tabSwitches: 10,
  clicks: 50,
  keystrokes: 500
}
console.log(ActivityCalculator.calculateAdjustedFocusScore(testStats))
```

---

## 📂 Files Overview

| File | Purpose | Key Export |
|------|---------|-----------|
| useTracking.js | State management | `useTracking()` hook |
| activity-calculator.js | Calculations | `ActivityCalculator` object |
| ActivityTracker.js | Event listeners | Auto-running component |
| DashboardPage.js | Display | Updated with live data |

---

## ✅ Status

- ✅ Tracking implemented and running
- ✅ Dashboard integrated with live data
- ✅ Focus score calculating correctly
- ✅ Data persisting to localStorage
- ✅ Insights generating dynamically
- ✅ All event listeners active

---

## 🚀 Next Steps

1. **Monitor Your Data**: Watch your focus score throughout the day
2. **Identify Patterns**: Check peak hours and break patterns
3. **Optimize**: Use insights to improve focus
4. **Export Data**: (Coming soon: download tracking report)
5. **Share Insights**: (Coming soon: send to coach/manager)

---

**Ready to track your focus!** 🎯

