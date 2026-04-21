/* ═══════════════════════════════════════════════════
   Yuvraj Singh — Portfolio  |  script.js
   ═══════════════════════════════════════════════════ */

/* ───── LOADER ───── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 2000);
});

/* ───── CUSTOM CURSOR ───── */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.transform = `translate(${mouseX - 4}px,${mouseY - 4}px)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.transform = `translate(${ringX - 18}px,${ringY - 18}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a,button,.btn,.project-card,.skill-tag,.cert-card,.contact-item,.stat-card,.nav-hamburger').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

/* ───── PARTICLE CANVAS ───── */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H;
const particles = [];
const COLORS = ['#6366f1', '#ec4899', '#22d3ee', '#f59e0b'];
const COUNT = 80;
const MAX_DIST = 140;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() { this.reset(); }

  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r = Math.random() * 2 + 1;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.6;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

for (let i = 0; i < COUNT; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < MAX_DIST) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = particles[i].color;
        ctx.globalAlpha = 0.08 * (1 - d / MAX_DIST);
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

/* ───── TYPING ANIMATION ───── */
const bioText = "Results-driven AI & ML student with hands-on experience in Computer Vision, NLP, and full-stack web development. Passionate about solving real-world problems through clean, modular, and production-ready code.";
let charIndex = 0;
const bioEl = document.getElementById('heroBio');

function typeBio() {
  if (charIndex < bioText.length) {
    bioEl.innerHTML = bioText.slice(0, charIndex + 1) + '<span class="typed-cursor"></span>';
    charIndex++;
    setTimeout(typeBio, 22);
  } else {
    bioEl.innerHTML = bioText + '<span class="typed-cursor"></span>';
  }
}
setTimeout(typeBio, 2400);

/* ───── SCROLL REVEAL ───── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* ───── COUNTER ANIMATION ───── */
const statEls = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + '+';
      }, 30);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statEls.forEach(el => statObserver.observe(el));

/* ───── NAVBAR BACKGROUND ON SCROLL ───── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) nav.style.background = 'rgba(10,10,18,.85)';
  else nav.style.background = 'var(--glass)';
});

/* ───── MOBILE MENU ───── */
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* ───── FORM HANDLER ───── */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('formSubmit');
  btn.innerHTML = '<i class="fa-solid fa-check"></i>&nbsp; Message Sent!';
  btn.style.background = 'linear-gradient(135deg,#22d3ee,#6366f1)';
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>&nbsp; Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 2500);
}

/* ───── ACTIVE NAV LINK HIGHLIGHT ───── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(s => {
    const top = s.offsetTop;
    const h = s.offsetHeight;
    const id = s.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + h) {
        link.style.color = 'var(--text)';
        link.style.setProperty('--after-w', '100%');
      } else {
        link.style.color = '';
      }
    }
  });
});

/* ───── HIDE CURSOR ON TOUCH DEVICES ───── */
if ('ontouchstart' in window) {
  dot.style.display = 'none';
  ring.style.display = 'none';
  document.body.style.cursor = 'auto';
}
