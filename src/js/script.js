// Получаем элементы
const themeToggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';
const subheader = document.querySelector('.subheader');
const heroSection = document.querySelector('.hero');
const aboutSection = document.querySelector('.about');
const helpSection = document.querySelector('.help');
const reviewSection = document.querySelector('.reviews');
const headerGeo = document.getElementById('header-logo');

const arrSection = [heroSection, aboutSection, helpSection, reviewSection];

// Функция для применения темы
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleButton.textContent = 'Switch to Light Mode';
        subheader.classList.add('subheader-dark');
        // heroSection.classList.add('hero-dark');
        headerGeo.src = "icons/geo-location-dark.svg";
        arrSection.forEach(section => section.classList.add(`${section.classList[0]}-dark`));
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleButton.textContent = 'Switch to Dark Mode';
        subheader.classList.remove('subheader-dark');
        // heroSection.classList.remove('hero-dark');
        headerGeo.src = "icons/geo-location-light.svg";
        arrSection.forEach(section => section.classList.remove(`${section.classList[0]}-dark`));
    }
}

// Устанавливаем текущую тему при загрузке страницы
applyTheme(currentTheme);

// Добавляем обработчик для переключения темы
themeToggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});