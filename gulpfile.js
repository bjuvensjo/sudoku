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

gulp.task('build', function() {  
    gulp.src(['app/js/app.js'])
        .pipe(browserify())
//        .pipe(gulp.dest('build')) // This will output the non minified version
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('build')); // This will output the minified version

    gulp.src(['app/js/initializeWorker.js'])
        .pipe(browserify())
//        .pipe(gulp.dest('build')) // This will output the non minified version
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
//        .pipe(gulp.dest('build')) // This will output the non minified version    
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('build')); // This will output the minified version

    gulp.src(['app/img/*', 'app/favicon.ico'], {base: "app"})
        .pipe(gulp.dest('build'));

    gulp.src(['app/index.html'], {base: "app"})
        .pipe(gulp.dest('build'));
    
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

// gulp.task('watch', function() {
//     console.log('#######');
//     gulp.src('app/**/*.js')
//         .pipe(watch('app/**/*.js'));
// });

// gulp.task('default', ['watch'], function() {
gulp.task('default', ['build'], function() {
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            open: 'index.html'
        }));
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
