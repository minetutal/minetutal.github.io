/* main.js — Core functionality & interactions */

// ============================================
// CONFIGURATION
// ============================================
const IG_HANDLE = 'mineilefen';
const CONTACT_EMAIL = 'hacerminetutal@hotmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/hacer-mine-tutal-a7a2ab239/?originalSubdomain=tr';

// ============================================
// REVEAL ANIMATIONS
// ============================================
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            });
        },
        { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}

// ============================================
// TILT EFFECT
// ============================================
document.querySelectorAll('.tilt').forEach(card => {
    const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (py - 0.5) * -10;
        const ry = (px - 0.5) * 12;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    card.addEventListener('mouseenter', () => {
        card.style.willChange = 'transform';
    });

    card.addEventListener('mousemove', onMove);

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.willChange = 'auto';
    });
});

// ============================================
// CONTACT LINKS
// ============================================
const ig = document.getElementById('c-ig');
if (ig) {
    ig.href = `https://instagram.com/${IG_HANDLE}`;
    const igLbl = document.getElementById('c-ig-label');
    if (igLbl) igLbl.textContent = '@' + IG_HANDLE;
}

const cm = document.getElementById('c-mail');
if (cm) {
    const subject = 'Deneme Dersi Talebi';
    cm.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
    const ml = document.getElementById('c-mail-label');
    if (ml) ml.textContent = CONTACT_EMAIL;
}

const li = document.getElementById('c-li');
if (li) li.href = LINKEDIN_URL;

// ============================================
// MOBILE MENU
// ============================================
(function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.menu-close');
    const body = document.body;
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    if (!menuToggle || !mobileMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }

    let isOpen = false;

    // Escape key handler
    const onEsc = (e) => {
        if (e.key === 'Escape' && isOpen) closeMenu();
    };

    // Open menu
    function openMenu() {
        if (isOpen) return;
        isOpen = true;

        mobileMenu.classList.add('active');
        menuToggle.classList.add('active');
        body.classList.add('menu-open');
        menuToggle.setAttribute('aria-expanded', 'true');

        document.addEventListener('keydown', onEsc);

        setTimeout(() => {
            const firstLink = mobileMenu.querySelector('.mobile-nav a');
            if (firstLink) firstLink.focus();
        }, 100);
    }

    // Close menu
    function closeMenu() {
        if (!isOpen) return;
        isOpen = false;

        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');

        document.removeEventListener('keydown', onEsc);

        menuToggle.focus();
    }

    // Toggle button
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        isOpen ? closeMenu() : openMenu();
    });

    // Close button
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }

    // Nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    closeMenu();
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            } else {
                closeMenu();
            }
        });
    });

    // Click outside to close
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });

    // Close on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 640 && isOpen) {
                closeMenu();
            }
        }, 100);
    });

    // Focus trap
    document.addEventListener('keydown', function(e) {
        if (!isOpen || e.key !== 'Tab') return;

        const focusableElements = mobileMenu.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements.length) return;

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
})();

// ============================================
// MODERN ANIMATIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Magnetic button effect
    document.querySelectorAll('.btn').forEach(btn => {
        let isHovering = false;

        btn.addEventListener('mouseenter', () => {
            isHovering = true;
            btn.style.willChange = 'transform';
        });

        btn.addEventListener('mousemove', (e) => {
            if (!isHovering) return;

            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            requestAnimationFrame(() => {
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-2px)`;
            });
        });

        btn.addEventListener('mouseleave', () => {
            isHovering = false;
            btn.style.willChange = 'auto';
            btn.style.transform = '';
        });
    });

    // Disable magnetic effect on touch devices
    if ('ontouchstart' in window) {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('touchstart', () => {
                btn.style.transform = '';
            });
        });
    }
});

// ============================================
// CUSTOM CURSOR
// ============================================
(function() {
    const root = document.documentElement;
    const cursor = document.getElementById('cursor');

    if (!cursor) return;

    const dot = cursor.querySelector('.dot');

    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    const speed = 0.18;

    const update = () => {
        cx += (x - cx) * speed;
        cy += (y - cy) * speed;
        dot.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        requestAnimationFrame(update);
    };

    const onMove = (e) => {
        x = e.clientX;
        y = e.clientY;
    };

    // Hover effect
    const hoverSelectors = 'a, button, .btn, [role="button"], input, textarea, select, .card';

    const addHover = (el) => {
        el.addEventListener('mouseenter', () => root.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => root.classList.remove('cursor-hover'));
    };

    document.querySelectorAll(hoverSelectors).forEach(addHover);

    // Watch for dynamically added elements
    const mo = new MutationObserver(() => {
        document.querySelectorAll(hoverSelectors).forEach(addHover);
    });

    mo.observe(document.body, { childList: true, subtree: true });

    // Visibility management
    document.addEventListener('mousemove', onMove);

    document.addEventListener('mouseleave', () => {
        x = -100;
        y = -100;
    });

    update();
})();

// ============================================
// FAQ ACCORDION
// ============================================
(function() {
    const scope = document.querySelector('#sss');
    if (!scope) return;

    const items = scope.querySelectorAll('.faq-item');

    const closeItem = (it) => {
        const ans = it.querySelector('.faq-answer');
        const btn = it.querySelector('.faq-question');
        it.classList.remove('open');
        btn?.setAttribute('aria-expanded', 'false');
        ans.style.maxHeight = '0px';
    };

    const openItem = (it) => {
        const ans = it.querySelector('.faq-answer');
        const btn = it.querySelector('.faq-question');
        it.classList.add('open');
        btn?.setAttribute('aria-expanded', 'true');

        const inner = ans.querySelector('.faq-answer-content');
        const h = inner ? inner.offsetHeight : 0;
        ans.style.maxHeight = h + 'px';
    };

    items.forEach((item) => {
        const btn = item.querySelector('.faq-question');
        const ans = item.querySelector('.faq-answer');

        // Initialize as closed
        btn.setAttribute('aria-expanded', 'false');
        ans.style.maxHeight = '0px';

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all other items
            items.forEach(other => {
                if (other !== item && other.classList.contains('open')) {
                    closeItem(other);
                }
            });

            // Toggle current item
            if (isOpen) {
                closeItem(item);
            } else {
                openItem(item);
            }
        });
    });

    // Recalculate heights after fonts/images load
    window.addEventListener('load', () => {
        scope.querySelectorAll('.faq-item.open .faq-answer').forEach(ans => {
            const inner = ans.querySelector('.faq-answer-content');
            ans.style.maxHeight = (inner ? inner.offsetHeight : 0) + 'px';
        });
    });
})();

// ============================================
// SCROLL TO TOP
// ============================================
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}