// Preloader
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initAnimations();
                }, 500);
            }, 1000);
        });

        // Initialize GSAP Animations
        function initAnimations() {
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero Animations
            const heroTimeline = gsap.timeline();
            heroTimeline
                .to('.hero-tag', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
                .to('.hero-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
                .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
                .to('.hero-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
                .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
                .to('.hero-stats', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');

            // Scroll Reveals
            gsap.utils.toArray('.reveal').forEach(element => {
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });

            // Skill Bars Animation
            gsap.utils.toArray('.skill-fill').forEach(bar => {
                const width = bar.getAttribute('data-width');
                gsap.to(bar, {
                    scrollTrigger: {
                        trigger: bar,
                        start: 'top 90%',
                    },
                    width: width,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            });
        }

        // Navigation Scroll Effect
        let lastScroll = 0;
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-md');
                navbar.classList.remove('bg-transparent', 'py-4');
                navbar.classList.add('py-2');
            } else {
                navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-md', 'py-2');
                navbar.classList.add('bg-transparent', 'py-4');
            }
            
            lastScroll = currentScroll;
        });

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Magnetic Button Effect
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });

        // Contact Form Handler
        function handleSubmit(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.classList.remove('bg-secondary');
                btn.classList.add('bg-green-600');
                
                setTimeout(() => {
                    e.target.reset();
                    btn.innerHTML = originalText;
                    btn.classList.remove('bg-green-600');
                    btn.classList.add('bg-secondary');
                    btn.disabled = false;
                }, 2000);
            }, 1500);
        }

        // Download Resume Function
        function downloadResume() {
            // Link to the original PDF or create a print-to-PDF functionality
            window.print();
        }

        // Tilted Project Cards (React-Bits style interaction)
        function initProjectTiltCards() {
            const cards = document.querySelectorAll('.project-tilt-card');
            if (!cards.length) return;

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            if (prefersReducedMotion || isMobile) return;

            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const px = x / rect.width;
                    const py = y / rect.height;

                    const rotateY = (px - 0.5) * 12;
                    const rotateX = (0.5 - py) * 12;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    card.style.setProperty('--mx', `${px * 100}%`);
                    card.style.setProperty('--my', `${py * 100}%`);
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                    card.style.setProperty('--mx', '50%');
                    card.style.setProperty('--my', '50%');
                });
            });
        }

        initProjectTiltCards();

        // Smooth Scroll for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
