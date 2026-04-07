// Main App Component
function App() {
    const [activeItem, setActiveItem] = React.useState('dashboard');
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleNavigate = React.useCallback((item) => {
        setActiveItem(item);
    }, []);

    const handleSearch = React.useCallback((query) => {
        setSearchQuery(query);
    }, []);

    return React.createElement(
        'div',
        { className: 'app-container' },
        React.createElement(Sidebar, {
            activeItem,
            onNavigate: handleNavigate
        }),
        React.createElement(Navbar, {
            focusScore: 87,
            onSearch: handleSearch
        }),
        React.createElement(MainLayout, {
            activeItem,
            onNavigate: handleNavigate
        })
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
