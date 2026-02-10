// Global Theme Management System
// This script must be loaded in the <head> of all pages to prevent theme flash

(function() {
    'use strict';
    
    // Theme configuration
    const THEME_KEY = 'theme';
    const THEMES = {
        LIGHT: 'light',
        DARK: 'dark'
    };
    
    // Get stored theme or detect system preference
    function getStoredTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored && Object.values(THEMES).includes(stored)) {
            return stored;
        }
        
        // Fallback to system preference if no stored theme
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
    }
    
    // Apply theme to document
    function applyTheme(theme) {
        const root = document.documentElement;
        const body = document.body;
        
        // Set data-theme attribute
        root.setAttribute('data-theme', theme);
        
        // Toggle dark class on html element for Tailwind
        if (theme === THEMES.DARK) {
            root.classList.add('dark');
            body?.classList.add('dark');
        } else {
            root.classList.remove('dark');
            body?.classList.remove('dark');
        }
        
        // Store in localStorage
        localStorage.setItem(THEME_KEY, theme);
        
        // Dispatch custom event for other scripts
        window.dispatchEvent(new CustomEvent('themechanged', { 
            detail: { theme } 
        }));
    }
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = getStoredTheme();
        const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
        applyTheme(newTheme);
        return newTheme;
    }
    
    // Initialize theme immediately (before DOM loads)
    const initialTheme = getStoredTheme();
    applyTheme(initialTheme);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
        }
    });
    
    // Global API
    window.ThemeManager = {
        getTheme: getStoredTheme,
        setTheme: applyTheme,
        toggleTheme: toggleTheme,
        THEMES: THEMES
    };
    
    // Auto-initialize theme toggle buttons when DOM is ready
    function initThemeToggleButtons() {
        const buttons = document.querySelectorAll('[id*="theme-toggle"], [data-theme-toggle]');
        buttons.forEach(button => {
            // Remove existing listeners to prevent duplicates
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                toggleTheme();
            });
        });
    }
    
    // Initialize buttons when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggleButtons);
    } else {
        initThemeToggleButtons();
    }
    
    // Also re-initialize when layout is injected (for dynamic content)
    window.addEventListener('layoutinjected', initThemeToggleButtons);
    
})();
