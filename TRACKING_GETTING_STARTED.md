# Activity Tracking System - Getting Started

**Quick Start Guide for FocusSense Activity Tracking**

---

## 🚀 TL;DR - 30 Second Overview

The activity tracking system **automatically monitors** your:
- Clicks and keystrokes
- Tab switching
- Idle time (30+ seconds)

Then calculates a **Focus Score (0-100)** based on:
- How much time you're actively working
- Tab switching penalties
- Mouse vs keyboard usage

**Result**: Live focus metrics on your dashboard!

---

## 📋 What Was Added

### 3 New Files Created
1. **src/hooks/useTracking.js** (450 lines)
   - Tracks all your activity
   - Stores in localStorage
   - Provides session stats

2. **src/utils/activity-calculator.js** (500 lines)
   - Calculates focus score
   - Applies penalties
   - Generates insights

3. **src/components/ActivityTracker.js** (150 lines)
   - Sets up event listeners
   - Runs in background
   - No UI (invisible)

### 2 Files Updated
1. **src/components/DashboardPage.js**
   - Now shows real tracking data
   - Updates every 5 seconds
   - Live focus score!

2. **index.html**
   - Added script tags for new files
   - Correct load order

---

## 🎯 How to Use It

### Right Now - Zero Setup Required
1. Open http://localhost:3000
2. Navigate to Dashboard
3. Click, type, switch tabs naturally
4. **Watch your focus score update live**

That's it! Everything works automatically.

### Check Your Scores in Browser Console
```javascript
// See current stats
const tracking = useTracking();
console.log(tracking.getSessionStats());

// Calculate focus score
const stats = tracking.getSessionStats();
console.log(ActivityCalculator.calculateAdjustedFocusScore(stats));

// See breakdown
console.log(ActivityCalculator.getFocusScoreBreakdown(stats));
```

---

## 📊 Focus Score Explained

### The Math
```
Focus Score = Active Time / Total Time × 100

But with penalties for:
- Being idle too much (up to -30 points)
- Switching tabs too often (up to -25 points)
- Using mouse too much (up to -25 points)

Final score: 0-100
```

### Score Levels
| Score | Rating | Mental State |
|-------|--------|--------------|
| 90-100 | Excellent | Deep focus 🎯 |
| 75-89 | Good | Productive 💪 |
| 60-74 | Moderate | Acceptable ✓ |
| 40-59 | Poor | Distracted ⚠️ |
| 0-39 | Very Poor | Unfocused ❌ |

### Example Day
```
9:00 AM - Score: 85 (Excellent)
  "Start of day, well-rested"

12:00 PM - Score: 62 (Moderate)
  "Mid-day slump, more tab switching"

3:00 PM - Score: 78 (Good)
  "After break, back in zone"

5:00 PM - Score: 45 (Poor)
  "End of day, tired, distracted"
```

---

## 🔍 What's Being Tracked

### Every Second
```javascript
✓ Is user active? (last activity < 30 seconds ago)
✓ Are they typing? (keystroke detected)
✓ Are they clicking? (click detected in last 300-500ms)
✓ Are they visible? (tab is in focus)
```

### Every Hour
```javascript
✓ Snapshot of activity (clicks, keystrokes, idle time)
✓ Store in localStorage for analytics
```

### Data Stored
```javascript
{
  date: "2026-04-07",
  activeTime: 1800000,        // ms
  idleTime: 300000,           // ms
  tabSwitches: 5,             // count
  clicks: 145,                // count
  keystrokes: 3420,           // count
  hourlyData: { /* snapshots */ },
  activityLog: [ /* last 100 events */ ]
}
```

---

## 🎨 Dashboard Updates

### Focus Score Card
```javascript
Now shows:
✅ Your actual focus score (0-100)
✅ Updates every 5 seconds
✅ Real data, not mock
```

### Active Time Card
```javascript
Now shows:
✅ Actual minutes you've been active
✅ Real tracking, not estimated
```

### Tab Switches Card
```javascript
Now shows:
✅ Real count of tab switches
✅ Updates as you work
```

### Session Details (NEW)
```javascript
Shows:
✓ How long session has been running
✓ Total clicks
✓ Total keystrokes
✓ Total idle minutes
```

### Insights Panel (DYNAMIC)
```javascript
Auto-generates based on your activity:
📊 Peak Hours - When you focus best
☕ Break Pattern - How often you rest
🌍 Environment - Your work style
🔄 Distractions - Tab switches detected
```

---

## 💾 Data Storage

### Where Is It Stored?
```javascript
Browser's localStorage:
Key: 'focussense-tracking'
Location: Your computer, not cloud
Privacy: 100% - nothing sent to server
```

### Does It Reset?
```javascript
✓ Daily: Resets at midnight automatically
✓ New date detected automatically
✓ Old data not deleted (just new slot)
✓ Can access previous days via API
```

### How Much Space?
```
Per day: 5-10 KB
After 1 month: ~150-330 KB
After 1 year: ~1.8-4 MB
Totally fine for localStorage
```

---

## 🧪 Test It Out

### Test 1: Click Tracking (30 seconds)
```
1. Open browser console: F12
2. Type: const tracking = useTracking();
3. Type: console.log(tracking.getSessionStats().clicks);
4. Click around on the page (10+ clicks)
5. Type command again
6. ✓ Number should increase
```

### Test 2: Typing Detection (30 seconds)
```
1. Open browser console
2. Copy: tracking.getSessionStats().keystrokes
3. Type on the page
4. Paste same command
5. ✓ Number should be higher
```

### Test 3: Idle Detection (45 seconds)
```
1. Open browser console
2. Check: tracking.calculateIdleTime()
3. Don't move mouse or type for 30+ seconds
4. Check again
5. ✓ Should return true after 30 seconds
```

### Test 4: Focus Score
```
1. Open browser console
2. Get: const stats = tracking.getSessionStats();
3. Get: ActivityCalculator.calculateAdjustedFocusScore(stats);
4. ✓ Should show 0-100
5. ✓ Try clicking a lot and checking again
```

### Test 5: Insights
```
1. Open browser console
2. ActivityCalculator.generateInsights(
     tracking.getSessionStats(),
     tracking.getTrackingData()
   );
3. ✓ Should show Peak Hours, Break Pattern, etc
```

---

## ⚙️ Configuration

### Can I Change the Idle Threshold?
**File**: `src/hooks/useTracking.js`
**Line**: 7
**Current**: 30000 (30 seconds)

```javascript
// Change this to make idle threshold different
const IDLE_THRESHOLD = 30000; // milliseconds

// Examples:
const IDLE_THRESHOLD = 60000;   // 60 seconds (1 minute)
const IDLE_THRESHOLD = 300000;  // 300 seconds (5 minutes)
const IDLE_THRESHOLD = 15000;   // 15 seconds (more sensitive)
```

### Can I Change Update Frequency?
**File**: `src/components/DashboardPage.js`
**Line**: 20
**Current**: 5000 (5 seconds)

```javascript
// Change dashboard update frequency
setInterval(() => {
    // ... update code
}, 5000); // milliseconds

// Examples:
// 1000 = update every second (more real-time)
// 10000 = update every 10 seconds (less CPU usage)
```

---

## 🐛 Troubleshooting

### "I don't see tracking data"
```
1. Check console for errors: F12
2. Verify localStorage: 
   JSON.parse(localStorage.getItem('focussense-tracking'))
3. Try page refresh
4. Check that ActivityTracker component loaded (see index.html)
5. Verify script load order in index.html
```

### "Focus score stays at 0"
```
1. Make sure you're actively clicking/typing
2. Wait at least 1 second for activity to register
3. Check: JSON.parse(localStorage.getItem('focussense-tracking'))
4. Make sure date is today
```

### "Dashboard doesn't update"
```
1. Ensure ActivityTracker is running
2. Check browser console for errors
3. Verify DashboardPage loaded correctly
4. Try refreshing the page
5. Check that interval is running (every 5s)
```

---

## 📚 Learn More

### Full Guides Available
- **ACTIVITY_TRACKING_GUIDE.md** - 50+ pages, comprehensive
- **ACTIVITY_TRACKING_QUICK_REF.md** - 20 pages, quick lookup
- **ACTIVITY_TRACKING_IMPLEMENTATION.md** - Implementation details

### Code Files
- **src/hooks/useTracking.js** - Read the comments
- **src/utils/activity-calculator.js** - See algorithms
- **src/components/ActivityTracker.js** - See event listeners

---

## 🎯 Next Steps

1. **Explore Dashboard**: Navigate around and watch scores update
2. **Check Insights**: See what patterns are discovered
3. **Review Code**: Look at how tracking works
4. **Customize**: Adjust thresholds or update intervals
5. **Integrate**: Build more features on top!

---

## ✨ Cool Features

### Peak Hours Analysis
```javascript
const peaks = tracking.getPeakHours();
// Shows your 3 most productive hours
// Use this to schedule important tasks
```

### Break Pattern Analysis
```javascript
const breaks = tracking.getBreakFrequency();
// Shows when you naturally take breaks
// Helps optimize work schedule
```

### Activity Timeline
```javascript
const timeline = tracking.getActivityTimeline();
// Shows last 100 activities with timestamps
// Useful for analyzing work patterns
```

### Export Data
```javascript
const data = tracking.getTrackingData();
const json = JSON.stringify(data, null, 2);
// Download as JSON, import elsewhere, etc
```

---

## 🚀 You're All Set!

Everything is running automatically.

**Just use the app normally and watch your focus score update!**

---

## 📞 Quick Commands

```javascript
// Get current session stats
tracking.getSessionStats()

// Calculate focus score
ActivityCalculator.calculateAdjustedFocusScore(stats)

// Get score breakdown
ActivityCalculator.getFocusScoreBreakdown(stats)

// Get insights
ActivityCalculator.generateInsights(stats, trackingData)

// Get recommendations
ActivityCalculator.getRecommendations(stats)

// Get peak hours
tracking.getPeakHours()

// Check if idle
tracking.calculateIdleTime()

// Get break frequency
tracking.getBreakFrequency()

// Pause/resume
tracking.pauseSession()
tracking.resumeSession()

// View all data
tracking.getTrackingData()
```

---

**Happy focusing!** 🎯

