var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');

var date = new Date();

gulp.task('css', function (){
  return gulp.src('./sass/style.sass')
  .pipe(sass.sync({
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(gulp.dest('./css'))
})

gulp.task('views', function () {
  return gulp.src('views/*.pug')
  .pipe(pug({
    locals:{
      currentyear:date.getUTCFullYear()
    }
  }))
  .pipe(gulp.dest('./'))
});

gulp.task('watch-pug', function(){
  gulp.watch('views/*.pug', gulp.series('views'));
})

gulp.task('watch-css', function(){
  gulp.watch('./sass/*.sass', gulp.series('css'));
})

gulp.task('default', gulp.series('css', 'views', 'watch-pug', 'watch-css'));

