const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

// Пути к файлам
const paths = {
  styles: {
    src: "src/scss/**/*.scss",
    dest: "docs/css" // Папка для стилей
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "docs/js" // Папка для скриптов
  },
  html: {
    src: "src/*.html",
    dest: "docs" // Папка для HTML
  },
  images: {
    src: "src/img/**/*",
    dest: "docs/img" // Папка для изображений
  },
  icons: {
    src: "src/icons/**/*",
    dest: "docs/icons" // Папка для иконок
  }
};

// Задача: стили
gulp.task('styles', function () {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError)) // Компиляция SCSS
    .pipe(postcss([autoprefixer()])) // PostCSS с Autoprefixer
    .pipe(cleanCSS()) // Минификация CSS
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

// Задача: скрипты
gulp.task('scripts', function () {
  return gulp.src(paths.scripts.src)
    .pipe(babel({ presets: ['@babel/preset-env'] })) // Транспиляция JS через Babel
    .pipe(terser())  // Используем gulp-terser для минификации
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
});

// Задача: HTML
gulp.task('html', function () {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true })) // Минификация HTML
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
});

// Задача: изображения
gulp.task('images', function () {
  return gulp.src(paths.images.src, { encoding: false })
    .pipe(imagemin()) // Оптимизация изображений
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
});

// Задача: иконки
gulp.task('icons', function () {
  return gulp.src(paths.icons.src)
    .pipe(imagemin()) // Оптимизация иконок
    .pipe(gulp.dest(paths.icons.dest))
    .pipe(browserSync.stream());
});

// Сервер и отслеживание изменений
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "docs" // Настроим сервер для папки docs
    }
  });

  gulp.watch(paths.styles.src, gulp.series('styles')); // Отслеживание SCSS
  gulp.watch(paths.scripts.src, gulp.series('scripts')); // Отслеживание JS
  gulp.watch(paths.html.src, gulp.series('html')); // Отслеживание HTML
  gulp.watch(paths.images.src, gulp.series('images')); // Отслеживание изображений
  gulp.watch(paths.icons.src, gulp.series('icons')); // Отслеживание иконок
});

// Задача: билд
gulp.task('build', gulp.series(
  gulp.parallel('styles', 'scripts', 'html', 'images', 'icons')
));

// Задача по умолчанию
gulp.task('default', gulp.series(
  'build', // Сначала собираем проект
  'serve'  // Затем запускаем сервер и отслеживаем изменения
));
