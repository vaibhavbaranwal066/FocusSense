# FocusSense - Getting Started Guide

## 🚀 Quick Start

### Step 1: Navigate to the Project
```bash
cd path/to/FocusSense
```

### Step 2: Start Development Server

**Option A: Using Python (Recommended)**
```bash
python -m http.server 3000
```

**Option B: Using Node.js**
```bash
npm install -g serve
serve -s . -l 3000
```

### Step 3: Open in Browser
Navigate to: **http://localhost:3000**

## 📁 Project Structure

```
FocusSense/
├── index.html
├── package.json
├── README.md
├── GETTING_STARTED.md (this file)
└── src/
    ├── components/
    │   ├── Sidebar.js      # Navigation sidebar
    │   ├── Navbar.js       # Top bar with search & theme toggle
    │   └── MainLayout.js   # Main content area
    ├── hooks/
    │   └── useTheme.js     # Theme state management
    ├── utils/
    │   ├── theme-manager.js    # Theme persistence logic
    │   ├── helpers.js          # Utility functions
    │   ├── constants.js        # App constants
    │   └── api-service.js      # API client (future use)
    └── styles/
        ├── global.css          # Variables & base styles
        ├── layout.css          # Layout component styles
        ├── components.css      # UI component styles
        ├── theme.css           # Dark/light theme styles
        ├── animations.css      # Animation definitions
        └── responsive.css      # Mobile breakpoints
```

## ✨ Key Features

### 1. **Navigation Sidebar**
- Logo with icon
- 5 main navigation items
- Active state indicator
- User profile section
- Collapses on mobile

### 2. **Top Navbar**
- Search bar with placeholder text
- Focus score badge (87/100)
- Theme toggle (dark ☀️ / light 🌙)
- Notifications indicator
- User menu

### 3. **Main Content Area**
- Page titles & descriptions
- Responsive card grid
- Animation on load
- Placeholder content

### 4. **Theming System**
- Dark mode (default)
- Light mode (alternative)
- Auto-detection of system preference
- Theme persistence in localStorage
- Smooth transitions

## 🎨 Colors in Use

```
Primary:           #6366F1 (Indigo)
Text:              #F1F5F9 (Light Slate)
Backgrounds:       #0F172A (Dark Navy), #1E293B (Card), #FFFFFF (Light)
Accents:           Success, Warning, Danger, Info
```

## 📱 Responsive Behavior

- **Desktop (1400px+)**: Full sidebar, search visible
- **Tablet (768-1024px)**: Collapsible sidebar
- **Mobile (480-767px)**: Overlay sidebar, compact UI
- **Small Mobile (<480px)**: Minimal spacing, touch-optimized

## 🎯 Navigation Items

1. **Dashboard** 📊 - Overview and daily summary
2. **Analytics** 📈 - Focus patterns and insights
3. **Insights** 💡 - AI-powered recommendations
4. **Goals** 🎯 - Goal tracking and management
5. **Settings** ⚙️ - User preferences

Click any navigation item to see dynamic content.

## 🌙 Theme Toggle

1. Click the sun ☀️ (light mode) or moon 🌙 (dark mode) icon in the navbar
2. Theme preference automatically saves
3. Page animations smoothly transition between themes

## 🛠️ Development Tips

### Adding New Pages
1. Create a new React component in `src/components/`
2. Update the `NAVIGATION_ITEMS` in `src/utils/constants.js`
3. Add routing logic to `MainLayout.js`

### Customizing Colors
Edit CSS variables in `src/styles/global.css`:
```css
:root {
    --primary: #YOUR_COLOR;
    --bg-dark: #YOUR_COLOR;
    /* ... */
}
```

### Modifying Fonts
Update the Google Fonts import in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT..." rel="stylesheet">
```

### Creating New Components
Use React.createElement (no JSX):
```javascript
function MyComponent(props) {
    return React.createElement(
        'div',
        { className: 'my-component' },
        React.createElement('h1', null, 'Hello')
    );
}
```

## 📦 Dependencies

- **React 18** (from CDN)
- **Modern CSS** (Grid, Flexbox)
- **No build tools required**

## 🔧 File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Entry point, script loader |
| `src/App.js` | Main React app component |
| `src/components/*` | React UI components |
| `src/hooks/useTheme.js` | Theme state hook |
| `src/utils/theme-manager.js` | Theme logic & persistence |
| `src/utils/helpers.js` | Common utility functions |
| `src/utils/constants.js` | App-wide constants |
| `src/utils/api-service.js` | API client (mock/future) |
| `src/styles/*` | All CSS files |

## 🚦 Common Tasks

### Change Active Navigation Item
The app tracks the active page in the `activeItem` state. Click sidebar items to change.

### Update Focus Score
Modify the value in the Navbar component in `src/components/Navbar.js`:
```javascript
React.createElement(
    'div',
    { className: 'badge-score' },
    YOUR_SCORE  // Change this number
)
```

### Add New Card in Content
Edit `src/components/MainLayout.js` and modify the `renderContent()` function to add more cards.

## 📝 Notes

- **No build process** - Edit files and refresh browser
- **Production ready** - Uses React CDN with proper sizing
- **Fully responsive** - Mobile-first design approach
- **Accessibility** - WCAG considerations included
- **Performance** - Optimized animations with hardware acceleration

## 🐛 Troubleshooting

**App not loading?**
- Check browser console for errors
- Ensure server is running on correct port
- Clear browser cache
- Check CORS if using API

**Theme not switching?**
- Check localStorage in DevTools
- Ensure browser supports CSS custom properties
- Try clearing browser cache

**Responsive issues?**
- Open DevTools (F12) and use device toolbar
- Check CSS media queries in `responsive.css`
- Verify viewport meta tag in `index.html`

## 📞 Next Steps

1. ✅ Foundation complete
2. ⏭️ Integrate real API endpoints
3. ⏭️ Add Dashboard widgets
4. ⏭️ Implement data persistence
5. ⏭️ Add user authentication
6. ⏭️ Deploy to production

---

**Happy coding! 🎉**
