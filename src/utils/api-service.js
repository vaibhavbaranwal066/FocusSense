// API Service - Mock API client for future backend integration
const APIService = {
    baseURL: 'http://localhost:3001/api',
    timeout: 10000,

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: this.timeout,
        };

        const config = { ...defaultOptions, ...options };
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), config.timeout);
            
            const response = await fetch(url, {
                ...config,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    },

    // Dashboard endpoints
    getDashboard() {
        return this.request('/dashboard');
    },

    // Analytics endpoints
    getAnalytics(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/analytics?${query}`);
    },

    // Insights endpoints
    getInsights() {
        return this.request('/insights');
    },

    // Goals endpoints
    getGoals() {
        return this.request('/goals');
    },

    postGoal(goalData) {
        return this.request('/goals', {
            method: 'POST',
            body: JSON.stringify(goalData)
        });
    },

    updateGoal(goalId, goalData) {
        return this.request(`/goals/${goalId}`, {
            method: 'PUT',
            body: JSON.stringify(goalData)
        });
    },

    deleteGoal(goalId) {
        return this.request(`/goals/${goalId}`, {
            method: 'DELETE'
        });
    },

    // Settings endpoints
    getSettings() {
        return this.request('/settings');
    },

    updateSettings(settings) {
        return this.request('/settings', {
            method: 'PUT',
            body: JSON.stringify(settings)
        });
    }
};

// Mock data for development
const MockData = {
    dashboard: {
        focusScore: 87,
        todayFocusTime: 285, // minutes
        streakDays: 14,
        tasksCompleted: 12
    },

    analytics: {
        weeklyTrend: [78, 82, 85, 81, 87, 90, 88],
        topHours: ['09:00', '14:00', '16:00'],
        averageFocus: 84
    },

    insights: [
        {
            id: 1,
            title: 'Peak Focus Hours',
            description: 'You focus best between 9 AM and 11 AM'
        },
        {
            id: 2,
            title: 'Break Recommendation',
            description: 'Take a 15-minute break after 90 minutes of focus'
        },
        {
            id: 3,
            title: 'Environment Matters',
            description: 'Your focus increases by 12% in quiet environments'
        }
    ],

    goals: [
        {
            id: 1,
            title: 'Deep Work Session',
            target: 120,
            current: 87,
            category: 'work'
        },
        {
            id: 2,
            title: 'Learning Hours',
            target: 30,
            current: 18,
            category: 'learning'
        }
    ]
};
