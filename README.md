# FocusSense - Premium Frontend Application

A premium frontend web application for focus management and productivity tracking, built with vanilla React, HTML, CSS, and JavaScript without TypeScript or JSX.

## 📋 Features

- **Premium Design System**: Custom CSS variables, typography, spacing, and shadows
- **Responsive Layout**: Sidebar + Navbar + Content area with mobile support
- **Theme Support**: Dark and light mode with smooth transitions
- **React Components**: Built with `React.createElement` (no JSX)
- **Animations**: Smooth transitions, hover effects, and page animations
- **Navigation**: Multi-page navigation system with active states
- **Modern UI**: Cards, buttons, badges, forms, and more

## 🏗️ Project Structure

```
FocusSense/
├── index.html                 # Main entry point
├── package.json              # Project metadata
├── README.md                 # This file
└── src/
    ├── components/           # React components
    │   ├── Sidebar.js       # Navigation sidebar
    │   ├── Navbar.js        # Top navigation bar
    │   └── MainLayout.js    # Main content layout
    ├── pages/               # Future page components
    ├── hooks/               # React custom hooks
    │   └── useTheme.js      # Theme management hook
    ├── utils/               # Utility functions
    │   └── theme-manager.js # Theme management logic
    └── styles/              # CSS stylesheets
        ├── global.css       # Global styles & variables
        ├── layout.css       # Layout component styles
        ├── components.css   # UI component styles
        ├── theme.css        # Theme-specific styles
        ├── animations.css   # Animation definitions
        └── responsive.css   # Responsive breakpoints
```

## 🎨 Design System

### Colors
- **Primary**: `#6366F1` (Indigo)
- **Background Dark**: `#0F172A` (Deep Navy)
- **Background Light**: `#FFFFFF` (White)
- **Card Background**: `#1E293B` (Slate)

### Typography
- **Font Families**: Inter (body), Poppins (headings)
- **Font Sizes**: xs (12px) to 4xl (36px)
- **Font Weights**: Light (300) to Bold (700)

### Spacing System
- `xs` (4px) → `4xl` (64px)
- consistent gap and padding utilities

### Border Radius
- `sm` (8px), `md` (12px), `lg` (16px), `full` (9999px)

### Shadows
- 5 levels: sm to 2xl with proper depth

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3+ (for local server) or Node.js

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd FocusSense
   ```

2. **Start a local development server**:

   **Using Python 3**:
   ```bash
   python -m http.server 3000
   ```

   **Using Node.js (with serve package)**:
   ```bash
   npm install -g serve
   serve -s . -l 3000
   ```

3. **Open in browser**:
   - Navigate to `http://localhost:3000`

### Development

The app uses React from CDN, so no build process is required:
- Edit HTML, CSS, and JavaScript files directly
- React components use `React.createElement()` (no JSX compilation needed)
- Changes are hot-reloaded when you refresh the browser

## 🎯 Key Components

### Sidebar
- Fixed 240px width (collapses on mobile)
- Logo and branding
- Navigation items with active states
- User profile section
- Icons and hover animations

### Navbar
- Search bar with focus handling
- Focus score badge (87/100)
- Theme toggle (dark/light mode)
- Notifications indicator
- User menu

### Main Layout
- Grid-based content display
- Responsive card grid (auto-fit)
- Page headers with descriptions
- Staggered animations on load

## 🎨 Theme Toggle

The app includes a fully functional theme system:
- **Dark Mode**: Default (can be set in browser preferences)
- **Light Mode**: Alternative theme
- **Persistence**: Theme preference saved to `localStorage`
- **System Preference**: Respects device color scheme preference

To toggle theme: Click the sun/moon icon in the navbar

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1400px+
- **Tablet**: 768px - 1024px
- **Mobile**: up to 767px (sidebar becomes overlay)
- **Small Mobile**: up to 480px (condensed UI)

### Mobile Features
- Hamburger menu for navigation
- Collapsed sidebar
- Optimized touch targets (44px minimum)
- Condensed spacing and typography

## ⚡ Performance

- **No build required**: Uses React from CDN
- **Lightweight CSS**: ~15KB of minified styling
- **Lazy loaded**: Components render on demand
- **Smooth animations**: Hardware-accelerated transitions

## 🔧 Customization

### Colors
Edit CSS variables in `src/styles/global.css`:
```css
:root {
    --primary: #6366F1;
    --bg-dark: #0F172A;
    /* ... more variables */
}
```

### Fonts
Update font imports in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=NEW_FONT..." rel="stylesheet">
```

### Spacing
Modify spacing variables in `src/styles/global.css`:
```css
--spacing-md: 12px;
--spacing-lg: 16px;
```

## 🎬 Available Pages

Currently set up with 5 main pages:
1. **Dashboard** (📊) - Overview and daily summary
2. **Analytics** (📈) - Focus patterns insights
3. **Insights** (💡) - AI recommendations
4. **Goals** (🎯) - Goal tracking
5. **Settings** (⚙️) - Preferences

Each page shows dynamic content with status descriptions.

## 📦 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🔨 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time data updates
- [ ] Advanced animations
- [ ] Dashboard widgets
- [ ] User authentication
- [ ] Data persistence
- [ ] Mobile app

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📞 Support

For questions or support, please create an issue in the repository.

---

**Created**: April 7, 2026
**Framework**: React (React.createElement)
**Styling**: Vanilla CSS with Design System
**Status**: ✅ Foundation Complete
