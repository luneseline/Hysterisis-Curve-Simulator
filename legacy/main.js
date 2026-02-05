// Main Shared Script
document.addEventListener('DOMContentLoaded', () => {
    injectNavigation();
    highlightActivePage();
});

const pages = [
    { name: 'Home', path: 'index.html' },
    { name: 'Aim', path: 'aim.html' },
    { name: 'Theory', path: 'theory.html' },
    { name: 'Procedure', path: 'procedure.html' },
    { name: 'Simulation', path: 'simulation.html' },
    { name: 'Result', path: 'result.html' },
    { name: 'References', path: 'references.html' }
];

function injectNavigation() {
    const header = document.createElement('header');
    header.innerHTML = `
        <nav>
            <a href="index.html" class="nav-brand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M7 12c0-2.5 2-5 5-5s5 2.5 5 5-2 5-5 5-5-2.5-5-5z"/>
                </svg>
                CICLABS
            </a>
            <ul class="nav-links">
                ${pages.map(page => `<li><a href="${page.path}">${page.name}</a></li>`).join('')}
            </ul>
        </nav>
    `;
    document.body.prepend(header);

    // Add Footer
    const footer = document.createElement('footer');
    footer.innerHTML = `&copy; ${new Date().getFullYear()} CICLABS - Virtual Basic Science & Engineering Labs`;
    document.body.append(footer);
}

function highlightActivePage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}
