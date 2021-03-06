var gulp = require('gulp');
var gutil = require('gulp-util');
//create *.js.map file
var sourcemaps = require('gulp-sourcemaps');
//slam multiple *.js files together
var concat = require('gulp-concat');
//shrink code to be smaller for compy
var uglify = require('gulp-uglify');

gulp.task('default',['jsFiles'],
  function() {
  gutil.log('Gulp Complete!');

});



gulp.task('jsFiles', function() {
 return gulp.src('./client/javascripts/*.js')
 .pipe(sourcemaps.init())
 .pipe(concat('app.min.js'))
 .pipe(uglify())
 .pipe(sourcemaps.write())
 .pipe(gulp.dest('./public/js'));

});




