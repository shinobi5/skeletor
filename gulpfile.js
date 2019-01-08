// include gulp and gulp delete
var gulp = require('gulp'),
    del = require('del'),

    // include plugins
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    nunjucksRender = require('gulp-nunjucks-render');


// clean
gulp.task('clean:all', function () {
    return del([
        'node_modules',
        'dist',
        'src/js/lib/*',
        'src/js/app/*',
        'src/pages/**/*.html'
    ]);
});

// clean: remove dist folder
gulp.task('clean:dist', function () {
    return del([
        'dist'
    ]);
});


// browser sync: setup server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
          baseDir: 'dist'
        },
    })
});


// lint: check js for errors
gulp.task('lint', function() {
    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// nunjucks
gulp.task('nunjucks', function() {

  // gets the .nunjucks files in the pages directory
  return gulp.src('src/pages/**/*.nunjucks')

  // renders templates with nunjucks
  .pipe(nunjucksRender({
      path: ['src/templates']
    }))

  // output files to the dist folder
  .pipe(gulp.dest('src/pages'))
});


// useref: concatenate, minify and place JS refs into HTML

// useref:build
gulp.task('useref:build', ['nunjucks'], function(){
    return gulp.src('src/pages/*.html')
        .pipe(useref())

        // minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'));
});

// useref:watch
gulp.task('useref:watch', ['nunjucks'], function(){
    return gulp.src('src/pages/*.html')
        .pipe(useref())

        // minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'));
});


// sass: compile sass
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


// img: optimise images
gulp.task('img', function(){
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')

        // caching images that ran through imagemin
        .pipe(cache(imagemin({
          interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});


// fonts: move font files from src to dist
gulp.task('fonts', function() {
    return gulp.src('src/font/**/*')
        .pipe(gulp.dest('dist/font'))
});


// watch: watch files For changes
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass'], browserSync.reload);
    gulp.watch('src/templates/**/*.nunjucks', ['useref:watch'], browserSync.reload);
    gulp.watch('src/pages/**/*.nunjucks', ['useref:watch'], browserSync.reload);
    gulp.watch('src/js/**/*.js', ['lint', 'useref:watch'], browserSync.reload);
});


// gulp: default task
gulp.task('default', ['browserSync', 'useref:build', 'img', 'fonts', 'lint', 'sass', 'watch']);
