var browserify = require('browserify');
var compass = require('gulp-compass');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var reactify = require('reactify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var webserver = require('gulp-webserver');

// The task that handles both development and deployment
var runBrowserifyTask = function (options) {

    // We create one bundle for our dependencies,
    // which in this case is only react
    var vendorBundler = browserify({
	debug: true // We also add sourcemapping
    }).require('react')
            .require('react-dom');

    // This bundle is for our application
    var bundler = browserify({
        debug: true, // Need that sourcemapping

        // These options are just for Watchify
        cache: {}, packageCache: {}, fullPaths: true
    }).require(require.resolve('./app/js/app.js'), { entry: true })
            // .transform(reactify) // Transform JSX 
            .transform(babelify) // Transform JSX 
            .external('react') // Do not include react
            .external('react-dom'); // Do not include react-dom

    // The actual rebundle process
    var rebundle = function() {
        var start = Date.now();
        bundler.bundle()
            .pipe(source('app.js'))
            .pipe(gulpif(options.uglify, streamify(uglify())))
            .pipe(gulp.dest(options.dest))
            .pipe(notify(function () {
        	console.log('Built in ' + (Date.now() - start) + 'ms');
            }));
    };

    // Fire up Watchify when developing
    if (options.watch) {
        bundler = watchify(bundler);
        bundler.on('update', rebundle);
    }

    // Run the vendor bundle when the default Gulp task starts
    vendorBundler.bundle()
	.pipe(source('vendors.js'))
	.pipe(streamify(uglify()))
	.pipe(gulp.dest(options.dest));

    return rebundle();
};

gulp.task('default', function () {

    runBrowserifyTask({
	watch: true,
	dest: 'build/',
	uglify: false
    });

});

gulp.task('deploy', function () {

    runBrowserifyTask({
	watch: false,
	dest: 'dist/',
	uglify: true
    });

});

gulp.task('server', ['resources', 'sass'], function() {
    gulp.src('build/')
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: true,
            open: 'index.html'
        }));
});

gulp.task('resources', function() {
    return gulp.src(['app/img/*', 'app/favicon.ico', 'app/index.html', 'app/WEB-INF/*'], {base: "app"})
        .pipe(gulp.dest('build/'));
});

gulp.task('sass', function() {
    return gulp.src('./app/sass/sass/*.scss')
        .pipe(compass({
            config_file: './app/sass/config.rb',
            css: './app/sass/stylesheets',
            sass: './app/sass/sass'
        }))
        .pipe(gulp.dest('build/')); // This will output the non minified version    
        // .pipe(minifyCSS())
        // .pipe(rename({ extname: '.min.css' }))
        // .pipe(gulp.dest(buildDir)); // This will output the minified version
});
