document.addEventListener('DOMContentLoaded', function () {
    // AOS Initialization
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Swiper Initialization
    const initSwiper = (selector, options) => {
        if (document.querySelector(selector)) {
            return new Swiper(selector, options);
        }
        return null;
    };

    initSwiper('.my-swiper-graphic', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: { 768: { slidesPerView: 2, spaceBetween: 40 }, 1024: { slidesPerView: 3, spaceBetween: 50 } }
    });

    initSwiper('.my-swiper-web', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: { 768: { slidesPerView: 2, spaceBetween: 40 }, 1024: { slidesPerView: 3, spaceBetween: 50 } }
    });

    initSwiper('.my-swiper-ui', {
        loop: true,
        spaceBetween: 30,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
    });

    // Refactored Modal Logic for Image Display
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(trigger => {
        const modalId = trigger.getAttribute('data-bs-target');
        if (!modalId) return;

        const modalElement = document.querySelector(modalId);
        if (!modalElement) return;

        modalElement.addEventListener('show.bs.modal', function (event) {
            const triggerElement = event.relatedTarget;
            const thumbnail = triggerElement.querySelector('img') || triggerElement;
            const imageSrc = thumbnail.src;
            const modalImage = modalElement.querySelector('.modal-body img');
            
            if (modalImage && imageSrc) {
                modalImage.src = imageSrc;
            }
        });
    });
});
