/**
 * Goals Manager - Manages daily focus goals and streaks
 * Handles:
 * - Goal setting and tracking
 * - Streak counting with daily timestamps
 * - Achievement badge system
 * - Progress calculation
 * - Historical tracking
 */

const GoalsManager = {
  STORAGE_KEY: 'focussense-goals',
  STREAK_KEY: 'focussense-streak',

  /**
   * Set or update daily focus goal
   * @param {number} goalMinutes - Daily goal in minutes
   * @returns {Object} Updated goal object
   */
  setDailyGoal(goalMinutes) {
    if (goalMinutes < 15 || goalMinutes > 480) {
      throw new Error('Goal must be between 15 and 480 minutes');
    }

    const data = this.getGoalsData();
    data.dailyGoal = goalMinutes;
    data.lastUpdated = new Date().toISOString();

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return data;
  },

  /**
   * Get current daily goal
   * @returns {number} Goal in minutes (default 240 = 4 hours)
   */
  getDailyGoal() {
    const data = this.getGoalsData();
    return data.dailyGoal || 240;
  },

  /**
   * Calculate progress towards today's goal
   * @param {number} activeTimeMs - Active time in milliseconds
   * @returns {Object} Progress object with percentage and status
   */
  getProgressToday(activeTimeMs) {
    const activeMinutes = activeTimeMs / 60000;
    const goal = this.getDailyGoal();
    const percentage = Math.min((activeMinutes / goal) * 100, 100);

    return {
      activeMinutes: Math.round(activeMinutes * 10) / 10,
      goalMinutes: goal,
      percentage: Math.round(percentage),
      remaining: Math.max(0, goal - activeMinutes),
      completed: activeMinutes >= goal,
      status: this._getProgressStatus(percentage),
      motivationalText: this._getProgressText(percentage)
    };
  },

  /**
   * Mark today's goal as completed
   * @returns {Object} Updated goals data
   */
  completeGoal() {
    const today = new Date().toISOString().split('T')[0];
    const data = this.getGoalsData();

    // Record completion
    if (!data.completedDates) {
      data.completedDates = [];
    }
    if (!data.completedDates.includes(today)) {
      data.completedDates.push(today);
    }

    // Update streak
    this._updateStreak(today);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    return data;
  },

  /**
   * Get current streak information
   * @returns {Object} Streak data with count, status, and achievements
   */
  getStreakInfo() {
    const streak = this._getStreakData();
    const data = this.getGoalsData();

    return {
      currentStreak: streak.count,
      longestStreak: data.longestStreak || 0,
      totalDaysCompleted: (data.completedDates || []).length,
      lastCompletionDate: streak.lastDate,
      streakActive: streak.active,
      achievements: this._generateAchievements(data, streak.count)
    };
  },

  /**
   * Get historical goal data
   * @param {number} days - Number of historical days to retrieve (default 30)
   * @returns {Array} Daily completion status
   */
  getHistoricalGoals(days = 30) {
    const data = this.getGoalsData();
    const completedDates = data.completedDates || [];
    const history = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      history.push({
        date: dateStr,
        completed: completedDates.includes(dateStr),
        day: date.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }

    return history;
  },

  /**
   * Get all available achievements
   * @returns {Array} Array of possible achievement badges
   */
  getAllAchievements() {
    return [
      {
        id: 'first-goal',
        name: '🎯 Get Started',
        description: 'Complete your first daily goal',
        icon: '🎯',
        unlockedAt: null
      },
      {
        id: 'week-warrior',
        name: '🔥 Week Warrior',
        description: 'Complete 7-day focus streak',
        icon: '🔥',
        unlockedAt: null,
        requirement: 7
      },
      {
        id: 'month-master',
        name: '👑 Month Master',
        description: 'Complete 30-day focus streak',
        icon: '👑',
        unlockedAt: null,
        requirement: 30
      },
      {
        id: 'century',
        name: '💯 Century Club',
        description: 'Complete 100 total days',
        icon: '💯',
        unlockedAt: null,
        requirement: 100
      },
      {
        id: 'perfect-week',
        name: '✨ Perfect Week',
        description: 'Complete 7 days in a row',
        icon: '✨',
        unlockedAt: null,
        requirement: 7
      },
      {
        id: 'consistent-performer',
        name: '📈 Consistent',
        description: 'Complete 50 total days',
        icon: '📈',
        unlockedAt: null,
        requirement: 50
      },
      {
        id: 'focus-legend',
        name: '🌟 Legend',
        description: 'Complete 365-day focus streak',
        icon: '🌟',
        unlockedAt: null,
        requirement: 365
      },
      {
        id: 'double-time',
        name: '⚡ Double Time',
        description: 'Exceed goal by 100%',
        icon: '⚡',
        unlockedAt: null,
        requirement: 200
      },
      {
        id: 'comeback-kid',
        name: '🎪 Comeback Kid',
        description: 'Restart streak after 7 days off',
        icon: '🎪',
        unlockedAt: null
      },
      {
        id: 'marathon',
        name: '🏃 Marathon',
        description: '365 goals completed lifetime',
        icon: '🏃',
        unlockedAt: null,
        requirement: 365
      }
    ];
  },

  /**
   * Get all goals data
   * @private
   * @returns {Object} Entire goals object
   */
  getGoalsData() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      return {
        dailyGoal: 240,
        completedDates: [],
        longestStreak: 0,
        createdAt: new Date().toISOString()
      };
    }
    return JSON.parse(stored);
  },

  /**
   * Update streak counters
   * @private
   */
  _updateStreak(today) {
    const streak = this._getStreakData();
    const data = this.getGoalsData();

    if (!streak.active || this._isConsecutiveDay(streak.lastDate, today)) {
      // Continue or start streak
      const newCount = streak.count + 1;
      const streakData = {
        count: newCount,
        lastDate: today,
        active: true,
        startDate: streak.startDate || today
      };

      localStorage.setItem(this.STREAK_KEY, JSON.stringify(streakData));

      // Update longest streak
      if (newCount > (data.longestStreak || 0)) {
        data.longestStreak = newCount;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      }
    }
  },

  /**
   * Get streak data
   * @private
   */
  _getStreakData() {
    const stored = localStorage.getItem(this.STREAK_KEY);
    if (!stored) {
      return {
        count: 0,
        lastDate: null,
        active: false,
        startDate: null
      };
    }
    return JSON.parse(stored);
  },

  /**
   * Check if dates are consecutive days
   * @private
   */
  _isConsecutiveDay(lastDate, today) {
    if (!lastDate) return true;

    const last = new Date(lastDate);
    const current = new Date(today);

    const diffTime = Math.abs(current - last);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays === 1;
  },

  /**
   * Generate achievement badges based on current progress
   * @private
   */
  _generateAchievements(data, currentStreak) {
    const achievements = [];
    const totalCompleted = (data.completedDates || []).length;

    if (totalCompleted >= 1) {
      achievements.push({
        id: 'first-goal',
        name: 'Get Started',
        icon: '🎯',
        unlocked: true,
        description: 'Completed first goal'
      });
    }

    if (currentStreak >= 7) {
      achievements.push({
        id: 'week-warrior',
        name: 'Week Warrior',
        icon: '🔥',
        unlocked: true,
        description: `${currentStreak}-day streak`
      });
    }

    if (currentStreak >= 30) {
      achievements.push({
        id: 'month-master',
        name: 'Month Master',
        icon: '👑',
        unlocked: true,
        description: `${currentStreak}-day streak`
      });
    }

    if (totalCompleted >= 50) {
      achievements.push({
        id: 'consistent',
        name: 'Consistent',
        icon: '📈',
        unlocked: true,
        description: `${totalCompleted} days completed`
      });
    }

    if (currentStreak >= 30 && currentStreak < 100) {
      achievements.push({
        id: 'on-fire',
        name: 'On Fire 🔥',
        icon: '🔥',
        unlocked: false,
        description: `${100 - currentStreak} days to legend status`
      });
    }

    if (currentStreak >= 100) {
      achievements.push({
        id: 'legend',
        name: 'Focus Legend',
        icon: '🌟',
        unlocked: true,
        description: 'Over 100-day streak!'
      });
    }

    return achievements.sort((a, b) => (b.unlocked ? 1 : -1) - (a.unlocked ? 1 : -1));
  },

  /**
   * Get progress status label
   * @private
   */
  _getProgressStatus(percentage) {
    if (percentage >= 100) return 'completed';
    if (percentage >= 75) return 'almost-there';
    if (percentage >= 50) return 'halfway';
    if (percentage >= 25) return 'started';
    return 'not-started';
  },

  /**
   * Get motivational text based on progress
   * @private
   */
  _getProgressText(percentage) {
    const texts = {
      100: '🎉 Goal completed! Fantastic!',
      75: '📈 Almost there! Keep pushing',
      50: '💪 Halfway done! Keep going',
      25: '🚀 Great start! Keep momentum',
      0: '⏰ Time to focus!'
    };

    if (percentage >= 100) return texts[100];
    if (percentage >= 75) return texts[75];
    if (percentage >= 50) return texts[50];
    if (percentage >= 25) return texts[25];
    return texts[0];
  },

  /**
   * Reset all goals (for development/testing)
   * @private
   */
  _resetAll() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.STREAK_KEY);
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GoalsManager;
}
