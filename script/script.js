document.addEventListener('DOMContentLoaded', () => {

    // 1. Preloader Logic
    const counterElement = document.getElementById('counter');
    let count = 0;
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 15) + 5;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            counterElement.innerText = count;
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 300);
        } else {
            counterElement.innerText = count;
        }
    }, 50);

    // 2. Intersection Observer (Reveal Elements)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

    // 3. Scroll-Linked Process Animation
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-step');
            } else {
                entry.target.classList.remove('active-step');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.process-step').forEach(el => processObserver.observe(el));

    // 4. Horizontal Scroll Logic
    const wrapper = document.querySelector('.horizontal-scroll-wrapper');
    const track = document.getElementById('horizontal-track');

    window.addEventListener('scroll', () => {
        const rect = wrapper.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
            const scrollProgress = Math.abs(rect.top) / (rect.height - window.innerHeight);
            const maxScroll = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);
            track.style.transform = `translateX(-${scrollProgress * maxScroll}px)`;
        }
    });

    // 5. Floating Image (Showcase Hover)
    const cursorImage = document.getElementById('cursor-image');
    const workItems = document.querySelectorAll('.work-item');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursorImage.style.left = `${cursorX}px`;
        cursorImage.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    workItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imgSrc = item.getAttribute('data-img');
            cursorImage.style.backgroundImage = `url(${imgSrc})`;
            cursorImage.classList.add('active');
        });

        item.addEventListener('mouseleave', () => {
            cursorImage.classList.remove('active');
        });
    });

    // 6. 3D Hover Effect on Bento Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // 7. PageSpeed Counter Animation (O Trunfo da Agência)
    const speedScore = document.getElementById('pagespeed-score');
    let hasAnimated = false;

    const speedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                let currentScore = 0;
                const targetScore = 99;
                const duration = 1500;
                const incrementTime = duration / targetScore;

                const timer = setInterval(() => {
                    currentScore += 1;
                    speedScore.innerText = currentScore;
                    if (currentScore >= targetScore) {
                        clearInterval(timer);
                        speedScore.innerText = targetScore;
                    }
                }, incrementTime);

                speedObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    speedObserver.observe(speedScore);
// 8. Mobile Menu Logic (High-End Toggle) - AGORA PROTEGIDO
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('open');

            if (mobileMenu.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // 9. Setup Mobile Gallery (Nível 4)
    function setupMobileGallery() {
        const isMobile = window.innerWidth <= 768;
        const workItems = document.querySelectorAll('.work-item');

        if (isMobile) {
            workItems.forEach(item => {
                const imgPath = item.getAttribute('data-img');
                item.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%), url(${imgPath})`;
            });
        } else {
            workItems.forEach(item => {
                item.style.backgroundImage = '';
            });
        }
    }

    // Chama no load inicial
    setupMobileGallery();
    // Atualiza no resize
    window.addEventListener('resize', setupMobileGallery);

});
