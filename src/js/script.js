// Получаем элементы

const toggleSwitch = document.querySelector('input[type="checkbox"');
const toggleIcon = document.getElementById('toggle-icon');
const currentTheme = localStorage.getItem('theme') || 'light';
const subheader = document.querySelector('.subheader');

// секции
const heroSection = document.querySelector('.hero');
const aboutSection = document.querySelector('.about');
const helpSection = document.querySelector('.help');
const reviewSection = document.querySelector('.reviews');

// иконки
const logoIcon = document.querySelectorAll('.icon-logo');
const geoIcon = document.querySelectorAll('.icon-geo');
const phoneIcon = document.querySelectorAll('.icon-phone');
const emailIcon = document.querySelectorAll('.icon-email');
const registrIcon = document.querySelectorAll('.reg-icon');
const loginIcon = document.querySelectorAll('.log-icon');
const toolIcon = document.querySelector('.tool-icon');
const headsetIcon = document.querySelector('.headset-icon');
const stopwatchIcon = document.querySelector('.stopwatch-icon');
const gearIconText = document.querySelector('.title-light');


// Гамбургер
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    // Функция для переключения меню
    const toggleMenu = () => {
        mobileMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    };

    // Закрытие меню при увеличении ширины экрана
    const closeMenuOnResize = () => {
        if (window.innerWidth > 830) { // Указать порог ширины (768px для планшетов)
            mobileMenu.classList.remove("active");
            hamburger.classList.remove("active");
        }
    };

    // Добавляем слушатели событий
    hamburger.addEventListener("click", toggleMenu);
    window.addEventListener("resize", closeMenuOnResize);
});


function iconMode(theme) {
    logoIcon.forEach(icon => icon.src = `icons/logo-${theme}.svg`);
    geoIcon.forEach(icon => icon.src = `icons/geo-location-${theme}.svg`);
    phoneIcon.forEach(icon => icon.src = `icons/phone-${theme}.svg`);
    emailIcon.forEach(icon => icon.src = `icons/email-${theme}.svg`);
    registrIcon.forEach(icon => icon.src = `icons/register-${theme}.svg`);
    loginIcon.forEach(icon => icon.src = `icons/login-${theme}.svg`);
    // registrIcon.src = `icons/register-${theme}.svg`;
    // loginIcon.src = `icons/login-${theme}.svg`;
    headsetIcon.src = `icons/headset-${theme}.svg`;
    stopwatchIcon.src = `icons/stopwatch-${theme}.svg`;
    toolIcon.src = `icons/tools-${theme}.svg`;
}

const arrSection = [heroSection, aboutSection, helpSection, reviewSection];

// Устанавливаем положение слайдера на основе текущей темы
toggleSwitch.checked = currentTheme === 'dark';

// Функция для применения темы
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        subheader.classList.add('subheader-dark');
        gearIconText.classList.add(`title-${theme}`);
        arrSection.forEach(section => section.classList.add(`${section.classList[0]}-dark`));
        iconMode(theme);
        // toggleIcon.children[0].textContent = 'Темная тема';
        toggleIcon.children[0].src = "icons/moon.svg";
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        subheader.classList.remove('subheader-dark');
        gearIconText.classList.remove(`title-dark`);
        arrSection.forEach(section => section.classList.remove(`${section.classList[0]}-dark`));
        iconMode(theme);
        // toggleIcon.children[0].textContent = 'Светлая тема';
        toggleIcon.children[0].src = "icons/solar.svg";
    }
}

// Устанавливаем текущую тему при загрузке страницы
applyTheme(currentTheme);

// Добавляем обработчик для переключения темы
toggleSwitch.addEventListener('change', () => {
    const newTheme = toggleSwitch.checked ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});

const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider-services__btn--left');
    const btnRight = document.querySelector('.slider-services__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

    // Functions
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML('beforeend', `
                <button class="dots__dot" data-slide="${i}"></button>
            `);
        });
    };

    const activateDot = function (slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`
        );
    };

    // Next slide
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    }

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    }

    const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0);
    }

    init();

    // Event handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });

    // Swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const handleSwipe = function () {
        if (touchEndX < touchStartX) {
            nextSlide(); // swipe left (next slide)
        }
        if (touchEndX > touchStartX) {
            prevSlide(); // swipe right (previous slide)
        }
    };

    // Detect touch start
    slides.forEach(slide => {
        slide.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        // Detect touch end and compare with touch start
        slide.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    });
};

slider();


const sliderMobile = function () {
    const slides = document.querySelectorAll('.slide-mobile');
    const btnLeft = document.querySelector('.slider-mobile__btn--left');
    const btnRight = document.querySelector('.slider-mobile__btn--right');
    const dotContainer = document.querySelector('.dots-mobile');

    let curSlide = 0;
    const maxSlide = slides.length;

    // Functions
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML('beforeend', `
                <button class="dots-mobile__dot" data-slide="${i}"></button>
            `);
        });
    };

    const activateDot = function (slide) {
        document.querySelectorAll('.dots-mobile__dot').forEach(dot => dot.classList.remove('dots-mobile__dot--active'));
        document.querySelector(`.dots-mobile__dot[data-slide="${slide}"]`).classList.add('dots-mobile__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`
        );
    };

    // Next slide
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    }

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    }

    const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0);
    }

    init();

    // Event handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });

    // Swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const handleSwipe = function () {
        if (touchEndX < touchStartX) {
            nextSlide(); // swipe left (next slide)
        }
        if (touchEndX > touchStartX) {
            prevSlide(); // swipe right (previous slide)
        }
    };

    // Detect touch start
    slides.forEach(slide => {
        slide.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        // Detect touch end and compare with touch start
        slide.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    });
};

sliderMobile();
