# Activity Tracking System Guide

**Last Updated**: April 7, 2026  
**Status**: ✅ Fully Implemented  

---

## 📊 System Overview

The Activity Tracking System monitors user behavior in real-time and calculates a dynamic focus score based on:
- Active vs idle time
- Tab switching frequency
- Mouse clicks and keyboard activity
- Distraction patterns

---

## 🎯 Core Components

### 1. **useTracking() Hook**
📁 Location: `src/hooks/useTracking.js`

Custom React hook that manages all tracking data and provides methods for activity recording.

#### Key Methods:

```javascript
const tracking = useTracking();

// Record activity events
tracking.recordActivity('click', metadata);
tracking.recordActivity('keydown', metadata);
tracking.recordActivity('tab_switch', metadata);

// Get current session stats
const stats = tracking.getSessionStats();
// Returns: {
//   date, activeTime, idleTime, tabSwitches,
//   clicks, keystrokes, sessionDuration, totalActivities
// }

// Session management
tracking.pauseSession();
tracking.resumeSession();
tracking.resetDailyData();

// Analytics
const timeline = tracking.getActivityTimeline();
const peakHours = tracking.getPeakHours();
const breakInfo = tracking.getBreakFrequency();
```

#### Data Structure:
```javascript
{
  date: "2026-04-07",
  activeTime: 1800000,        // milliseconds
  idleTime: 300000,
  tabSwitches: 5,
  clicks: 145,
  keystrokes: 3420,
  startTime: 1712500000000,
  lastActivityTime: 1712505000000,
  isSessionActive: true,
  hourlyData: { /* per-hour snapshots */ },
  activityLog: [ /* activity history */ ]
}
```

---

### 2. **ActivityCalculator Utility**
📁 Location: `src/utils/activity-calculator.js`

Advanced calculation engine that computes focus scores and penalties.

#### Focus Score Algorithm:

```javascript
// Base score (0-100)
focusScore = (activeTime / totalTime) * 100

// Penalties applied:
- Idle time penalty: up to -30 points
- Tab switching penalty: up to -25 points
- Distraction penalty: up to -25 points

// Final score (0-100)
finalScore = baseScore - idlePenalty - tabPenalty - distractionPenalty
```

#### Key Calculations:

```javascript
// Calculate base score
const score = ActivityCalculator.calculateFocusScore(stats);

// Get score breakdown
const breakdown = ActivityCalculator.getFocusScoreBreakdown(stats);
// Returns: {
//   baseScore, idlePenalty, tabSwitchPenalty,
//   distractionPenalty, finalScore
// }

// Get focus level
const level = ActivityCalculator.getFocusLevel(85);
// Returns: { level: 'Good', color: '#3b82f6' }

// Generate insights
const insights = ActivityCalculator.generateInsights(stats, trackingData);

// Get recommendations
const recs = ActivityCalculator.getRecommendations(stats);
```

---

### 3. **ActivityTracker Component**
📁 Location: `src/components/ActivityTracker.js`

Background component that sets up event listeners and manages tracking.

#### Features:
- 🖱️ **Click Tracking**: Throttled to 500ms intervals
- ⌨️ **Keyboard Tracking**: Throttled to 300ms intervals
- 👁️ **Tab Visibility**: Tracks when user switches tabs
- ⏱️ **Idle Detection**: 30-second idle threshold
- 📊 **Hourly Snapshots**: Records activity every hour

#### Usage:
```javascript
// Simply render in your app (no props needed)
React.createElement(ActivityTracker, {})

// Automatically:
// - Sets up all event listeners
// - Tracks clicks, keystrokes, idle time
// - Updates localStorage every second
// - Records hourly snapshots
```

---

## 📈 Dashboard Integration

### Updated DashboardPage Component
📁 Location: `src/components/DashboardPage.js`

The dashboard now displays live tracking data:

```javascript
// Uses real tracking data
- Focus Score Card: Live focus score with penalties
- Active Time Card: Actual active time in minutes
- Tab Switches Card: Real tab switch count
- Session Details: Duration, clicks, keystrokes, idle time
- Activity Timeline: Chart from recent activity
- AI Insights: Dynamically generated insights
```

### Example Data Flow:
```javascript
1. User clicks, types, switches tabs
   ↓
2. ActivityTracker records events (throttled)
   ↓
3. useTracking hook updates localStorage
   ↓
4. DashboardPage reads stats every 5 seconds
   ↓
5. ActivityCalculator computes focus score
   ↓
6. Components update with new data
```

---

## 🔧 Focus Score Penalties Explained

### Idle Time Penalty
```javascript
// Based on percentage of time idle
0-10% idle:   0 penalty points
10-30% idle:  5-10 penalty points
30-50% idle:  10-20 penalty points
50%+ idle:    20-30 penalty points
```

**Example**: If you're idle 20% of the time:
- Penalty = (20 - 10) / 2 = 5 points

### Tab Switching Penalty
```javascript
// Based on switches per hour
<10 switches/hour:    0 penalty
10-30 switches/hour:  2-8 penalty
30-60 switches/hour:  8-15 penalty
>60 switches/hour:    15-25 penalty
```

**Example**: If you switch tabs 20 times in an hour:
- Penalty = (20 - 10) / 2.5 = 4 points

### Distraction Penalty
```javascript
// Based on click-to-keystroke ratio
0-20% clicks:    0 penalty (typing-focused)
20-40% clicks:   5 penalty
40-60% clicks:   15 penalty
60%+ clicks:     25 penalty (mouse-heavy)
```

**Example**: If 50% of activities are clicks:
- Penalty = 15 points (distraction from mouse movement)

---

## 💾 Data Storage Structure

### localStorage Keys:
```javascript
'focussense-tracking' = {
  date: "2026-04-07",
  activeTime: 1800000,
  idleTime: 300000,
  tabSwitches: 5,
  clicks: 145,
  keystrokes: 3420,
  hourlyData: {
    9: { hour: 9, activeTime: 450000, ... },
    10: { hour: 10, activeTime: 500000, ... },
    // ... per-hour data
  },
  activityLog: [
    { type: 'click', timestamp: 1712505000000 },
    { type: 'keydown', timestamp: 1712505001000 },
    // ... up to 100 most recent activities
  ]
}

'focussense-theme' = 'dark' | 'light'
```

### Daily Reset:
- Tracking data automatically resets at midnight
- New date detected by comparing `data.date` with current date
- All metrics reset to 0, timers reset

---

## 🎨 Integration with Dashboard Components

### Focus Score Card
```javascript
React.createElement(FocusScoreCard, {
  value: focusScore,        // 0-100
  max: 100,
  loading: false,
  change: '+5',             // Change since yesterday
  trend: 'up'               // 'up', 'down', 'neutral'
})
```

### Stat Cards (Active Time, Tab Switches)
```javascript
React.createElement(StatCard, {
  title: 'Active Time',
  value: stats.activeTime,  // in minutes
  icon: '⏱️',
  unit: 'min',
  change: '+12%',
  trend: 'up',
  loading: false
})
```

### Session Details Panel
Displays:
- Session Duration (minutes)
- Total Clicks
- Total Keystrokes
- Idle Time (minutes)

### Insights Panel
Dynamically generated based on activity:
- Peak Hours: Most productive time
- Break Pattern: Idle time trends
- Environment: Activity type (typing vs. clicking)
- Distractions: Tab switches and patterns

---

## 🚀 Advanced Usage

### Custom Event Recording
```javascript
const tracking = useTracking();

// Record custom event
tracking.recordActivity('file_saved', {
  fileName: 'report.pdf',
  size: 2048
});

// Later, retrieve activity log
const log = tracking.getActivityTimeline();
```

### Getting Peak Hours
```javascript
const peaks = tracking.getPeakHours();
// Returns: [
//   { hour: 10, activity: 185 },
//   { hour: 9, activity: 172 },
//   { hour: 14, activity: 156 }
// ]
```

### Break Frequency Analysis
```javascript
const breaks = tracking.getBreakFrequency();
// Returns: {
//   estimatedBreaks: 3,        // Pomodoro rhythm estimate
//   breakDuration: 15,         // Total break time in minutes
//   recommendedBreaks: 4       // Based on session length
// }
```

### Hourly Snapshots
```javascript
const score9am = tracking.getHourlyActivity(9);
// Returns: {
//   hour: 9,
//   activeTime: 450000,
//   idleTime: 120000,
//   clicks: 42,
//   keystrokes: 890,
//   timestamp: 1712505000000
// }
```

---

## ⚙️ Configuration

### Idle Threshold
Default: 30 seconds
```javascript
const tracking = useTracking();
const threshold = tracking.IDLE_THRESHOLD; // 30000 ms
```

To modify: Edit `useTracking.js` line 7
```javascript
const IDLE_THRESHOLD = 30000; // Change this value
```

### Update Intervals
```javascript
// Dashboard updates every 5 seconds (line 18 in DashboardPage)
// Idle tracking checks every 1 second (in ActivityTracker)
// Hourly snapshots recorded every hour
```

---

## 📊 Performance Optimization

### Throttling & Debouncing
```javascript
// Click tracking: throttled to 500ms
// Prevents counting rapid clicks multiple times

// Keyboard tracking: throttled to 300ms
// Prevents counting rapid keypresses separately

// Tab visibility: no throttle (instant)
// Important transitions need to be recorded immediately
```

### Data Storage Optimization
```javascript
// Activity log: keeps last 100 entries only (circular buffer)
// Prevents localStorage from growing infinitely

// Hourly data: one snapshot per hour
// 24 hours max = very small storage footprint

// Total storage: ~5-10 KB per day
```

---

## 📝 Usage Examples

### Example 1: Get Current Focus Score
```javascript
const tracking = useTracking();
const stats = tracking.getSessionStats();
const score = ActivityCalculator.calculateAdjustedFocusScore(stats);
console.log(`Current focus score: ${score}%`);
```

### Example 2: Check if User is Idle
```javascript
const tracking = useTracking();
const isIdle = tracking.calculateIdleTime();
if (isIdle) {
    console.log('User has been idle for 30+ seconds');
}
```

### Example 3: Generate Daily Report
```javascript
const tracking = useTracking();
const stats = tracking.getSessionStats();
const breakdown = ActivityCalculator.getFocusScoreBreakdown(stats);

console.log(`
Daily Report for ${stats.date}:
- Active Time: ${Math.round(stats.activeTime / 60)} minutes
- Idle Time: ${Math.round(stats.idleTime / 60)} minutes
- Tab Switches: ${stats.tabSwitches}
- Total Clicks: ${stats.clicks}
- Total Keystrokes: ${stats.keystrokes}
- Focus Score: ${breakdown.finalScore}
  - Base Score: ${breakdown.baseScore}
  - Idle Penalty: -${breakdown.idlePenalty}
  - Tab Penalty: -${breakdown.tabSwitchPenalty}
  - Distraction Penalty: -${breakdown.distractionPenalty}
`);
```

### Example 4: Export Data
```javascript
const tracking = useTracking();
const data = tracking.getTrackingData();
const json = JSON.stringify(data, null, 2);
// Can be sent to server or downloaded as CSV
```

---

## 🐛 Debugging

### Check Tracking Data
```javascript
// In browser console:
const data = JSON.parse(localStorage.getItem('focussense-tracking'));
console.log(data);
```

### Monitor Events
```javascript
// In browser console, override ActivityTracker:
window.addEventListener('click', () => console.log('Click tracked'));
window.addEventListener('keydown', () => console.log('Key tracked'));
document.addEventListener('visibilitychange', () => console.log('Tab change'));
```

### Verify Plugins
```javascript
// Check if all calculations working
const stats = {
  activeTime: 3600,
  idleTime: 600,
  sessionDuration: 4200,
  tabSwitches: 10,
  clicks: 50,
  keystrokes: 500
};

console.log('Focus Score:', ActivityCalculator.calculateAdjustedFocusScore(stats));
console.log('Breakdown:', ActivityCalculator.getFocusScoreBreakdown(stats));
```

---

## 🔄 Integration Checklist

- ✅ `useTracking()` hook added to `src/hooks/useTracking.js`
- ✅ `ActivityCalculator` utility added to `src/utils/activity-calculator.js`
- ✅ `ActivityTracker` component added to `src/components/ActivityTracker.js`
- ✅ `DashboardPage.js` updated to use live tracking data
- ✅ Script tags added to `index.html` in correct order:
  - Activity Calculator (utilities)
  - useTracking hook (hooks)
  - ActivityTracker component (components)
- ✅ IDLE_THRESHOLD configured (30 seconds)
- ✅ Update intervals set (5 seconds dashboard, 1 second tracking)
- ✅ localStorage structure properly configured

---

## 📚 File Reference

| File | Purpose | Size |
|------|---------|------|
| `src/hooks/useTracking.js` | Tracking state management | ~450 lines |
| `src/utils/activity-calculator.js` | Focus score calculations | ~500 lines |
| `src/components/ActivityTracker.js` | Event listeners & tracking | ~150 lines |
| `src/components/DashboardPage.js` | Updated with live data | ~200 lines |

**Total New Code**: ~1,300 lines

---

## 🎓 Learning Resources

### Focus Score Calculation
- Base score = Active Time / Total Time * 100
- Penalties reduce final score
- Score range: 0-100
- Ideal score: 75-100 (good focus)

### Activity Tracking
- Click frequency indicates mouse movement
- Keystroke count indicates typing
- Tab switches indicate context switching
- Idle time indicates breaks/inactivity

### Optimization Tips
- Reduce tab switches: use single-tab focus
- Increase active time: take scheduled breaks
- Reduce distractions: use keyboard shortcuts
- Monitor patterns: use hourly insights

---

**All components fully tested and production-ready!** ✨

