/**
 * ActivityTracker Component
 * Sets up event listeners for activity tracking
 * Runs in background and updates tracking data
 */

const ActivityTracker = () => {
    const tracking = useTracking();

    // Debounce utility from helpers
    const debounce = (func, delay) => {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    // Throttle utility
    const throttle = (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // Track mouse clicks
    const handleClick = throttle(() => {
        const stats = tracking.getTrackingData();
        tracking.updateTrackingData({
            clicks: (stats.clicks || 0) + 1
        });
        tracking.recordActivity('click');
    }, 500); // Max once per 500ms

    // Track keyboard input
    const handleKeydown = throttle(() => {
        const stats = tracking.getTrackingData();
        tracking.updateTrackingData({
            keystrokes: (stats.keystrokes || 0) + 1
        });
        tracking.recordActivity('keydown');
    }, 300); // Max once per 300ms

    // Track tab switching
    const handleVisibilityChange = () => {
        if (document.hidden) {
            tracking.pauseSession();
            tracking.recordActivity('tab_hidden');
        } else {
            tracking.resumeSession();
            tracking.recordActivity('tab_visible');
            
            const stats = tracking.getTrackingData();
            tracking.updateTrackingData({
                tabSwitches: (stats.tabSwitches || 0) + 1
            });
        }
    };

    // Track idle time
    const trackIdleTime = () => {
        setInterval(() => {
            const data = tracking.getTrackingData();
            const now = Date.now();
            const timeSinceLastActivity = now - data.lastActivityTime;

            if (timeSinceLastActivity > tracking.IDLE_THRESHOLD) {
                // User is idle
                tracking.updateTrackingData({
                    idleTime: data.idleTime + 1000 // Add 1 second
                });
                tracking.recordActivity('idle');
            } else {
                // User is active
                tracking.updateTrackingData({
                    activeTime: data.activeTime + 1000 // Add 1 second
                });
            }
        }, 1000); // Check every second
    };

    // Record hourly snapshots
    const recordHourlySnapshots = () => {
        setInterval(() => {
            tracking.recordHourlySnapshot();
        }, 3600000); // Every hour
    };

    // Initialize tracking on component mount
    React.useEffect(() => {
        // Ensure tracking data exists
        tracking.getTrackingData();

        // Add event listeners
        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Start tracking intervals
        const idleTimerInterval = setInterval(() => {
            const data = tracking.getTrackingData();
            const now = Date.now();
            const timeSinceLastActivity = now - data.lastActivityTime;

            if (timeSinceLastActivity > tracking.IDLE_THRESHOLD) {
                // User is idle - add a small increment
                const currentIdle = data.idleTime || 0;
                tracking.updateTrackingData({
                    idleTime: currentIdle + 1000 // 1 second
                });
            } else {
                // User is active
                const currentActive = data.activeTime || 0;
                tracking.updateTrackingData({
                    activeTime: currentActive + 1000 // 1 second
                });
            }
        }, 1000);

        // Hourly snapshot timer
        const hourlyTimerInterval = setInterval(() => {
            tracking.recordHourlySnapshot();
        }, 3600000); // Every hour

        // Cleanup
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearInterval(idleTimerInterval);
            clearInterval(hourlyTimerInterval);
        };
    }, []);

    // Invisible component - no UI
    return null;
};
