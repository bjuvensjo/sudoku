var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var concat = require('gulp-concat');  
var gulp = require('gulp');
var manifest = require('gulp-manifest');
var minifyCSS = require('gulp-minify-css');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var zip = require('gulp-zip');

var dest = 'build';

gulp.task('build', ['manifest'], function() {
    // return gulp.run('manifest');
});

// gulp.task('watch', function() {
//     console.log('#######');
//     gulp.src('app/**/*.js')
//         .pipe(watch('app/**/*.js'));
// });

// gulp.task('default', ['watch'], function() {
gulp.task('default', ['build'], function() {
    return gulp.src(dest)
        .pipe(webserver({
            livereload: true,
            open: 'index.html'
        }));
});

gulp.task('dist', ['build'], function () {
    return gulp.src('build/**/*')
        .pipe(zip('sudoku.war'))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    return gulp.src(['app/js/app.js'])
        .pipe(browserify())
    //        .pipe(gulp.dest('build')) // This will output the non minified version
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(dest)); // This will output the minified version
});

gulp.task('js-worker', function() {
    return gulp.src(['app/js/initializeWorker.js'])
        .pipe(browserify())
    //        .pipe(gulp.dest(dest)) // This will output the non minified version
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(dest)); // This will output the minified version    
});

gulp.task('manifest', ['js', 'js-worker', 'resources', 'sass'], function() {
    return gulp.src(['build/**/*'])
        .pipe(manifest({
            hash: true,
            preferOnline: true,
            network: ['http://*', 'https://*', '*'],
            filename: 'app.manifest',
            exclude: 'app.manifest'
        }))
        .pipe(gulp.dest(dest));    
});

gulp.task('resources', function() {
    return gulp.src(['app/img/*', 'app/favicon.ico', 'app/index.html', 'app/WEB-INF/*'], {base: "app"})
        .pipe(gulp.dest(dest));
});

gulp.task('sass', function() {
    return gulp.src('./app/sass/sass/*.scss')
        .pipe(compass({
            config_file: './app/sass/config.rb',
            css: './app/sass/stylesheets',
            sass: './app/sass/sass',
            import_path: ['./bower_components/bootstrap-sass/assets/stylesheets']
        }))
    //        .pipe(gulp.dest(dest)) // This will output the non minified version    
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(dest)); // This will output the minified version
});

gulp.task('test', function () {
    gulp.run('test-single');
    
    gulp.watch('app/js/**', function(event) {
        gulp.run('test-single');
    });
});

gulp.task('test-single', function () {
    return gulp.src('app/js/**/*Test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});
