document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    document.querySelector('.banner-btn').addEventListener('click', function (e) {
        e.preventDefault();
        const bannerSubtitle = document.querySelector('.banner-subtitle');
        console.log(bannerSubtitle.style.opacity);

        bannerSubtitle.style.transition = 'height 0.5s ease opacity 0.5s ease';

        if (bannerSubtitle.style.opacity === '0') {
            bannerSubtitle.style.opacity = 1;
            bannerSubtitle.style.height = 'auto';
        } else {
            bannerSubtitle.style.opacity = 0;
            bannerSubtitle.style.height = '0';
        }
    });

    function preventOrphanInTextNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue;
            if (text && text.trim().split(' ').length > 1) {
                const newText = text.replace(/ ([^ ]*)$/, '\u00A0$1');
                if (newText !== text) {
                    node.nodeValue = newText;
                }
            }
        } else {
            node.childNodes.forEach(preventOrphanInTextNodes);
        }
    }
    document.querySelectorAll('p').forEach(p => {
        preventOrphanInTextNodes(p);
    });
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    const cards = document.querySelectorAll('.model-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
    });

    const images = document.querySelectorAll('.sector-card, .goal-image-card, .additional-image');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight - revealPoint) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });

        images.forEach(img => {
            const imgTop = img.getBoundingClientRect().top;
            if (imgTop < windowHeight - revealPoint) {
                img.style.opacity = '1';
            }
        });
    }

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.textContent = 'Menu';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.display = 'none';
    mobileMenuBtn.style.position = 'fixed';
    mobileMenuBtn.style.top = '20px';
    mobileMenuBtn.style.right = '20px';
    mobileMenuBtn.style.zIndex = '1001';
    mobileMenuBtn.style.padding = '10px 15px';
    mobileMenuBtn.style.backgroundColor = '#3498db';
    mobileMenuBtn.style.color = 'white';
    mobileMenuBtn.style.border = 'none';
    mobileMenuBtn.style.borderRadius = '5px';
    mobileMenuBtn.style.cursor = 'pointer';

    document.body.appendChild(mobileMenuBtn);

    function toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'fixed';
            navLinks.style.top = '70px';
            navLinks.style.right = '20px';
            navLinks.style.background = 'rgba(0, 0, 0, 0.95)';
            navLinks.style.padding = '20px';
            navLinks.style.borderRadius = '10px';
            navLinks.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    function adjustMenuForScreenSize() {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navLinks.style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.background = 'none';
            navLinks.style.padding = '0';
            navLinks.style.borderRadius = '0';
            navLinks.style.boxShadow = 'none';
        }
    }

    window.addEventListener('resize', adjustMenuForScreenSize);
    adjustMenuForScreenSize();

    function initCarousel() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        const originalItems = Array.from(carousel.querySelectorAll('.carousel-item'));
        if (originalItems.length === 0) return;
        let pos = 0;
        let lastTimestamp = 0;
        let rafId = null;
        let paused = false;
        const speed = 0.5;

        let originalWidth = 0;
        let totalRenderedWidth = 0;

        carousel.style.display = 'flex';
        carousel.style.flexWrap = 'nowrap';
        carousel.style.willChange = 'transform';
        carousel.style.backfaceVisibility = 'hidden';

        function waitForImages() {
            const imgs = Array.from(carousel.querySelectorAll('img'));
            return Promise.all(imgs.map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                    img.addEventListener('load', resolve);
                    img.addEventListener('error', resolve);
                });
            }));
        }

        function computeWidths() {
            originalWidth = originalItems.reduce((sum, el, i) => {
                const w = el.offsetWidth;
                const style = getComputedStyle(el);
                const mr = parseFloat(style.marginRight || 0);
                return sum + w + (isNaN(mr) ? 0 : mr);
            }, 0);

            totalRenderedWidth = originalWidth * 2;
            carousel.style.width = totalRenderedWidth + 'px';
        }

        function cloneOnce() {
            if (carousel.querySelectorAll('.carousel-item.clone').length > 0) return;
            originalItems.forEach(item => {
                const c = item.cloneNode(true);
                c.classList.add('clone');
                carousel.appendChild(c);
            });
        }

        function loop(timestamp) {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const dt = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            if (!paused) {
                pos -= speed * (dt / 16);

                if (Math.abs(pos) >= originalWidth) {
                    pos += originalWidth;
                }

                carousel.style.transform = `translateX(${pos}px)`;
            }

            rafId = requestAnimationFrame(loop);
        }

        function start() {
            if (!rafId) {
                lastTimestamp = performance.now();
                rafId = requestAnimationFrame(loop);
            }
        }

        function stop() {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }

        carousel.addEventListener('mouseenter', () => { paused = true; });
        carousel.addEventListener('mouseleave', () => {
            paused = false;
            lastTimestamp = performance.now();
        });

        window.addEventListener('blur', stop);
        window.addEventListener('focus', start);

        window.addEventListener('resize', () => {
            stop();
            pos = 0;
            carousel.style.transform = 'translateX(0)';

            computeWidths();
            start();
        });

        waitForImages().then(() => {
            cloneOnce();
            requestAnimationFrame(() => {
                computeWidths();

                requestAnimationFrame(() => {
                    start();
                });
            });
        });
    }

    if (document.querySelector('.carousel')) {
        initCarousel();
    }

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.textContent = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '30px';
    scrollTopBtn.style.right = '30px';
    scrollTopBtn.style.zIndex = '1000';
    scrollTopBtn.style.width = '50px';
    scrollTopBtn.style.height = '50px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.backgroundColor = '#3498db';
    scrollTopBtn.style.color = 'white';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.fontSize = '24px';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.transition = 'opacity 0.3s ease';
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.justifyContent = 'center';

    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
        }
    });

    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });
    const prev = document.querySelector('.swiper-button-prev');
    const next = document.querySelector('.swiper-button-next');
    prev.addEventListener('click', () => {
        const allSlides = document.querySelectorAll('.swiper-slide');
        const currentIndex = Array.from(allSlides).findIndex(slide => slide.classList.contains('active'));
        if (currentIndex === -1) return; 
        allSlides.forEach(slide => slide.classList.remove('active'));
        const prevIndex = (currentIndex - 1 + allSlides.length) % allSlides.length;
        allSlides[prevIndex].classList.add('active');
    });
    next.addEventListener('click', () => {
        const currentSlide = document.querySelector('.swiper-slide.active');
        const allSlides = document.querySelectorAll('.swiper-slide');
        currentSlide.classList.remove('active');
        if (currentSlide.nextElementSibling) {
            currentSlide.nextElementSibling.classList.add('active');
        } else {
            allSlides[0].classList.add('active');
        }
    })

    const dotLis = document.querySelectorAll('.industry-dot li');
    dotLis.forEach((dotLi, index) => {
        dotLi.addEventListener('click', function () {
            dotLis.forEach(dotLi => {
                dotLi.classList.remove('active');
            });
            dotLi.classList.add('active');
            const allSlides = document.querySelectorAll('.industry-text');
            allSlides.forEach(slide => {
                slide.classList.remove('industry-swiper-active');
            });
            allSlides[index].classList.add('industry-swiper-active');
        });
    })
});