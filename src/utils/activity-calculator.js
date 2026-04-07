/**
 * Activity Calculator Utility
 * Calculates focus score, penalties, and metrics from tracking data
 */

const ActivityCalculator = {
    /**
     * Calculate base focus score
     * focusScore = (activeTime / totalTime) * 100
     */
    calculateFocusScore: (stats) => {
        if (!stats) return 0;
        
        const totalTime = stats.sessionDuration || 1;
        const activeTime = stats.activeTime || 0;
        
        if (totalTime === 0) return 0;
        
        let baseScore = (activeTime / totalTime) * 100;
        baseScore = Math.min(100, Math.max(0, baseScore)); // Clamp 0-100
        
        return Math.round(baseScore);
    },

    /**
     * Calculate idle time penalty
     * Reduces score based on idle percentage
     */
    calculateIdlePenalty: (stats) => {
        if (!stats || stats.sessionDuration === 0) return 0;
        
        const idlePercentage = (stats.idleTime / stats.sessionDuration) * 100;
        
        // 0-10% idle: 0 penalty
        // 10-30% idle: 5-10 penalty
        // 30-50% idle: 10-20 penalty
        // 50%+ idle: 20-30 penalty
        
        if (idlePercentage <= 10) return 0;
        if (idlePercentage <= 30) return Math.round((idlePercentage - 10) / 2);
        if (idlePercentage <= 50) return Math.round(10 + (idlePercentage - 30) / 2);
        return Math.round(Math.min(30, 20 + (idlePercentage - 50) / 2));
    },

    /**
     * Calculate tab switching penalty
     * Reduces score based on frequency of tab switches
     * Reasonable: < 5 switches per 30 min
     * Moderate: 5-15 switches per 30 min
     * Frequent: > 15 switches per 30 min
     */
    calculateTabSwitchPenalty: (stats) => {
        if (!stats || stats.sessionDuration === 0) return 0;
        
        const switchesPerHour = (stats.tabSwitches / stats.sessionDuration) * 3600 || 0;
        
        // < 10 switches/hour: 0 penalty
        // 10-30 switches/hour: 2-8 penalty
        // 30-60 switches/hour: 8-15 penalty
        // > 60 switches/hour: 15-25 penalty
        
        if (switchesPerHour < 10) return 0;
        if (switchesPerHour <= 30) return Math.round((switchesPerHour - 10) / 2.5);
        if (switchesPerHour <= 60) return Math.round(8 + (switchesPerHour - 30) / 4);
        return Math.round(Math.min(25, 15 + (switchesPerHour - 60) / 6));
    },

    /**
     * Calculate distraction score
     * Based on relationship between clicks and keystrokes
     * More clicks = more distractions (mouse movement)
     */
    calculateDistractionScore: (stats) => {
        if (!stats) return 0;
        
        const totalActivities = (stats.clicks || 0) + (stats.keystrokes || 0);
        if (totalActivities === 0) return 0;
        
        const clickRatio = stats.clicks / totalActivities;
        
        // 0-20% clicks: low distraction (0 points)
        // 20-40% clicks: moderate (5 points)
        // 40-60% clicks: high (15 points)
        // 60%+ clicks: very high (25 points)
        
        if (clickRatio <= 0.2) return 0;
        if (clickRatio <= 0.4) return 5;
        if (clickRatio <= 0.6) return 15;
        return 25;
    },

    /**
     * Calculate final focus score with all penalties applied
     */
    calculateAdjustedFocusScore: (stats) => {
        const baseScore = ActivityCalculator.calculateFocusScore(stats);
        const idlePenalty = ActivityCalculator.calculateIdlePenalty(stats);
        const tabPenalty = ActivityCalculator.calculateTabSwitchPenalty(stats);
        const distractionPenalty = ActivityCalculator.calculateDistractionScore(stats);

        let finalScore = baseScore - idlePenalty - tabPenalty - distractionPenalty;
        
        // Ensure score is between 0-100
        finalScore = Math.max(0, Math.min(100, finalScore));
        
        return Math.round(finalScore);
    },

    /**
     * Get focus score breakdown for insights
     */
    getFocusScoreBreakdown: (stats) => {
        return {
            baseScore: ActivityCalculator.calculateFocusScore(stats),
            idlePenalty: ActivityCalculator.calculateIdlePenalty(stats),
            tabSwitchPenalty: ActivityCalculator.calculateTabSwitchPenalty(stats),
            distractionPenalty: ActivityCalculator.calculateDistractionScore(stats),
            finalScore: ActivityCalculator.calculateAdjustedFocusScore(stats)
        };
    },

    /**
     * Get focus level category
     */
    getFocusLevel: (score) => {
        if (score >= 90) return { level: 'Excellent', color: '#10b981' };
        if (score >= 75) return { level: 'Good', color: '#3b82f6' };
        if (score >= 60) return { level: 'Moderate', color: '#f59e0b' };
        if (score >= 40) return { level: 'Poor', color: '#ef4444' };
        return { level: 'Very Poor', color: '#dc2626' };
    },

    /**
     * Calculate productivity efficiency
     * Considers active time vs total time, accounting for breaks
     */
    calculateProductivityEfficiency: (stats) => {
        if (!stats || stats.sessionDuration === 0) return 0;
        
        const activePercentage = (stats.activeTime / stats.sessionDuration) * 100;
        
        // Ideal efficiency: 50-60% active time (rest is breaks)
        const optimalActive = 55;
        
        if (activePercentage >= optimalActive - 5 && activePercentage <= optimalActive + 5) {
            return 100; // Perfect efficiency
        }
        
        const deviation = Math.abs(activePercentage - optimalActive);
        const efficiency = Math.max(0, 100 - (deviation * 1.5));
        
        return Math.round(efficiency);
    },

    /**
     * Calculate average focus score for a time period
     */
    calculateAverageFocusScore: (trackingEntries) => {
        if (!trackingEntries || trackingEntries.length === 0) return 0;
        
        const scores = trackingEntries.map(entry => 
            ActivityCalculator.calculateAdjustedFocusScore(entry)
        );
        
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;
        return Math.round(average);
    },

    /**
     * Get insights based on activity data
     */
    generateInsights: (stats, trackingData) => {
        const insights = [];
        const breakdown = ActivityCalculator.getFocusScoreBreakdown(stats);
        
        // Insight 1: Peak hours
        if (trackingData?.hourlyData) {
            const hourEntry = Object.entries(trackingData.hourlyData)
                .map(([hour, data]) => ({
                    hour: parseInt(hour),
                    activity: (data.clicks || 0) + (data.keystrokes || 0)
                }))
                .sort((a, b) => b.activity - a.activity)?.[0];
            
            if (hourEntry) {
                insights.push({
                    title: 'Peak Hours',
                    description: `Most productive at ${hourEntry.hour}:00`,
                    metric: `${hourEntry.hour}:00 - ${hourEntry.hour + 1}:00`,
                    icon: '📊'
                });
            }
        }

        // Insight 2: Idle time
        if (breakdown.idlePenalty > 10) {
            insights.push({
                title: 'Idle Time',
                description: 'Consider scheduling regular breaks',
                metric: `${Math.round((stats.idleTime / stats.sessionDuration) * 100)}% idle`,
                icon: '😴'
            });
        }

        // Insight 3: Tab switching
        if (breakdown.tabSwitchPenalty > 8) {
            insights.push({
                title: 'Distractions',
                description: 'High tab switching detected',
                metric: `${stats.tabSwitches} switches`,
                icon: '🔄'
            });
        }

        // Insight 4: Activity type
        const clickRatio = stats.clicks / ((stats.clicks || 0) + (stats.keystrokes || 0));
        if (clickRatio > 0.6) {
            insights.push({
                title: 'Activity Type',
                description: 'More mouse movement detected',
                metric: `${Math.round(clickRatio * 100)}% clicks`,
                icon: '🖱️'
            });
        } else if (clickRatio < 0.3) {
            insights.push({
                title: 'Activity Type',
                description: 'Keyboard-focused work detected',
                metric: `${Math.round((1 - clickRatio) * 100)}% typing`,
                icon: '⌨️'
            });
        }

        return insights;
    },

    /**
     * Get recommendations based on focus score and penalties
     */
    getRecommendations: (stats) => {
        const breakdown = ActivityCalculator.getFocusScoreBreakdown(stats);
        const recommendations = [];

        if (breakdown.idlePenalty > 10) {
            recommendations.push({
                priority: 'high',
                text: 'Take regular breaks to maintain focus'
            });
        }

        if (breakdown.tabSwitchPenalty > 8) {
            recommendations.push({
                priority: 'high',
                text: 'Reduce tab switching - minimize distractions'
            });
        }

        if (breakdown.distractionPenalty > 10) {
            recommendations.push({
                priority: 'medium',
                text: 'Mouse movement is high - try keyboard shortcuts'
            });
        }

        if (stats.sessionDuration > 7200) { // 2 hours
            recommendations.push({
                priority: 'medium',
                text: 'You\'ve been focused for a while - take a break'
            });
        }

        return recommendations;
    }
};
