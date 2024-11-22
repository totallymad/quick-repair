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
const catalogSection = document.querySelector('.catalog')
const statsSection = document.querySelector('.stats');

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
    const icons = [
        { elements: logoIcon, baseName: 'logo' },
        { elements: geoIcon, baseName: 'geo-location' },
        { elements: phoneIcon, baseName: 'phone' },
        { elements: emailIcon, baseName: 'email' },
        { elements: registrIcon, baseName: 'register' },
        { elements: loginIcon, baseName: 'login' },
        { elements: [headsetIcon], baseName: 'headset' }, // Одиночная иконка
        { elements: [stopwatchIcon], baseName: 'stopwatch' },
        { elements: [toolIcon], baseName: 'tools' }
    ];

    icons.forEach(({ elements, baseName }) => {
        elements.forEach(icon => {
            if (icon) {
                icon.src = `icons/${baseName}-${theme}.svg`;
            }
        });
    });
}

const arrSection = [heroSection, aboutSection, helpSection, reviewSection, catalogSection, statsSection];

// Устанавливаем положение слайдера и тему на основе сохранённых данных
const savedTheme = localStorage.getItem('theme') || 'light'; // Если темы нет, по умолчанию 'light'
toggleSwitch.checked = savedTheme === 'dark';
applyTheme(savedTheme);

// Универсальная функция для добавления/удаления классов
function toggleClass(element, className, shouldAdd) {
    if (element) {
        shouldAdd ? element.classList.add(className) : element.classList.remove(className);
    }
}

// Функция для применения темы
function applyTheme(theme) {
    const isDark = theme === 'dark';

    // Устанавливаем атрибут темы
    document.documentElement.setAttribute('data-theme', theme);

    // Изменяем классы для `subheader`
    toggleClass(subheader, 'subheader-dark', isDark);

    // Изменяем классы для `gearIconText`, если элемент существует
    toggleClass(gearIconText, 'title-dark', isDark);

    // Применяем тему к секциям
    arrSection.forEach(section => {
        if (section) {
            toggleClass(section, `${section.classList[0]}-dark`, isDark);
        }
    });

    // Устанавливаем иконку режима
    iconMode(theme);
    toggleIcon.children[0].src = isDark ? "icons/moon.svg" : "icons/solar.svg";
}

// Обработчик переключения темы
toggleSwitch.addEventListener('change', () => {
    const newTheme = toggleSwitch.checked ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme); // Сохраняем тему
    applyTheme(newTheme); // Применяем тему
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
