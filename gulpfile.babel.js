const { dest, series, src, watch } = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const jshint = require('gulp-jshint');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const nunjucksRender = require('gulp-nunjucks-render');

function clean() {
    return del([
        'node_modules',
        'build',
    ]);
}

function cleanBuild() {
    return del([
        'build',
    ]);
}

function nunjucks(dev = true) {
    dev && watch(
        ['src/templates/**/*.nunjucks', 'src/pages/**/*.nunjucks'], 
        series(nunjucks, browserSync.reload)
    );  

    return src('src/pages/**/*.nunjucks')
    .pipe(nunjucksRender({
        path: ['src/templates']
    }))
    .pipe(dest('build'))
}

function img() {
    return src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(dest('build/img'));
}

function fonts() {
    return src('src/font/**/*')
        .pipe(dest('build/font'))
}

function lint(dev = true) {
    dev && watch('src/js/**/*.js', series(lint, browserSync.reload));

    return src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
}

function js(dev = true) {
    dev && watch('src/js/**/*.js', series(js, browserSync.reload));

    return src('src/js/**/*')
        .pipe(dest('build/js'))
}

function css(dev = true) {
    dev && watch('src/css/**/*.css', series(css, browserSync.reload));

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
    .pipe(dest('build'));
}

function browserSyncInit() {
    browserSync.init({
        server: {
          baseDir: 'build'
        },
    });
}

function build(done) {
    nunjucks(false);
    img(false);
    fonts(false);
    lint(false);
    js(false);
    css(false);
    done();
}

exports.clean = clean;
exports.cleanBuild = cleanBuild;
exports.img = img;
exports.fonts = fonts;
exports.lint = lint;
exports.js = js;
exports.css = css;
exports.build = build;

exports.default = series(
    nunjucks,
    img,
    fonts,
    lint,
    js,
    css,
    browserSyncInit,
);
