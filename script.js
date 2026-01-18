document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initScanningChart();
    initSeverityChart();
    initNavigation();
    initHelpToggle();
});

const themePurple = '#544fe8';
const themePurpleLight = 'rgba(84, 79, 232, 0.1)';

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    const toggleIcon = toggle.querySelector('i');

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');

        // Update icon based on state
        if (sidebar.classList.contains('collapsed')) {
            toggleIcon.classList.remove('fa-indent');
            toggleIcon.classList.add('fa-outdent');
        } else {
            toggleIcon.classList.remove('fa-outdent');
            toggleIcon.classList.add('fa-indent');
        }
    });

    // Handle mobile view - ensure sidebar is hidden correctly
    const mobileMenuBtn = document.querySelector('.lg\\:hidden');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
        });
    }
}

function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.querySelector('main');

    mainContent.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (mainContent.scrollTop >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');

                // If it's the desktop active link, change color
                const icon = link.querySelector('i');
                if (icon) {
                    icon.style.color = themePurple;
                }
            } else {
                const icon = link.querySelector('i');
                if (icon && !icon.classList.contains('text-emerald-500') && !icon.classList.contains('text-rose-500') && !icon.classList.contains('text-blue-500') && !icon.classList.contains('text-amber-500')) {
                    icon.style.color = '';
                }
            }
        });
    });
}

function initHelpToggle() {
    const helpBtn = document.getElementById('helpBtn');
    const helpBox = document.getElementById('helpBox');

    helpBtn.addEventListener('click', () => {
        helpBox.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!helpBtn.contains(e.target) && !helpBox.contains(e.target)) {
            helpBox.classList.add('hidden');
        }
    });
}

function initScanningChart() {
    const ctx = document.getElementById('scanningChartSmall').getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 150);
    gradient.addColorStop(0, 'rgba(84, 79, 232, 0.2)');
    gradient.addColorStop(1, 'rgba(84, 79, 232, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            datasets: [{
                label: 'Activity',
                data: [12, 19, 13, 15, 22, 10, 15],
                borderColor: themePurple,
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}

function initSeverityChart() {
    const ctx = document.getElementById('severityChartManual').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Critical', 'High', 'Medium', 'Low'],
            datasets: [{
                data: [15, 25, 35, 25],
                backgroundColor: [
                    '#f43f5e', // rose-500
                    '#fb923c', // orange-400
                    themePurple, // primary
                    '#94a3b8'  // slate-400
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Outfit',
                            size: 11
                        }
                    }
                }
            }
        }
    });
}
