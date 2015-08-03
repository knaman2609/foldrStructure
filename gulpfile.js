var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');
var crypto = require('crypto');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');

var cssSource = 'src/css/out/';
var jsSource = 'src/js/out/';
var htmlSource = 'html/';
var cssDist = 'dist/css/';
var jsDist = 'dist/js/';

function randomValueHex(len) {
  return crypto.randomBytes(Math.ceil(len / 2))
      .toString('hex') // convert to hexadecimal format
      .slice(0, len);   // return required number of characters
}

var file = process.argv.slice(3)[0];
var v = randomValueHex(7);  // value 'ad0fc8c'
console.log('************** ' + file + '  ************');

gulp.task('clean:css', function() {
  return gulp.src(cssDist + '**.' + file + '.min.css', { read: false }) // much faster
    .pipe(rimraf());
});

gulp.task('clean:js', function() {
  return gulp.src(jsDist + '**.' + file + '.min.js', { read: false }) // much faster
    .pipe(rimraf());
});

gulp.task('minify-css', function() {
  return gulp.src(cssSource + file + '.css')
    .pipe(minifyCss())
    .pipe(rename(v + '.' + file + '.min.css'))
    .pipe(gulp.dest(cssDist));
});

gulp.task('minify-js', function() {
  return gulp.src(jsSource + file + '.js')
    .pipe(uglify())
    .pipe(rename(v + '.' + file + '.min.js'))
    .pipe(gulp.dest(jsDist));
});

gulp.task('replace', function() {
  gulp.src(htmlSource + file + '.html')
    .pipe(htmlreplace({
      css: 'css/' + v + '.' + file + '.min.css',
      js: 'js/' + v + '.' + file + '.min.js',
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['clean:css','clean:js', 'minify-css','minify-js','replace']);
