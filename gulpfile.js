var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var concat = require('gulp-concat');  
var gulp = require('gulp');
var manifest = require('gulp-manifest');
var minifyCSS = require('gulp-minify-css');
var mocha = require('gulp-mocha');
var path = require('path');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

gulp.task('build', function() {  
    gulp.src(['app/src/app.js'])
        .pipe(browserify())
        .pipe(gulp.dest('build')) // This will output the non minified version
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('build')); // This will output the minified version

    gulp.src(['app/src/initializeWorker.js'])
        .pipe(browserify())
        .pipe(gulp.dest('build')) // This will output the non minified version
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('build')); // This will output the minified version

    gulp.src('./app/sass/sass/*.scss')
        .pipe(compass({
            config_file: './app/sass/config.rb',
            css: './app/sass/stylesheets',
            sass: './app/sass/sass',
            import_path: ['./bower_components/bootstrap-sass/assets/stylesheets']
        }))
        .pipe(gulp.dest('build')) // This will output the non minified version    
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('build')); // This will output the minified version    

    gulp.src(['build/**/*'])
        .pipe(manifest({
            hash: true,
            preferOnline: true,
            network: ['http://*', 'https://*', '*'],
            filename: 'app.manifest',
            exclude: 'app.manifest'
        }))
        .pipe(gulp.dest('build'));    
});

gulp.task('default', function() {
    // gulp.src('app')
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            open: 'index.html'
        }));
});

gulp.task('test', function () {
    gulp.run('test-single');
    
    gulp.watch('app/src/**', function(event) {
        gulp.run('test-single');
    });
});

gulp.task('test-single', function () {
    return gulp.src('app/src/**/*Test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});
