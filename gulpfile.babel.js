const { dest, series, src, watch } = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const useref = require('gulp-useref');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const nunjucksRender = require('gulp-nunjucks-render');

function clean() {
    return del([
        'node_modules',
        'dist',
        'src/js/modules/*',
        'src/pages/**/*.html'
    ]);
}

function cleanDist() {
    return del([
        'dist',
    ]);
}

function nunjucks() {
    watch(
        ['src/templates/**/*.nunjucks', 'src/pages/**/*.nunjucks'], 
        series(nunjucks, build, browserSync.reload)
    );  

    return src('src/pages/**/*.nunjucks')
    .pipe(nunjucksRender({
        path: ['src/templates']
    }))
    .pipe(dest('src/pages'))
}

function build() {
    return src('src/pages/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(dest('dist'));
}

function img() {
    return src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(dest('dist/img'));
}

function fonts() {
    return src('src/font/**/*')
        .pipe(dest('dist/font'))
}

function lint() {
    watch('src/js/**/*.js', series(lint, build, browserSync.reload));

    return src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
}

function css() {
    watch('src/css/**/*.css', series(css, browserSync.reload));

    return src([
        'src/css/settings/**/*.css',
        'src/css/global/**/*.css',
        'src/css/elements/**/*.css',
        'src/css/objects/**/*.css',
        'src/css/components/**/*.css',
        'src/css/utilities/**/*.css'
    ])
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(dest('dist'));
}

function browserSyncInit() {
    browserSync.init({
        server: {
          baseDir: 'dist'
        },
    });
}

exports.default = series(
    series(nunjucks, build),
    img,
    fonts,
    lint,
    css,
    browserSyncInit
);

exports = {
    clean,
    cleanDist,
    img,
    fonts,
    lint,
    css,
}
