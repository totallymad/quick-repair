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
const registrIcon = document.querySelector('.reg-icon');
const loginIcon = document.querySelector('.log-icon');
const toolIcon = document.querySelector('.tool-icon');
const headsetIcon = document.querySelector('.headset-icon');
const stopwatchIcon = document.querySelector('.stopwatch-icon');
const gearIconText = document.querySelector('.title-light');

console.log(registrIcon)


function iconMode(theme) {
    logoIcon.forEach(icon => icon.src = `icons/logo-${theme}.svg`);
    geoIcon.forEach(icon => icon.src = `icons/geo-location-${theme}.svg`);
    phoneIcon.forEach(icon => icon.src = `icons/phone-${theme}.svg`);
    emailIcon.forEach(icon => icon.src = `icons/email-${theme}.svg`);
    registrIcon.src = `icons/register-${theme}.svg`;
    loginIcon.src = `icons/login-${theme}.svg`;
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