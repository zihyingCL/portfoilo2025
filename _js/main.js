document.addEventListener('DOMContentLoaded', function () {

    // Initialize AOS (Animate on Scroll) if the library is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
        });
    }

    // Initialize Swiper sliders only if the Swiper library is loaded
    if (typeof Swiper !== 'undefined') {

        // Works Slider (Standard Centered Slider)
        if (document.querySelector('.swiper-works')) {
            const worksSwiper = new Swiper('.swiper-works', {
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

        // Instagram Slider (Marquee with Pause on Hover)
        if (document.querySelector('.swiper-instagram')) {
            const instagramSwiper = new Swiper('.swiper-instagram', {
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

        // UI Showcase Swiper
        if (document.querySelector('.my-swiper-ui')) {
            const uiSwiper = new Swiper('.my-swiper-ui', {
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

    // --- Generic Modal Image Handler ---
    // This uses Bootstrap's native events, so it's safe as long as Bootstrap JS is loaded.
    document.querySelectorAll('.modal').forEach(modalElement => {
        modalElement.addEventListener('show.bs.modal', function (event) {
            const triggerElement = event.relatedTarget;
            if (!triggerElement) return;

            const imageInTrigger = triggerElement.querySelector('img');
            const imageSrc = imageInTrigger ? imageInTrigger.src : null;
            const imageCaption = imageInTrigger ? imageInTrigger.getAttribute('data-caption') : null;

            if (imageSrc) {
                const modalImage = modalElement.querySelector('.modal-body img');
                const modalCaption = modalElement.querySelector('.modal-caption');
                if (modalImage) {
                    modalImage.src = imageSrc;
                }
                if (modalCaption) {
                    modalCaption.textContent = imageCaption || ''; // Set caption or empty string if null
                }
            }
        });
    });

    // --- Page Transition Handler ---
    document.querySelectorAll('a').forEach(link => {
        // Check if it's an internal link for a page transition
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http') && !link.hasAttribute('target')) {
            link.addEventListener('click', function (event) {
                event.preventDefault(); // Stop the browser from navigating instantly
                
                document.body.classList.add('page-fade-out');

                setTimeout(() => {
                    window.location.href = href;
                }, 500); // Wait for the animation to finish
            });
        }
    });

});

// --- Navbar Scroll Effect ---
let lastScrollTop = 0;
const header = document.querySelector('.header');

let scrollTimeout;
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Clear any existing timeout
    clearTimeout(scrollTimeout);

    // Hide on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // Show navbar after scrolling stops
    scrollTimeout = setTimeout(function() {
        header.classList.remove('header-hidden');
    }, 500); // Adjust delay as needed

    // Add shadow effect
    if (window.scrollY > 50) {
        header.classList.add('shadow-sm');
    } else {
        header.classList.remove('shadow-sm');
    }
});

// --- Offcanvas Anchor Link Handler ---
// This ensures that when an anchor link inside the Offcanvas is clicked,
// the Offcanvas closes smoothly.
document.querySelectorAll('.offcanvas .nav-link').forEach(link => {
    link.addEventListener('click', function () {
        const offcanvasElement = this.closest('.offcanvas');
        if (offcanvasElement) {
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvasInstance) {
                offcanvasInstance.hide();
            }
        }
    });
});