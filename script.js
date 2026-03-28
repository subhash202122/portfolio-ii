

/* ── SMOOTH SCROLL + SECTION FLASH ── */
function smoothTo(id) {
  const target = document.getElementById(id);
  if (!target) return;

  // close mobile menu if open
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('active');

  // smooth scroll to section
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // flash the section after arriving
  setTimeout(() => {
    target.classList.add('section-flash');
    setTimeout(() => target.classList.remove('section-flash'), 950);
  }, 520);

  setActive(id);
}

// attach smooth scroll to all desktop nav links
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    smoothTo(a.dataset.section);
  });
});

/* ── SET ACTIVE NAV LINK ── */
function setActive(id) {
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.classList.toggle('active', a.dataset.section === id)
  );
}

/* ── SCROLL PROGRESS BAR ── */
window.addEventListener('scroll', () => {
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / docH) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
});

/* ── ACTIVE NAV HIGHLIGHT ON SCROLL ── */
const ioNav = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) setActive(e.target.id);
  });
}, { threshold: 0.35 });

document.querySelectorAll('section[id]').forEach(s => ioNav.observe(s));

/* ── HAMBURGER TOGGLE ── */
document.getElementById('hamburger').addEventListener('click', function () {
  this.classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('active');
});

/* ── TYPED TEXT ANIMATION ── */
const phrases = [
  'Competitive Programming Engineer',
  'MERN Stack Developer',
  'DSA Problem Curator',
  'Full-Stack Engineer',
];
let pi = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const phrase = phrases[pi];
  typedEl.textContent = del ? phrase.slice(0, --ci) : phrase.slice(0, ++ci);

  if (!del && ci === phrase.length) {
    del = true;
    setTimeout(type, 2200);
    return;
  }
  if (del && ci === 0) {
    del = false;
    pi = (pi + 1) % phrases.length;
  }

  setTimeout(type, del ? 45 : 80);
}

type();

/* ── SCROLL REVEAL + SKILL BARS ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');

      // animate skill bar widths
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });

      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .skill-category')
  .forEach(el => revObs.observe(el));

/* ── CONTACT FORM SUBMIT ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Message Sent! ✓';
  btn.style.background = 'linear-gradient(135deg, #22d3ee, #a855f7)';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
