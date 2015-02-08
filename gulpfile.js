var gulp = require('gulp');
var manifest = require('gulp-manifest');
var webserver = require('gulp-webserver');

gulp.task('default', function() {
    gulp.src('app')
        .pipe(webserver({
            livereload: true,
            open: 'index.html'
        }));
});

gulp.task('manifest', function(){
    // gulp.src(['build/*'])
    gulp.src(['app/src/**/*'])
        .pipe(manifest({
            hash: true,
            preferOnline: true,
            network: ['http://*', 'https://*', '*'],
            filename: 'app.manifest',
            exclude: 'app.manifest'
        }))
        .pipe(gulp.dest('build'));
});
