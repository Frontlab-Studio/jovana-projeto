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

    if (wrapper && track) {
        window.addEventListener('scroll', () => {
            const rect = wrapper.getBoundingClientRect();
            if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
                const scrollProgress = Math.abs(rect.top) / (rect.height - window.innerHeight);
                const maxScroll = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);
                track.style.transform = `translateX(-${scrollProgress * maxScroll}px)`;
            }
        });
    }

    // 5. Setup Gallery Backgrounds (À Prova de Falhas)
    const workItems = document.querySelectorAll('.work-item');

    workItems.forEach(item => {
        const imgPath = item.getAttribute('data-img');

        if (imgPath) {
            // O JS injeta o gradiente escuro e a imagem na mesma linha
            item.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 70%), url('${imgPath}')`;
        }
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

    // 7. Mobile Menu Logic
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

});