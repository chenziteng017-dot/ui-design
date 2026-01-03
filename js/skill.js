

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// 初始化页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 元素进入视口时的淡入效果
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// 为所有section添加初始样式和观察
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(section);
});

// 语言选择器功能
const languageSelector = document.querySelector('.language-selector');
let isEnglish = true;

if (languageSelector) {
    languageSelector.addEventListener('click', () => {
        isEnglish = !isEnglish;
        languageSelector.textContent = isEnglish ? 'EN' : '中文';
        // 这里可以添加语言切换逻辑
    });
}

// 按钮悬停效果
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// 导航链接悬停效果增强
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.color = '#000';
        link.style.fontWeight = '600';
    });

    link.addEventListener('mouseleave', () => {
        if (link.classList.contains('secondary')) {
            link.style.color = '#666';
        }
        link.style.fontWeight = '500';
    });
});

// 为图标项添加悬停动画
const iconItems = document.querySelectorAll('.icon-item');
iconItems.forEach((icon, index) => {
    // 为每个图标添加不同的背景色
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
        '#DDA0DD', '#98D8C8', '#F7DC6F'
    ];

    icon.style.backgroundColor = colors[index % colors.length];

    // 悬停动画
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// 移动端菜单支持（预留）
function setupMobileMenu() {
    // 这里可以添加移动端菜单的实现
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        // 移动端菜单逻辑
    }
}

// 为导航栏添加滚动时的样式变化
window.addEventListener('scroll', () => {
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.id = 'scrollToTop';
    scrollToTopButton.textContent = '↑';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #3498db;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;

    if (window.scrollY > 300) {
        if (!document.getElementById('scrollToTop')) {
            document.body.appendChild(scrollToTopButton);
            setTimeout(() => {
                scrollToTopButton.style.opacity = '1';
            }, 10);

            scrollToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    } else {
        const existingButton = document.getElementById('scrollToTop');
        if (existingButton) {
            existingButton.style.opacity = '0';
            setTimeout(() => {
                if (existingButton.parentNode) {
                    existingButton.parentNode.removeChild(existingButton);
                }
            }, 300);
        }
    }
});

// 移动端菜单交互增强
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNavLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && mobileNavLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNavLinks.classList.toggle('active');

        // 汉堡菜单图标动画
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].classList.toggle('rotate');
            spans[1].classList.toggle('hide');
            spans[2].classList.toggle('rotate-reverse');
        }
    });
}

// 确保平滑滚动时关闭移动菜单
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function () {
        if (mobileNavLinks && mobileNavLinks.classList.contains('active')) {
            mobileNavLinks.classList.remove('active');

            // 重置汉堡菜单图标
            const spans = mobileMenuBtn?.querySelectorAll('span');
            if (spans && spans.length >= 3) {
                spans[0].classList.remove('rotate');
                spans[1].classList.remove('hide');
                spans[2].classList.remove('rotate-reverse');
            }
        }
    });
});

const prev = document.querySelector('.hero-prev');
const next = document.querySelector('.hero-next');
prev?.addEventListener('click', () => {

    const skillsList = document.querySelectorAll('.skills-item');
    skillsList.forEach((item, index) => {
        let left = '0%';
        if (index === 0) {
            left = '-50%';
        } else if (index === 1) {
            left = '-100%';
        } else if (index === 2) {
            left = '0%';
        } else if (index === 3) {
            left = '52%';
        }
        item.style.left = left;
    });
});

next?.addEventListener('click', () => {
    const skillsList = document.querySelectorAll('.skills-item');
    skillsList.forEach((item, index) => {
        let left = '0%';
        if (index === 0) {
            left = '0%';
        } else if (index === 1) {
            left = '52%';
        } else if (index === 2) {
            left = '-50%';
        } else if (index === 3) {
            left = '-100%';
        }
        item.style.left = left;
    });
});
