var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');
var crypto = require('crypto');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');

var cssSource = 'src/css/out/';
var jsSource = 'src/js/out/';
var htmlSource = 'src/html/';
var cssDist = 'dist/css/';
var jsDist = 'dist/js/';
var htmlDist = 'dist/html/';

function randomValueHex(len) {
  return crypto.randomBytes(Math.ceil(len / 2))
      .toString('hex') // convert to hexadecimal format
      .slice(0, len);   // return required number of characters
}

var file = process.argv.slice(3)[0];
var v = randomValueHex(7);  // value 'ad0fc8c'
var folder;
var _split;
var outFile;

console.log('************** ' + file + '  ************');

if (file.indexOf('_')!= -1) {
  _split = file.split('_');
  file = _split[1];
  folder = _split[0];

  cssSource += folder + '/';
  jsSource += folder + '/';
  htmlSource += folder + '/';

  outFile = folder + '-' + file;
  htmlDist +=  folder +'/';
  console.log(htmlDist);
}
else {
  folder = file;
  outFile = file;
}

gulp.task('clean:css', function() {
  return gulp.src(cssDist + '**.' + outFile + '.min.css', { read: false }) // much faster
    .pipe(rimraf());
});

gulp.task('clean:js', function() {
  return gulp.src(jsDist + '**.' + outFile + '.min.js', { read: false }) // much faster
    .pipe(rimraf());
});

gulp.task('minify-css', function() {
  return gulp.src(cssSource + file + '.css')
    .pipe(minifyCss())
    .pipe(rename(v + '.' + outFile + '.min.css'))
    .pipe(gulp.dest(cssDist));
});

gulp.task('minify-js', function() {
  return gulp.src(jsSource + file + '.js')
    .pipe(uglify())
    .pipe(rename(v + '.' + outFile + '.min.js'))
    .pipe(gulp.dest(jsDist));
});

gulp.task('replace', function() {
  gulp.src(htmlSource + file + '.html')
    .pipe(htmlreplace({
      css: 'css/' + v + '.' + outFile + '.min.css',
      js: 'js/' + v + '.' + outFile + '.min.js',
    }))
    .pipe(gulp.dest(htmlDist));
});

gulp.task('default', ['clean:css','clean:js', 'minify-css','minify-js','replace']);
