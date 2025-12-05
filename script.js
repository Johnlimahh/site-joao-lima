// Menu Toggle para mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// EFEITO DE ENGOLIR NA SEÇÃO SOBRE - CORRIGIDO
function parallaxAboutSection() {
    const aboutSection = document.querySelector('.about');
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    
    if (!aboutSection || !aboutImage || !aboutText) return;
    
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calcula quando a seção está saindo da tela (rolando para baixo)
    if (rect.top < 0 && rect.bottom > 0) {
        const scrollProgress = Math.abs(rect.top) / windowHeight;
        const moveAmount = scrollProgress * 150;
        const opacity = Math.max(0, 1 - scrollProgress * 1.5);
        const scale = Math.max(0.7, 1 - scrollProgress * 0.3);
        
        aboutImage.style.transform = `translateY(-${moveAmount}px) scale(${scale})`;
        aboutImage.style.opacity = opacity;
        
        aboutText.style.transform = `translateY(-${moveAmount}px) scale(${scale})`;
        aboutText.style.opacity = opacity;
    } else if (rect.top >= 0) {
        // Reset quando volta ao topo
        aboutImage.style.transform = 'translateY(0) scale(1)';
        aboutImage.style.opacity = 1;
        aboutText.style.transform = 'translateY(0) scale(1)';
        aboutText.style.opacity = 1;
    }
}

window.addEventListener('scroll', parallaxAboutSection);

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação a todos os cards e items
document.querySelectorAll('.album-card, .show-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Efeito parallax no hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
});

// Album cards - efeito de play
document.querySelectorAll('.album-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('play-button') || e.target.closest('.play-button')) {
            return;
        }
        
        const playButton = card.querySelector('.play-button');
        playButton.style.transform = 'translate(-50%, -50%) scale(1.2)';
        
        setTimeout(() => {
            playButton.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);
        
        console.log('Tocando:', card.querySelector('h3').textContent);
    });
});

// Efeito glitch no título
const glitchText = document.querySelector('.glitch');
let glitchInterval;

function randomGlitch() {
    glitchInterval = setInterval(() => {
        if (Math.random() > 0.95) {
            glitchText.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #e63946,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ff00
            `;
            
            setTimeout(() => {
                glitchText.style.textShadow = 'none';
            }, 50);
        }
    }, 100);
}

randomGlitch();
