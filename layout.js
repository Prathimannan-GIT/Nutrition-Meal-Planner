const LAYOUT_CONFIG = {
    brandName: "Nutri Planner",
    logoPath: "assets/logo.png",
};

function injectLayout() {
    const isLoginOrDashboard = window.location.pathname.includes('login.html') ||
        window.location.pathname.includes('signup.html') ||
        window.location.pathname.includes('dashboard.html');

    if (!isLoginOrDashboard) {
        injectHeader();
        injectFooter();
    } else if (window.location.pathname.includes('dashboard.html')) {
        // Dashboard specific layout handled in dashboard.html or a separate dashboard script
    }
    injectScrollTop();
}

function injectScrollTop() {
    const btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-emerald-500 text-white rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300 hover:bg-emerald-600 hover:-translate-y-1 z-50 flex items-center justify-center translate-y-10';
    btn.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>`;
    btn.setAttribute('aria-label', 'Scroll to top');

    document.body.appendChild(btn);

    const toggleScrollBtn = () => {
        if (window.scrollY > 300) {
            btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-10');
        } else {
            btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-10');
        }
    };

    window.addEventListener('scroll', toggleScrollBtn);
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


function injectHeader() {
    const header = document.createElement('header');
    header.className = 'fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 h-[80px] flex items-center';

    // Check active page
    const currentPath = window.location.pathname;
    const isPage = (path) => currentPath.includes(path);

    header.innerHTML = `
        <nav class="container flex items-center justify-between">
            <a href="index.html" class="flex items-center gap-2 group">
                <img src="${LAYOUT_CONFIG.logoPath}" alt="Logo" class="w-10 h-10 object-contain">
                <span class="text-xl font-bold text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform whitespace-nowrap">${LAYOUT_CONFIG.brandName}</span>
            </a>
            
            <!-- Desktop Nav -->
            <ul class="hidden lg:flex items-center gap-3">
                <li><a href="index.html" class="nav-link ${isPage('index.html') ? 'active' : ''}">Home</a></li>
                <li><a href="home2.html" class="nav-link ${isPage('home2.html') ? 'active' : ''}">Home 2</a></li>
                <li><a href="features.html" class="nav-link ${isPage('features.html') ? 'active' : ''}">Features</a></li>
                <li><a href="plans.html" class="nav-link ${isPage('plans.html') ? 'active' : ''}">Plans</a></li>
                <li><a href="recipes.html" class="nav-link ${isPage('recipes.html') ? 'active' : ''}">Recipes</a></li>
                <li><a href="pricing.html" class="nav-link ${isPage('pricing.html') ? 'active' : ''}">Pricing</a></li>
                <li><a href="dashboard.html" class="nav-link ${isPage('dashboard.html') ? 'active' : ''}">Dashboard</a></li>
                <li><a href="support.html" class="nav-link ${isPage('support.html') ? 'active' : ''}">Support</a></li>
            </ul>

            <div class="flex items-center gap-2">
                <button id="theme-toggle" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                    <span class="dark:hidden">🌙</span>
                    <span class="hidden dark:inline">☀️</span>
                </button>
                <a href="signup.html" class="hidden sm:flex btn btn-primary whitespace-nowrap">Join</a>
                <button id="mobile-menu-btn" class="lg:hidden p-2 text-2xl">☰</button>
            </div>
        </nav>

        <!-- Mobile Side Menu -->
        <div id="mobile-menu" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] opacity-0 pointer-events-none transition-opacity">
            <div class="absolute top-0 left-0 bottom-0 w-[280px] bg-white dark:bg-slate-900 p-6 flex flex-col gap-6 shadow-2xl -translate-x-full transition-transform">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                         <img src="${LAYOUT_CONFIG.logoPath}" alt="Logo" class="w-8 h-8">
                         <span class="font-bold">${LAYOUT_CONFIG.brandName}</span>
                    </div>
                    <button id="close-menu" class="text-2xl">&times;</button>
                </div>
                <ul class="flex flex-col gap-4 text-lg">
                    <li><a href="index.html" class="nav-link-mobile">Home</a></li>
                    <li><a href="home2.html" class="nav-link-mobile">Home 2</a></li>
                    <li><a href="features.html" class="nav-link-mobile">Features</a></li>
                    <li><a href="plans.html" class="nav-link-mobile">Plans</a></li>
                    <li><a href="recipes.html" class="nav-link-mobile">Recipes</a></li>
                    <li><a href="pricing.html" class="nav-link-mobile">Pricing</a></li>
                    <li><a href="dashboard.html" class="nav-link-mobile">Dashboard</a></li>
                    <li><a href="support.html" class="nav-link-mobile">Support</a></li>
                </ul>
            </div>
        </div>
    `;

    document.body.prepend(header);
    initNavEvents();
}

function injectFooter() {
    const footer = document.createElement('footer');
    footer.className = 'bg-slate-50 dark:bg-black border-t border-gray-200 dark:border-emerald-500/20 py-12 mt-20';
    footer.innerHTML = `
        <div class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
                <a href="index.html" class="flex items-center gap-2 mb-4">
                    <img src="${LAYOUT_CONFIG.logoPath}" alt="Logo" class="w-8 h-8">
                    <span class="text-xl font-bold text-emerald-600 dark:text-emerald-400">${LAYOUT_CONFIG.brandName}</span>
                </a>
                <p class="text-gray-600 dark:text-slate-400 mb-6">Personalized meal plans powered by nutrition science to help you eat better and live healthier.</p>
                <div class="flex gap-4">
                    <a href="#" class="social-icon" aria-label="X (Twitter)">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                    </a>
                    <a href="#" class="social-icon" aria-label="Facebook">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                        </svg>
                    </a>
                    <a href="#" class="social-icon" aria-label="Instagram">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                        </svg>
                    </a>
                    <a href="#" class="social-icon" aria-label="LinkedIn">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path>
                        </svg>
                    </a>
                </div>
            </div>
            <div>
                <h4 class="mb-4">Resources</h4>
                <ul class="flex flex-col gap-2">
                    <li><a href="blog.html" class="footer-link">Blog</a></li>
                    <li><a href="recipes.html" class="footer-link">Recipes</a></li>
                    <li><a href="support.html" class="footer-link">Support Hub</a></li>
                    <li><a href="how-it-works.html" class="footer-link">How It Works</a></li>
                </ul>
            </div>
            <div>
                <h4 class="mb-4">Program</h4>
                <ul class="flex flex-col gap-2">
                    <li><a href="plans.html" class="footer-link">Weight Loss</a></li>
                    <li><a href="plans.html" class="footer-link">Muscle Building</a></li>
                    <li><a href="plans.html" class="footer-link">Diabetes-Friendly</a></li>
                    <li><a href="plans.html" class="footer-link">Family Plans</a></li>
                </ul>
            </div>
            <div>
                <h4 class="mb-4">Legal</h4>
                <ul class="flex flex-col gap-2">
                    <li><a href="privacy.html" class="footer-link">Privacy Policy</a></li>
                    <li><a href="terms.html" class="footer-link">Terms of Service</a></li>
                    <li><a href="data-usage.html" class="footer-link">Data Usage</a></li>
                </ul>
            </div>
        </div>
        <div class="container border-t border-gray-200 dark:border-slate-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            &copy; ${new Date().getFullYear()} ${LAYOUT_CONFIG.brandName}. All rights reserved.
        </div>
    `;
    document.body.appendChild(footer);
}

function initNavEvents() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-menu');
    const menuContent = mobileMenu?.querySelector('div');

    mobileBtn?.addEventListener('click', () => {
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        menuContent.classList.remove('-translate-x-full');
    });

    const close = () => {
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        menuContent.classList.add('-translate-x-full');
    };

    closeBtn?.addEventListener('click', close);
    mobileMenu?.addEventListener('click', (e) => {
        if (e.target === mobileMenu) close();
    });

    // Theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const getTheme = () => localStorage.getItem('theme') || 'light';
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', theme);
    };

    setTheme(getTheme());
    themeToggle?.addEventListener('click', () => {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
}

document.addEventListener('DOMContentLoaded', injectLayout);
