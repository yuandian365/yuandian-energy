// ===== 页面切换 =====
function showPage(pageId, navEl) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (navEl) navEl.classList.add('active');
  else {
    const link = document.querySelector(`.nav-link[onclick*="'${pageId}'"]`);
    if (link) link.classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pageId === 'home') startCounters();
}

// ===== 移动菜单 =====
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ===== 数字计数动画 =====
function startCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  nums.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

// ===== 粒子效果 =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = (-Math.random() * 20) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    container.appendChild(p);
  }
}

// ===== 产品筛选 =====
function filterProduct(cat, btn) {
  document.querySelectorAll('.pnav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const sections = document.querySelectorAll('.product-section');
  sections.forEach(s => {
    if (cat === 'all' || s.getAttribute('data-cat') === cat) {
      s.style.display = '';
      s.style.animation = 'fadeInUp 0.4s ease';
    } else {
      s.style.display = 'none';
    }
  });
}

// ===== 表单提交 =====
function submitForm(e) {
  e.preventDefault();
  document.getElementById('successModal').classList.add('show');
}
function closeModal() {
  document.getElementById('successModal').classList.remove('show');
}

// ===== 回到顶部 =====
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 400) btn.classList.add('visible');
  else btn.classList.remove('visible');
});

// ===== 滚动动画 =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .mvv-card, .team-card, .solution-card, .cert-card, .advantage-item, .process-step, .tl-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ===== 导航滚动效果 =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
  }
});

// ===== 添加 fadeInUp 动画 =====
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);

// ===== Logo点击返回首页 =====
document.querySelector('.logo').addEventListener('click', () => showPage('home', null));

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  startCounters();
  initScrollAnimations();
});
