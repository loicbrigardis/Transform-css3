var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var jade        = require('gulp-jade');
var reload      = browserSync.reload;

gulp.task('sass', function () {
  gulp.src('*.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('jade', function() {
  gulp.src('./*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', ['sass'], function () {
  browserSync.init({
    server: "./"
  });
});

gulp.task('watch', ['sass', 'jade', 'browser-sync'], function () {
  gulp.watch('*.sass', ['sass']);
  gulp.watch('*.jade', ['jade']);
  gulp.watch('css/*.css').on('change', browserSync.reload);
  gulp.watch('main.js').on('change', browserSync.reload);
});