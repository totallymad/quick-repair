// Получаем элементы
const toggleSwitch = document.querySelector('input[type="checkbox"');
const toggleIcon = document.getElementById('toggle-icon');
const currentTheme = localStorage.getItem('theme') || 'light';
const subheader = document.querySelector('.subheader');

// секции
const sections = document.querySelectorAll('section');

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


// ---------------------------- Фейк отправка новостей ----------------------------

const formFooter = document.querySelector('.footer__form');
const inputFooter = document.getElementById('email-footer');
const thxMessageFooter = document.querySelector('.footer__form_thx');

formFooter.addEventListener('submit', function (e) {
    e.preventDefault();
    inputFooter.value = '';
    thxMessageFooter.style.display = 'block';
    inputFooter.style.border = '1px green solid';

    setTimeout(() => {
        thxMessageFooter.style.display = 'none';
        inputFooter.style.border = '1px solid #fff';
    }, 5000)
})


// ---------------------------- Модальное окно услуги ----------------------------

// Получаем все кнопки с классом 'button-catalog' и добавляем обработчик для каждого окна
const buttons = document.querySelectorAll('.button-catalog');

const disableScroll = () => body.style.overflow = 'hidden';
const enableScroll = () => body.style.overflow = '';

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const modalId = `modal-${button.dataset.id}`; // Получаем ID модального окна
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex'; // Показываем модальное окно
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
        }
    });
});

// Кнопки для закрытия модальных окон
const closeButtons = document.querySelectorAll('.close-btn');

closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modal = button.closest('.modal-catalog');
        modal.style.display = 'none'; // Скрываем модальное окно
        document.body.style.overflow = ''; // Блокируем прокрутку страницы
    });
});

// Закрытие модального окна при клике вне окна
window.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal-catalog')) {
        event.target.style.display = 'none';
        document.body.style.overflow = ''; // Блокируем прокрутку страницы
    }
});


// ---------------------------- Модальное окно логина----------------------------
// ---------------------------- Фейк авторизация ----------------------------

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.subheader__login-wrapper button');
    const loginButtonMobile = document.querySelector('.mobile-menu__login-wrapper button');
    const modalLogin = document.querySelector('.modal');
    const modalRegister = document.querySelector('.modal-register');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#register-form');
    const registerLink = document.querySelector('#register-link');
    const body = document.body;

    const disableScroll = () => body.style.overflow = 'hidden';
    const enableScroll = () => body.style.overflow = '';

    // Открытие модального окна
    loginButton.addEventListener('click', function () {
        modalLogin.classList.remove('hidden');
        modalLogin.classList.add('show');
        disableScroll();
    });

    // Открытие модального окна(мобилка)
    loginButtonMobile.addEventListener('click', function () {
        modalLogin.classList.remove('hidden');
        modalLogin.classList.add('show');
        disableScroll();
    });

    // Закрытие модальных окон
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function () {
            modalLogin.classList.add('hidden');
            modalRegister.classList.add('hidden');
            enableScroll();
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function () {
            modalLogin.classList.add('hidden');
            modalRegister.classList.add('hidden');
            enableScroll();
        });
    });

    // Открытие формы регистрации
    registerLink.addEventListener('click', function (e) {
        e.preventDefault(); // Предотвращаем переход по ссылке
        modalLogin.classList.add('hidden');
        modalRegister.classList.remove('hidden');
        modalRegister.classList.add('show');
    });

    // Закрытие на клавишу Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modalLogin.classList.add('hidden');
            modalRegister.classList.add('hidden');
            enableScroll();
        }
    });

    // Обработка формы входа
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.querySelector('#username').value.trim();
        const password = document.querySelector('#password').value.trim();

        if (username && password) {
            window.location.href = './profile.html'; // Укажите путь к странице профиля
        } else {
            alert('Введите логин и пароль!');
        }
    });

    // Обработка формы регистрации
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const regUsername = document.querySelector('#reg-username').value.trim();
        const regPassword = document.querySelector('#reg-password').value.trim();
        const regPasswordApply = document.querySelector('#reg-password-apply').value.trim();

        if (regPassword !== regPasswordApply) {
            alert('Пароли должны совпадать');
            return;
        }

        if (regUsername && regPassword) {
            e.preventDefault(); // Предотвращаем стандартное поведение формы
            alert('Вы успешно зарегистрировались! Теперь вы можете войти.');
            modalRegister.classList.add('hidden');
            modalLogin.classList.remove('hidden');
            document.querySelector('#reg-username').value = document.querySelector('#reg-password').value = document.querySelector('#reg-password-apply').value = ''; console.log('cleared');
        } else {
            alert('Введите логин и пароль для регистрации!');
        }

    });
});

// ---------------------------- Установка минимальной даты ----------------------------

function setMinDate(dateInputId) {
    // Получаем элемент поля даты
    const dateInput = document.getElementById(dateInputId);

    // Проверяем, существует ли элемент
    if (dateInput) {
        // Получаем текущую дату в формате YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];

        // Устанавливаем минимальную дату
        dateInput.min = today;
    }
}

setMinDate('date');



// ---------------------------- Меню - гамбургер ----------------------------

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



// ---------------------------- Смена темы ----------------------------

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
    sections.forEach(section => {
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


// ---------------------------- Слайдер ----------------------------

const slider = function () {
    // Проверяем, существуют ли слайды и другие необходимые элементы
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return; // Если слайды отсутствуют, выходим из функции

    const btnLeft = document.querySelector('.slider-services__btn--left');
    const btnRight = document.querySelector('.slider-services__btn--right');
    const dotContainer = document.querySelector('.dots');

    // Если одна из кнопок или контейнер точек отсутствуют, выходим
    if (!btnLeft || !btnRight || !dotContainer) return;

    let curSlide = 0;
    const maxSlide = slides.length;

    // Функции
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

    // Переход к следующему слайду
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    // Переход к предыдущему слайду
    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    // Инициализация слайдера
    const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0);
    };

    init();

    // Обработчики событий
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

    // Функция для обработки свайпов на мобильных устройствах
    let touchStartX = 0;
    let touchEndX = 0;

    const handleSwipe = function () {
        if (touchEndX < touchStartX) {
            nextSlide(); // Если свайп влево, переходим к следующему слайду
        }
        if (touchEndX > touchStartX) {
            prevSlide(); // Если свайп вправо, переходим к предыдущему слайду
        }
    };

    // Обработчик события начала касания
    slides.forEach(slide => {
        slide.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX; // Запоминаем координаты начала касания
        });

        // Обработчик события окончания касания
        slide.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX; // Запоминаем координаты окончания касания
            handleSwipe(); // Обрабатываем свайп
        });
    });
};

// Проверяем, есть ли на странице слайдер и запускаем его
if (document.querySelector('.slide')) {
    slider();
}


// ----------------------------Мобильный слайдер----------------------------

const sliderMobile = function () {
    // Проверяем, существуют ли слайды и другие необходимые элементы
    const slides = document.querySelectorAll('.slide-mobile');
    if (slides.length === 0) return; // Если слайды отсутствуют, выходим из функции

    const btnLeft = document.querySelector('.slider-mobile__btn--left');
    const btnRight = document.querySelector('.slider-mobile__btn--right');
    const dotContainer = document.querySelector('.dots-mobile');

    // Если одна из кнопок или контейнер точек отсутствуют, выходим
    if (!btnLeft || !btnRight || !dotContainer) return;

    let curSlide = 0;
    const maxSlide = slides.length;

    // Функции
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

    // Переход к следующему слайду
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    // Переход к предыдущему слайду
    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    // Инициализация слайдера
    const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0);
    };

    init();

    // Обработчики событий
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots-mobile__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });

    // Функция для обработки свайпов на мобильных устройствах
    let touchStartX = 0;
    let touchEndX = 0;

    const handleSwipe = function () {
        if (touchEndX < touchStartX) {
            nextSlide(); // Если свайп влево, переходим к следующему слайду
        }
        if (touchEndX > touchStartX) {
            prevSlide(); // Если свайп вправо, переходим к предыдущему слайду
        }
    };

    // Обработчик события начала касания
    slides.forEach(slide => {
        slide.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX; // Запоминаем координаты начала касания
        });

        // Обработчик события окончания касания
        slide.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX; // Запоминаем координаты окончания касания
            handleSwipe(); // Обрабатываем свайп
        });
    });
};

// Проверяем, есть ли на странице слайдер и запускаем его
if (document.querySelector('.slide-mobile')) {
    sliderMobile();
}