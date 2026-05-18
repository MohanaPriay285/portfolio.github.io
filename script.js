// ================= EMAILJS CONFIGURATION =================

const EMAILJS_CONFIG = {
  PUBLIC_KEY: "1IDMadPMkjBJFq70S",
  SERVICE_ID: "service_1zu8btt",
  TEMPLATE_ID: "template_weflc2i"
};

// =========================================================


// ================= INITIALIZE EMAILJS =================

function initEmailJS() {

  if (typeof emailjs === 'undefined') {

    console.error('EmailJS SDK not loaded');
    return false;

  }

  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

  console.log('EmailJS initialized successfully');

  return true;
}

// =========================================================


// ================= THEME MANAGEMENT =================

function setTheme(themeName) {

  document.documentElement.setAttribute(
    'data-theme',
    themeName
  );

  localStorage.setItem(
    'premium-theme',
    themeName
  );

}

function loadTheme() {

  const saved = localStorage.getItem(
    'premium-theme'
  );

  const validThemes = [
    'original',
    'lavender',
    'mauve',
    'powder',
    'sage',
    'peach'
  ];

  if (saved && validThemes.includes(saved)) {

    setTheme(saved);

  } else {

    setTheme('original');

  }
}

function initThemeSwitcher() {

  const toggleBtn =
    document.getElementById('themeToggleBtn');

  const dropdown =
    document.getElementById('themeDropdown');

  if (!toggleBtn || !dropdown) return;

  toggleBtn.addEventListener('click', (e) => {

    e.stopPropagation();

    dropdown.classList.toggle('show');

  });

  document.addEventListener('click', () => {

    dropdown.classList.remove('show');

  });

  dropdown.querySelectorAll('div').forEach(option => {

    option.addEventListener('click', () => {

      const theme =
        option.getAttribute('data-theme');

      if (theme) {

        setTheme(theme);

      }

      dropdown.classList.remove('show');

    });

  });

}

// =========================================================


// ================= MOBILE MENU =================

function initMobileMenu() {

  const menuBtn =
    document.getElementById('mobileMenuBtn');

  const mobileMenu =
    document.getElementById('mobileMenu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {

    mobileMenu.classList.toggle('show');

  });

}

// =========================================================


// ================= HIRE MODAL =================

function initHireModal() {

  const hireBtn =
    document.getElementById('hireMeBtn');

  const modal =
    document.getElementById('hireModal');

  if (!hireBtn || !modal) return;

  hireBtn.addEventListener('click', () => {

    modal.classList.add('show');

  });

  const closeBtns =
    document.querySelectorAll(
      '.close-modal, .close-modal-btn'
    );

  closeBtns.forEach(btn => {

    btn.addEventListener('click', () => {

      modal.classList.remove('show');

    });

  });

  window.addEventListener('click', (e) => {

    if (e.target === modal) {

      modal.classList.remove('show');

    }

  });

}

// =========================================================


// ================= TOAST =================

function showToast(message, isError = false) {

  const toast =
    document.getElementById('toast');

  if (!toast) return;

  toast.textContent = message;

  toast.style.background = isError
    ? '#c0392b'
    : 'var(--text-primary)';

  toast.classList.add('show');

  setTimeout(() => {

    toast.classList.remove('show');

  }, 2600);

}

// =========================================================


// ================= CONTACT FORM =================

function initContactForm() {

  const form =
    document.getElementById('contactForm');

  if (!form) {

    console.warn('Contact form not found');
    return;

  }

  form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const submitBtn =
      form.querySelector(
        'button[type="submit"]'
      );

    if (!submitBtn) return;

    const originalText =
      submitBtn.innerHTML;

    submitBtn.disabled = true;

    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-pulse"></i> Sending...';

    try {

      // Get form values
      const formData = new FormData(form);

      const from_name =
        formData.get('from_name');

      const from_email =
        formData.get('from_email');

      const company =
        formData.get('company') || '';

      const project_type =
        formData.get('project_type') || '';

      const message =
        formData.get('message');

      // Validation
      if (
        !from_name ||
        !from_email ||
        !message
      ) {

        throw new Error(
          'Please fill all required fields'
        );

      }

      // EmailJS template variables
      const templateParams = {

        from_name: from_name,

        from_email: from_email,

        reply_to: from_email,

        company: company,

        project_type: project_type,

        message: message

      };

      // Send Email
      const result = await emailjs.send(

        EMAILJS_CONFIG.SERVICE_ID,

        EMAILJS_CONFIG.TEMPLATE_ID,

        templateParams

      );

      console.log(
        'Email sent successfully:',
        result
      );

      showToast(
        '✓ Message sent successfully!'
      );

      form.reset();

    } catch (error) {

      console.error(
        'EmailJS Error:',
        error
      );

      showToast(
        '❌ Failed to send message',
        true
      );

    } finally {

      submitBtn.disabled = false;

      submitBtn.innerHTML = originalText;

    }

  });

}

// =========================================================


// ================= GITHUB BUTTONS =================

function initGitHubButtons() {

  const btns =
    document.querySelectorAll('.github-btn');

  btns.forEach(btn => {

    btn.addEventListener('click', () => {

      showToast(
        '🔗 GitHub repository – production code'
      );

    });

  });

}

// =========================================================


// ================= SCROLL REVEAL =================

function initScrollReveal() {

  const elements =
    document.querySelectorAll('.fade-up');

  if (elements.length === 0) return;

  const observer = new IntersectionObserver(

    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            'revealed'
          );

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

  );

  elements.forEach(el => {

    observer.observe(el);

  });

}

// =========================================================


// ================= SMOOTH SCROLL =================

function initSmoothScroll() {

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );

  internalLinks.forEach(link => {

    link.addEventListener('click', (e) => {

      const hash =
        link.getAttribute('href');

      if (hash === '#') return;

      const targetElement =
        document.querySelector(hash);

      if (targetElement) {

        e.preventDefault();

        targetElement.scrollIntoView({

          behavior: 'smooth',

          block: 'start'

        });

        history.pushState(
          null,
          null,
          hash
        );

      }

    });

  });

}

// =========================================================


// ================= INITIALIZE EVERYTHING =================

document.addEventListener(
  'DOMContentLoaded',
  () => {

    loadTheme();

    initThemeSwitcher();

    initMobileMenu();

    initHireModal();

    initGitHubButtons();

    initScrollReveal();

    initSmoothScroll();

    const emailReady = initEmailJS();

    if (emailReady) {

      initContactForm();

    } else {

      showToast(
        '⚠️ Email service unavailable',
        true
      );

    }

  }
);

// =========================================================
