var gulp = require('gulp');
var gutil = require('gulp-util');
//create *.js.map file
var sourcemaps = require('gulp-sourcemaps');
//slam multiple *.js files together
var concat = require('gulp-concat');
//shrink code to be smaller for compy
var uglify = require('gulp-uglify');
var uglifyCss = require('gulp-minify-css');

gulp.task(
 return gulp.src('./client/javascripts/*.js')
 .pipe(sourcemaps.init())
 .pipe(concat('app.min.js'))
 .pipe(uglify())
 .pipe(sourcemaps.write())
 .pipe(gulp.dest('./public/javascripts'));
 function() {
  gutil.log('gulp moved to production')
  });