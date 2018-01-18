const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const minify = require('gulp-minify');

gulp.task('default', function () {
    gulp.src('./src/sass/notifications.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', function () {
    gulp.src('./src/js/notifications.js')
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            },
            mangle: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('prod', function () {
    gulp.src('./src/sass/notifications.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({
          basename: 'notifications.min'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
    gulp.watch('./src/sass/*.scss', ['default']);
    gulp.watch('./src/js/notifications.js', ['js']);
});