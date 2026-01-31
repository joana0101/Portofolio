// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      const nav = document.querySelector('.nav-links');
      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Unobserve after animation to improve performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in, .info-item, .skill-category, .project-item');
  fadeElements.forEach(el => {
    observer.observe(el);
  });
});

// Add parallax effect to background
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.homepage, .info-section');
  
  parallaxElements.forEach(element => {
    const speed = 0.5;
    const yPos = -(scrolled * speed);
    element.style.backgroundPosition = `center ${yPos}px`;
  });
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.style.transform = 'translateX(-50%) translateY(0)';
    return;
  }
  
  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling down
    header.style.transform = 'translateX(-50%) translateY(-100%)';
  } else {
    // Scrolling up
    header.style.transform = 'translateX(-50%) translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Skill tag click effect (optional - adds a little sparkle)
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', function() {
    this.style.animation = 'none';
    setTimeout(() => {
      this.style.animation = '';
    }, 10);
  });
});

// Project link analytics (placeholder)
document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', function(e) {
    // Add your analytics tracking here
    console.log('Project link clicked:', this.textContent);
  });
});

// Add cursor trail effect on homepage (optional fancy feature)
let particles = [];
const maxParticles = 20;

function createParticle(x, y) {
  if (particles.length >= maxParticles) {
    const oldParticle = particles.shift();
    oldParticle.remove();
  }
  
  const particle = document.createElement('div');
  particle.className = 'cursor-particle';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  document.body.appendChild(particle);
  particles.push(particle);
  
  setTimeout(() => {
    particle.style.opacity = '0';
    particle.style.transform = 'scale(0)';
  }, 10);
  
  setTimeout(() => {
    particle.remove();
    particles = particles.filter(p => p !== particle);
  }, 600);
}

const homepage = document.querySelector('.homepage');
if (homepage) {
  homepage.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.7) { // Only create particles 30% of the time
      createParticle(e.pageX, e.pageY);
    }
  });
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add CSS for cursor particles
const style = document.createElement('style');
style.textContent = `
  .cursor-particle {
    position: absolute;
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.8), rgba(255, 165, 0, 0.4));
    border-radius: 50%;
    pointer-events: none;
    opacity: 1;
    transform: scale(1);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 9999;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
  
  body.loaded {
    animation: fadeIn 0.5s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Console Easter Egg
console.log('%c🎮 Welcome to the Adventure! 🎮', 'font-size: 20px; color: #FFD700; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);');
console.log('%cLooking for something? Try typing: unleashThePower()', 'font-size: 14px; color: #64b5f6;');

window.unleashThePower = function() {
  console.log('%c⚡ LEGENDARY POWER ACTIVATED! ⚡', 'font-size: 18px; color: #FFD700; font-weight: bold;');
  document.querySelectorAll('.skill-tag.legendary').forEach((tag, index) => {
    setTimeout(() => {
      tag.style.animation = 'glow 0.5s ease-in-out 3';
    }, index * 100);
  });
};