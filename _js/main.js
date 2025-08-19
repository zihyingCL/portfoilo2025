document.addEventListener("DOMContentLoaded", function () {

    // --- HTML Include Handler (Async/Await version) ---
    async function loadIncludes() {
        const includes = document.querySelectorAll("[data-include]");
        const tasks = Array.from(includes).map(async el => {
            const file = `./${el.getAttribute("data-include")}.html`;
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const html = await response.text();
                    el.innerHTML = html;
                } else {
                    console.error(`[Include] Failed to load ${file}: ${response.status}`);
                    el.innerHTML = `Failed to load content.`;
                }
            } catch (err) {
                console.error(`[Include] Error loading file:`, err);
            }
        });

        await Promise.all(tasks);

        // 等 DOM 更新完成
        return new Promise(resolve => requestAnimationFrame(resolve));
    }

    // --- Scroll Effect Setup ---
    function setupScrollEffects() {
        const header = document.querySelector('.header');
        const stickyNav = document.querySelector('#sticky-nav');
        let lastScrollTop = 0;
        let scrollTimeout;

        if (!header && !stickyNav) return;

        window.addEventListener('scroll', function () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (header) {
                clearTimeout(scrollTimeout);

                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    header.classList.add('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }

                scrollTimeout = setTimeout(() => {
                    header.classList.remove('header-hidden');
                }, 500);

                if (window.scrollY > 50) {
                    header.classList.add('shadow-sm');
                } else {
                    header.classList.remove('shadow-sm');
                }
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // --- Initialization function ---
    function initializePage() {
        // Initialize AOS (Animate on Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 800, once: true });
        }

        // Initialize Swiper sliders
        if (typeof Swiper !== 'undefined') {
            if (document.querySelector('.swiper-works')) {
                new Swiper('.swiper-works', {
                    loop: true,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 30,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            }

            if (document.querySelector('.swiper-instagram')) {
                new Swiper('.swiper-instagram', {
                    loop: true,
                    slidesPerView: 'auto',
                    spaceBetween: 15,
                    speed: 5000,
                    autoplay: {
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },
                });
            }

            if (document.querySelector('.my-swiper-ui')) {
                new Swiper('.my-swiper-ui', {
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 30,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                });
            }
        }

        // Modal Image Handler
        document.querySelectorAll('.modal').forEach(modalElement => {
            modalElement.addEventListener('show.bs.modal', function (event) {
                const triggerElement = event.relatedTarget;
                if (!triggerElement) return;
                const imageInTrigger = triggerElement.querySelector('img');
                const imageSrc = imageInTrigger?.src;
                const imageCaption = imageInTrigger?.getAttribute('data-caption');
                const modalImage = modalElement.querySelector('.modal-body img');
                const modalCaption = modalElement.querySelector('.modal-caption');
                if (modalImage) modalImage.src = imageSrc || '';
                if (modalCaption) modalCaption.textContent = imageCaption || '';
            });
        });

        // Page Transition Handler
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http') && !link.hasAttribute('target')) {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    document.body.classList.add('page-fade-out');
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                });
            }
        });

        // Offcanvas Anchor Link Handler
        document.querySelectorAll('.offcanvas .nav-link').forEach(link => {
            link.addEventListener('click', function () {
                const offcanvasElement = this.closest('.offcanvas');
                const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (offcanvasInstance) offcanvasInstance.hide();
            });
        });

        // Scroll Effects (after header is loaded)
        setupScrollEffects();
    }

    // --- Main execution ---
    async function main() {
        await loadIncludes();     // 等待所有 include 載入並渲染完成
        initializePage();         // 再執行初始化邏輯
    }

    main();

});

