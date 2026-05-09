/**
 * CyberLynX Documentation Core Script (Enterprise Edition)
 * Follows SOLID principles for modularity and maintainability.
 */

// 1. Theme Configuration
const Config = {
    theme: {
        primary: '#2563eb', // Blue-600
        primaryLight: 'rgba(37, 99, 235, 0.1)',
        rose: '#f43f5e',
        orange: '#fb923c',
        slate: '#64748b'
    },
    selectors: {
        mainContent: 'main',
        sections: 'section',
        navLinks: 'header nav a'
    }
};

// 2. Navigation Manager (Scroll Spy for Header Links)
class NavigationManager {
    constructor() {
        this.sections = document.querySelectorAll(Config.selectors.sections);
        this.navLinks = document.querySelectorAll(Config.selectors.navLinks);
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.spy();
            this.handleHeaderScroll();
        });
    }

    handleHeaderScroll() {
        const header = document.getElementById('main-header');
        const scrollPos = window.scrollY;

        if (scrollPos > 50) {
            header.classList.add('py-3', 'shadow-lg', 'bg-white');
            header.classList.remove('py-5', 'bg-white/90');
        } else {
            header.classList.remove('py-3', 'shadow-lg', 'bg-white');
            header.classList.add('py-5', 'bg-white/90');
        }
    }

    spy() {
        let currentId = '';
        const scrollPos = window.scrollY;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Add a buffer for the sticky header
            if (scrollPos >= (sectionTop - 160)) {
                currentId = section.getAttribute('id');
            }
        });

        if (currentId) {
            this.updateActiveLinks(currentId);
        }
    }

    updateActiveLinks(id) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href').slice(1);
            const isActive = href === id;
            
            if (isActive) {
                link.classList.add('text-blue-600', 'border-b-2', 'border-blue-600', 'pb-1');
                link.classList.remove('text-slate-600');
            } else {
                link.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600', 'pb-1');
                link.classList.add('text-slate-600');
            }
        });
    }
}

// 3. Chart Manager (Visual Progress Sim)
class ChartManager {
    static initAll() {
        this.initScanningChart();
    }

    static initScanningChart() {
        const el = document.getElementById('scanningChartSmall');
        if (!el) return;
        
        const ctx = el.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.4)');
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
                datasets: [{
                    data: [20, 35, 30, 85, 45, 90, 70],
                    borderColor: '#3b82f6',
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 0 // Cleaner for this UI
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10 } }, grid: { display: false } },
                    y: { ticks: { display: false }, grid: { color: 'rgba(255,255,255,0.03)' } }
                }
            }
        });
    }
}

// 4. Initialize
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
    ChartManager.initAll();
    console.log('CyberLynX Documentation Initialized (Enterprise Legal Edition)');
});
