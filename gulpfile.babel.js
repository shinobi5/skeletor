// include gulp and gulp delete
var gulp = require('gulp'),
    del = require('del'),

    // include plugins
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat');
    cleanCSS = require('gulp-clean-css');
    nunjucksRender = require('gulp-nunjucks-render');

// clean
gulp.task('clean:all', () => {
    return del([
        'node_modules',
        'dist',
        'src/js/modules/*',
        'src/pages/**/*.html'
    ]);
});

// clean: remove dist folder
gulp.task('clean:dist', () => {
    return del([
        'dist'
    ]);
});

// browser sync: setup server
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
          baseDir: 'dist'
        },
    });
});

// lint: check js for errors
gulp.task('lint', () => {
    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// nunjucks
gulp.task('nunjucks', () => {

  // gets the .nunjucks files in the pages directory
  return gulp.src('src/pages/**/*.nunjucks')

  // renders templates with nunjucks
  .pipe(nunjucksRender({
      path: ['src/templates']
    }))

  // output files to the dist folder
  .pipe(gulp.dest('src/pages'))
});

// useref:build - concatenate, minify and place JS refs into HTML
gulp.task('useref:build', gulp.series('nunjucks', () => {
    return gulp.src('src/pages/*.html')
        .pipe(useref())

        // minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'));
}));

// useref:watch - concatenate, minify and place JS refs into HTML
gulp.task('useref:watch', gulp.series('nunjucks', () => {
    return gulp.src('src/pages/*.html')
        .pipe(useref())

        // minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'));
}));

// concat css files
gulp.task('css', () => {
    return gulp.src([
    'src/css/settings/**/*.css',
    'src/css/global/**/*.css',
    'src/css/elements/**/*.css',
    'src/css/objects/**/*.css',
    'src/css/components/**/*.css',
    'src/css/utilities/**/*.css'
    ])
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// img: optimise images
gulp.task('img', () => {
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')

        // caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});

// fonts: move font files from src to dist
gulp.task('fonts', () => {
    return gulp.src('src/font/**/*')
        .pipe(gulp.dest('dist/font'))
});

// watch: watch files For changes
// gulp.task('watch', gulp.series(['css', 'browserSync'], function() {
//     // gulp.watch('src/css/**/*.css', gulp.parallel('css', browserSyncReload));
//     gulp.watch('src/templates/**/*.nunjucks', gulp.series('useref:watch', browserSync.reload));
//     gulp.watch('src/pages/**/*.nunjucks', gulp.series('useref:watch', browserSync.reload));
//     gulp.watch('src/js/**/*.js', gulp.series('lint', 'useref:watch', browserSync.reload));
// }));

// gulp: default task
gulp.task('default', gulp.series('useref:build', 'img', 'fonts', 'lint', 'css', 'browserSync', 'watch'));
