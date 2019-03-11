const { dest, series, src, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const cache = require('gulp-cache');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');
const nunjucksRender = require('gulp-nunjucks-render');

const clean = () => del(['node_modules', 'build']);

const cleanBuild = () => del(['build']);

const nunjucks = (dev = true) => {
    dev && 
    watch(
        ['src/templates/**/*.nunjucks', 'src/pages/**/*.nunjucks'], 
        series(nunjucks, browserSync.reload)
    );  

    return src('src/pages/**/*.nunjucks')
    .pipe(nunjucksRender({
        path: ['src/templates']
    }))
    .pipe(dest('build'))
}

const img = (dev = true) => {
    dev && watch('src/img/**/*', series(img, browserSync.reload));

    return src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(dest('build/img'));
}

const font = (dev = true) => {
    dev && watch('src/font/**/*', series(font, browserSync.reload));
    
    return src('src/font/**/*')
        .pipe(dest('build/font'))
}

const lint = (dev = true) => {
    dev && watch('src/js/**/*.js', series(lint, browserSync.reload));

    return src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
}

const js = (dev = true) => {
    dev && watch('src/js/**/*.js', series(js, browserSync.reload));

    return src('src/js/**/*')
        .pipe(dest('build/js'))
}

const css = (dev = true) => {
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

const browserSyncInit = () => {
    browserSync.init({
        server: {
          baseDir: 'build'
        },
    });
}

const build = (done) => {
    nunjucks(false);
    img(false);
    font(false);
    lint(false);
    js(false);
    css(false);
    done();
}

exports.clean = clean;
exports.cleanBuild = cleanBuild;
exports.img = img;
exports.font = font;
exports.lint = lint;
exports.js = js;
exports.css = css;
exports.build = build;

exports.default = series(
    nunjucks,
    img,
    font,
    lint,
    js,
    css,
    browserSyncInit,
);
