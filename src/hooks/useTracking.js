/**
 * useTracking Hook
 * Tracks user activity: idle time, tab switches, clicks, keystrokes
 * Returns real-time tracking data for dashboard integration
 */

const useTracking = () => {
    const IDLE_THRESHOLD = 30000; // 30 seconds
    const TRACKING_KEY = 'focussense-tracking';
    const SESSION_KEY = 'focussense-session';

    // Get or initialize tracking data
    const getTrackingData = () => {
        const today = new Date().toISOString().split('T')[0];
        const stored = localStorage.getItem(TRACKING_KEY);
        
        if (stored) {
            const data = JSON.parse(stored);
            // Reset if it's a new day
            if (data.date !== today) {
                return initializeTrackingData(today);
            }
            return data;
        }
        
        return initializeTrackingData(today);
    };

    // Initialize fresh tracking data
    const initializeTrackingData = (date) => {
        const data = {
            date: date,
            activeTime: 0,
            idleTime: 0,
            tabSwitches: 0,
            clicks: 0,
            keystrokes: 0,
            startTime: Date.now(),
            lastActivityTime: Date.now(),
            isSessionActive: true,
            hourlyData: {},
            activityLog: []
        };
        localStorage.setItem(TRACKING_KEY, JSON.stringify(data));
        return data;
    };

    // Update tracking data
    const updateTrackingData = (updates) => {
        const data = getTrackingData();
        const updated = { ...data, ...updates };
        localStorage.setItem(TRACKING_KEY, JSON.stringify(updated));
        return updated;
    };

    // Record activity
    const recordActivity = (type, metadata = {}) => {
        const data = getTrackingData();
        const now = Date.now();
        
        // Add to activity log (keep last 100 activities)
        const activityLog = data.activityLog || [];
        activityLog.push({
            type,
            timestamp: now,
            ...metadata
        });
        
        if (activityLog.length > 100) {
            activityLog.shift();
        }

        // Reset idle timer on activity
        updateTrackingData({
            lastActivityTime: now,
            activityLog,
            isSessionActive: true
        });
    };

    // Calculate idle time
    const calculateIdleTime = () => {
        const data = getTrackingData();
        const now = Date.now();
        const timeSinceLastActivity = now - data.lastActivityTime;
        
        return timeSinceLastActivity > IDLE_THRESHOLD;
    };

    // Get current session stats
    const getSessionStats = () => {
        const data = getTrackingData();
        const now = Date.now();
        const sessionDuration = (now - data.startTime) / 1000; // seconds

        return {
            date: data.date,
            activeTime: Math.round(data.activeTime),
            idleTime: Math.round(data.idleTime),
            tabSwitches: data.tabSwitches,
            clicks: data.clicks,
            keystrokes: data.keystrokes,
            sessionDuration: Math.round(sessionDuration),
            totalActivities: (data.clicks || 0) + (data.keystrokes || 0)
        };
    };

    // Pause/resume session
    const pauseSession = () => {
        updateTrackingData({ isSessionActive: false });
    };

    const resumeSession = () => {
        const data = getTrackingData();
        updateTrackingData({
            isSessionActive: true,
            lastActivityTime: Date.now()
        });
    };

    // Reset daily data
    const resetDailyData = () => {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(TRACKING_KEY, JSON.stringify(initializeTrackingData(today)));
    };

    // Get activity for specific hour
    const getHourlyActivity = (hour) => {
        const data = getTrackingData();
        return data.hourlyData?.[hour] || null;
    };

    // Record hourly snapshot
    const recordHourlySnapshot = () => {
        const data = getTrackingData();
        const now = new Date();
        const hour = now.getHours();
        
        const snapshot = {
            hour,
            activeTime: data.activeTime,
            idleTime: data.idleTime,
            clicks: data.clicks,
            keystrokes: data.keystrokes,
            timestamp: Date.now()
        };

        const hourlyData = data.hourlyData || {};
        hourlyData[hour] = snapshot;

        updateTrackingData({ hourlyData });
    };

    // Export tracking events for chart
    const getActivityTimeline = () => {
        const data = getTrackingData();
        return data.activityLog || [];
    };

    // Get peak hours
    const getPeakHours = () => {
        const data = getTrackingData();
        const hourlyData = data.hourlyData || {};
        
        const peaks = Object.entries(hourlyData)
            .map(([hour, data]) => ({
                hour: parseInt(hour),
                activity: (data.clicks || 0) + (data.keystrokes || 0)
            }))
            .sort((a, b) => b.activity - a.activity)
            .slice(0, 3);

        return peaks;
    };

    // Calculate break frequency
    const getBreakFrequency = () => {
        const data = getTrackingData();
        const sessionDuration = (Date.now() - data.startTime) / 1000 / 60; // minutes
        
        // Estimate breaks as gaps in activity
        return {
            estimatedBreaks: Math.max(0, Math.floor(sessionDuration / 25)), // Pomodoro rhythm
            breakDuration: data.idleTime / 1000 / 60, // minutes
            recommendedBreaks: Math.ceil(sessionDuration / 30)
        };
    };

    return {
        // Data recording
        recordActivity,
        recordHourlySnapshot,
        
        // Data retrieval
        getTrackingData,
        getSessionStats,
        getActivityTimeline,
        
        // Session management
        pauseSession,
        resumeSession,
        resetDailyData,
        
        // Analytics
        calculateIdleTime,
        getPeakHours,
        getBreakFrequency,
        getHourlyActivity,
        
        // Constants
        IDLE_THRESHOLD
    };
};
