var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-ruby-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');

// Static Server + watching scss/html files
gulp.task('serve', ['autoprefix'], function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("./scss/*.scss", ['autoprefix']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return sass('./scss/*.scss', {
    style: 'expanded',
    lineNumbers: true
  })
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream());
});

gulp.task('autoprefix',['sass'], function () {
  var plugins = [
    autoprefixer({browsers: ['last 2 version', 'safari > 6', 'ie 11', 'opera 12.1', 'ios 6', 'android > 3','Firefox > 47']}),
  ];
  return gulp.src('./css/style.css')
  .pipe(postcss(plugins))
  .pipe(gulp.dest('./css/dist/'));
});


gulp.task('default', ['serve']);
