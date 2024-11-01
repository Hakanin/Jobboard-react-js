document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links').querySelector('ul');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});
