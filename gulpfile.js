var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var manifest = require('gulp-manifest');
var minifyCSS = require('gulp-minify-css');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var zip = require('gulp-zip');

var buildDir = 'build';
var distDir = 'dist';

gulp.task('build', ['manifest'], function() {

});

gulp.task('default', ['build', 'watch'], function() {
    gulp.src(buildDir)
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: true,
            open: 'index.html'
        }));
});

gulp.task('dist', ['build'], function () {
    gulp.src(['app/index.html'])
        .pipe(replace(/\x3C!-- *(\x3Chtml manifest[^-]+).*/, '$1'))
        .pipe(gulp.dest(distDir));
        
    return gulp.src(['build/**/*', '!build/index.html'])
    //     // .pipe(zip('sudoku.war'))
        .pipe(gulp.dest(distDir));
});

gulp.task('js', ['test-single', 'jshint'], function() {
    return gulp.src(['app/js/app.js'])
        .pipe(browserify())
        // .pipe(gulp.dest(buildDir)) // This will output the non minified version
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(buildDir)); // This will output the minified version
});

gulp.task('jshint', function() {
    return gulp.src(['app/js/**/*'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('js-worker', ['test-single', 'jshint'], function() {
    return gulp.src(['app/js/initializeWorker.js'])
        .pipe(browserify())
        // .pipe(gulp.dest(buildDir)) // This will output the non minified version
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(buildDir)); // This will output the minified version    
});

gulp.task('manifest', ['js', 'js-worker', 'resources', 'sass'], function() {
    return gulp.src(['build/**/*'])
        .pipe(manifest({
            hash: true,
            preferOnline: true,
            network: ['http://*', 'https://*', '*'],
            filename: 'app.manifest',
            exclude: ['app.manifest', 'WEB-INF/appengine-web.xml', 'WEB-INF/web.xml']
        }))
        .pipe(gulp.dest(buildDir));    
});

gulp.task('resources', function() {
    return gulp.src(['app/img/*', 'app/favicon.ico', 'app/index.html', 'app/WEB-INF/*'], {base: "app"})
        .pipe(gulp.dest(buildDir));
});

gulp.task('sass', function() {
    return gulp.src('./app/sass/sass/*.scss')
        .pipe(compass({
            config_file: './app/sass/config.rb',
            css: './app/sass/stylesheets',
            sass: './app/sass/sass'
        }))
    //        .pipe(gulp.dest(buildDir)) // This will output the non minified version    
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(buildDir)); // This will output the minified version
});

gulp.task('test', ['test-single'], function () {    
    gulp.watch('app/js/**', ['test-single']);
});

gulp.task('test-single', function () {
    return gulp.src('app/js/**/*Test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*', ['build']);
});
