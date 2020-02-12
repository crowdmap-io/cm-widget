
var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var cssToJs = require('gulp-css-to-js');
var uglify = require('gulp-uglify');
const closureCompiler = require('google-closure-compiler').gulp();
var concat = require('gulp-concat');
var clean = require('gulp-clean');

gulp.task('cssmin', function(done) {
    
    gulp.src('src/indy.css')
        .pipe(cssmin()) 
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('.tmp')) // 1. CSSMIN
        .pipe(cssToJs())
        .pipe(rename(function(path) {
            path.extname = '.js'
        }))
        .pipe(gulp.dest('.tmp')) // 2. CSS TO JS
    
    done();
})

// 3. Uglify JS
gulp.task('uglify', function (done) {
    gulp.src('src/indy.js')
        .pipe(uglify())
        .pipe(gulp.dest('./.tmp'));
          
          
        done();
  });

gulp.task('closure', function(done) {
    return gulp.src('./src/*.js', {base: './'})
      // your other steps here
      .pipe(closureCompiler({
          compilationLevel: 'SIMPLE',
          warningLevel: 'VERBOSE',
          outputWrapper: '(function(){\n%output%\n}).call(this)',
          jsOutputFile: 'output.min.js',  // outputs single file
          createSourceMap: true,
        }))
      .pipe(gulp.dest('./.tmp'));
})

// 4. CONCAT
gulp.task('concat', function() {
    return gulp.src('./.tmp/**/*.js')
      .pipe(concat('cm-widget.min.js'))
      .pipe(gulp.dest('./dist'));
  });

// 5. CLEAN
gulp.task('clean', function () {
    return gulp.src('./.tmp', {read: false})
        .pipe(clean());
});

gulp.task('build', gulp.series('cssmin','uglify','closure', 'concat','clean'))