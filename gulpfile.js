var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('gulp-webpack');
var webpack_config = require('./webpack.config');

gulp.task('lint', function() {

    return gulp.src(['client/**/*.js', 'client/**/*.jsx', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('webpack', function() {
  return gulp.src('./client/index.jsx')
    .pipe(webpack(webpack_config))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['lint', 'webpack']);
