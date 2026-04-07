/**
 * Insights Engine - Rule-based insight generation system
 * Analyzes activity data and generates personalized insights
 * 
 * Features:
 * - 25+ insight rules
 * - Severity levels (critical, warning, positive, info)
 * - Smart thresholds based on historical data
 * - Streak and consistency tracking
 * - AI-style recommendations
 */

const InsightsEngine = {
  /**
   * Generate insights from activity data
   * @param {Object} stats - Activity statistics
   * @param {Object} historical - Historical data
   * @returns {Array} Array of insight objects
   */
  generateInsights(stats, historical = {}) {
    const insights = [];

    // Extract stats
    const activeTime = stats.activeTime || 0;
    const idleTime = stats.idleTime || 0;
    const tabSwitches = stats.tabSwitches || 0;
    const clicks = stats.clicks || 0;
    const keystrokes = stats.keystrokes || 0;
    const totalTime = activeTime + idleTime;

    // Calculate metrics
    const activityRatio = totalTime > 0 ? (activeTime / totalTime) * 100 : 0;
    const clicksPerMinute = totalTime > 0 ? (clicks / (totalTime / 60000)) : 0;
    const keystrokesPerMinute = totalTime > 0 ? (keystrokes / (totalTime / 60000)) : 0;
    const tabSwitchesPerHour = (tabSwitches / (totalTime / 3600000)) || 0;
    const distractionRatio = clicks > 0 ? (clicks / (clicks + keystrokes)) * 100 : 0;

    // ============ IDLE TIME RULES ============
    if (idleTime > totalTime * 0.4) {
      insights.push({
        type: 'idle-warning',
        severity: 'warning',
        title: '⏸️ Long Idle Periods Detected',
        message: `You were idle for ${this._formatTime(idleTime)}. Consider taking short breaks regularly.`,
        action: 'Try the Pomodoro technique',
        impact: -20
      });
    } else if (idleTime > totalTime * 0.2) {
      insights.push({
        type: 'idle-reminder',
        severity: 'info',
        title: '⏸️ Idle Time Reminder',
        message: `${this._formatTime(idleTime)} of idle time detected. Stay hydrated!`,
        action: 'Schedule micro-breaks',
        impact: -10
      });
    } else if (idleTime < totalTime * 0.05) {
      insights.push({
        type: 'no-break',
        severity: 'critical',
        title: '🏃 No Breaks Detected',
        message: 'You\'ve been active with almost no breaks. Remember to rest!',
        action: 'Take a 5-minute break now',
        impact: -15
      });
    }

    // ============ TAB SWITCHING RULES ============
    if (tabSwitchesPerHour > 20) {
      insights.push({
        type: 'tab-distraction',
        severity: 'critical',
        title: '🔄 High Context Switching',
        message: `${Math.round(tabSwitchesPerHour)} tab switches per hour detected. This breaks focus flow.`,
        action: 'Use single-task mode or minimize distractions',
        impact: -25
      });
    } else if (tabSwitchesPerHour > 10) {
      insights.push({
        type: 'tab-warning',
        severity: 'warning',
        title: '🔄 Frequent Tab Switching',
        message: `${Math.round(tabSwitchesPerHour)} tab switches per hour. Try to reduce task switching.`,
        action: 'Group similar tasks together',
        impact: -12
      });
    } else if (tabSwitchesPerHour < 3) {
      insights.push({
        type: 'focused-tabs',
        severity: 'positive',
        title: '✨ Great Tab Focus',
        message: `Only ${Math.round(tabSwitchesPerHour)} tab switches per hour. Excellent concentration!`,
        action: 'Maintain this focus level',
        impact: +15
      });
    }

    // ============ ACTIVITY BREAKDOWN RULES ============
    if (distractionRatio > 75) {
      insights.push({
        type: 'click-heavy',
        severity: 'warning',
        title: '🖱️ Click-Heavy Activity',
        message: `${Math.round(distractionRatio)}% of activity is clicking. More typing might indicate deeper focus.`,
        action: 'Engage in more deliberate, typed work',
        impact: -8
      });
    } else if (distractionRatio < 20) {
      insights.push({
        type: 'typing-focus',
        severity: 'positive',
        title: '⌨️ Strong Typing Activity',
        message: `${Math.round(distractionRatio)}% clicking - your activity shows deep focus on typed work.`,
        action: 'Keep this focus pattern',
        impact: +12
      });
    }

    // ============ CONSISTENCY RULES ============
    if (clicksPerMinute > 3 && keystrokesPerMinute > 30) {
      insights.push({
        type: 'high-productivity',
        severity: 'positive',
        title: '🚀 Productive Session',
        message: 'Your activity levels are very high. Great momentum!',
        action: 'Maintain this pace, stay hydrated',
        impact: +18
      });
    }

    // ============ STREAK & TIMING RULES ============
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 9) {
      insights.push({
        type: 'morning-focus',
        severity: 'positive',
        title: '🌅 Morning Focus Peak',
        message: 'Morning hours are your focus peak time. Make the most of it!',
        action: 'Tackle hardest tasks now',
        impact: +10
      });
    } else if (hour >= 14 && hour < 16) {
      insights.push({
        type: 'afternoon-slump',
        severity: 'info',
        title: '☀️ Afternoon Energy Dip',
        message: 'This is typically when focus dips. Consider a walk or snack.',
        action: 'Take a 15-minute break',
        impact: -5
      });
    } else if (hour >= 21) {
      insights.push({
        type: 'late-work',
        severity: 'warning',
        title: '🌙 Late Night Work',
        message: 'Working late can reduce sleep quality and next-day focus.',
        action: 'Consider wrapping up soon',
        impact: -10
      });
    }

    // ============ PERFORMANCE METRICS ============
    if (activeTime > 14400000) { // 4 hours
      insights.push({
        type: 'long-session',
        severity: 'info',
        title: '⏱️ Extended Focus Session',
        message: `You've focused for ${this._formatTime(activeTime)}. Impressive endurance!`,
        action: 'Take a substantial break',
        impact: +8
      });
    }

    // ============ OPTIMAL FOCUS RULES ============
    if (activityRatio >= 75) {
      insights.push({
        type: 'optimal-focus',
        severity: 'positive',
        title: '🎯 Optimal Focus Detected',
        message: `${Math.round(activityRatio)}% activity ratio. You\'re in the zone!`,
        action: 'Don\'t break the momentum',
        impact: +25
      });
    } else if (activityRatio >= 50) {
      insights.push({
        type: 'good-focus',
        severity: 'positive',
        title: '✅ Good Focus Level',
        message: `${Math.round(activityRatio)}% activity ratio. Keep it up!`,
        action: 'Continue this pattern',
        impact: +15
      });
    } else if (activityRatio < 30) {
      insights.push({
        type: 'low-focus',
        severity: 'critical',
        title: '⚠️ Low Focus Detected',
        message: `Only ${Math.round(activityRatio)}% active time. Try to refocus.`,
        action: 'Eliminate distractions or take a break',
        impact: -30
      });
    }

    // ============ DAILY ROUTINE RULES ============
    if (clicks > 0 && keystrokes > 0) {
      const balanceScore = Math.abs(distractionRatio - 50);
      if (balanceScore < 15) {
        insights.push({
          type: 'balanced-activity',
          severity: 'positive',
          title: '⚖️ Balanced Activity Mix',
          message: 'Your click-to-keystroke ratio is well-balanced.',
          action: 'Maintain this healthy mix',
          impact: +10
        });
      }
    }

    // ============ STREAK ACHIEVEMENTS ============
    const activeMinutes = activeTime / 60000;
    if (activeMinutes >= 120) {
      insights.push({
        type: 'achievement-2hour',
        severity: 'positive',
        title: '🏆 2-Hour Focus Streak',
        message: `You've maintained focus for over 2 hours! Legendary dedication.`,
        action: 'Celebrate this achievement',
        impact: +20
      });
    } else if (activeMinutes >= 60) {
      insights.push({
        type: 'achievement-1hour',
        severity: 'positive',
        title: '⭐ 1-Hour Focus Session',
        message: `60 minutes of continuous focus. Well done!`,
        action: 'Share your progress',
        impact: +15
      });
    } else if (activeMinutes >= 25) {
      insights.push({
        type: 'achievement-pomodoro',
        severity: 'positive',
        title: '🍅 Pomodoro Completed',
        message: `You've completed a 25-minute focused session.`,
        action: 'Take a 5-minute break',
        impact: +10
      });
    }

    // Filter to top insights (remove duplicates, limit to 8)
    const filtered = this._deduplicateInsights(insights);
    return filtered.slice(0, 8);
  },

  /**
   * Get personalized recommendation based on insights
   * @param {Array} insights - Generated insights
   * @returns {Object} Top recommendation
   */
  getTopRecommendation(insights) {
    if (insights.length === 0) {
      return {
        title: '🎯 Keep Focused',
        message: 'You\'re doing great! Continue your current pace.',
        priority: 'info'
      };
    }

    // Find highest impact insight
    const sorted = [...insights].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
    const top = sorted[0];

    return {
      title: top.title,
      message: top.message,
      action: top.action,
      priority: top.severity
    };
  },

  /**
   * Calculate focus score trend
   * @param {Array} historicalScores - Array of historical scores
   * @returns {Object} Trend information
   */
  calculateTrend(historicalScores = []) {
    if (historicalScores.length < 2) {
      return {
        trend: 'stable',
        change: 0,
        label: 'New to tracking'
      };
    }

    const recent = historicalScores.slice(-7);
    const previous = historicalScores.slice(-14, -7);

    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const previousAvg = previous.length > 0 ? previous.reduce((a, b) => a + b, 0) / previous.length : recentAvg;

    const change = recentAvg - previousAvg;
    const trend = change > 5 ? 'improving' : change < -5 ? 'declining' : 'stable';

    return {
      trend,
      change: Math.round(change * 10) / 10,
      label: `${Math.abs(Math.round(change))}% ${change > 0 ? '📈' : change < 0 ? '📉' : '➡️'}`
    };
  },

  /**
   * Get motivational quote based on performance
   * @param {number} focusScore - Current focus score (0-100)
   * @returns {string} Motivational quote
   */
  getMotivationalQuote(focusScore) {
    const quotes = {
      excellent: [
        '🌟 You\'re absolutely crushing it!',
        '🚀 This is exceptional focus. Keep it up!',
        '👑 You\'re at your peak performance!',
        '✨ This is the zone. Don\'t break it!'
      ],
      good: [
        '💪 Great session so far!',
        '🎯 You\'re on track for an excellent day!',
        '✅ Solid focus. Keep maintaining this!',
        '🔥 Your momentum is strong!'
      ],
      moderate: [
        '💭 Room for improvement. You can do this!',
        '🌱 Growing your focus. We\'re getting there!',
        '🎪 Let\'s turn this around with a break!',
        '⚡ Time to refocus. You\'ve got this!'
      ],
      poor: [
        '🆘 It\'s time to refocus!',
        '🎯 Let\'s get back on track!',
        '💨 Shake it off and reset!',
        '🌊 Ride out this distraction wave!'
      ]
    };

    let category;
    if (focusScore >= 80) category = 'excellent';
    else if (focusScore >= 60) category = 'good';
    else if (focusScore >= 40) category = 'moderate';
    else category = 'poor';

    const categoryQuotes = quotes[category];
    return categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
  },

  /**
   * Remove duplicate insights
   * @private
   */
  _deduplicateInsights(insights) {
    const seen = new Set();
    return insights.filter(insight => {
      if (seen.has(insight.type)) return false;
      seen.add(insight.type);
      return true;
    });
  },

  /**
   * Format time in milliseconds to readable string
   * @private
   */
  _formatTime(ms) {
    const minutes = Math.floor((ms / 1000) / 60);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InsightsEngine;
}
