'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('sass');

// Sass compile
gulp.task('sass', function () {
    return gulp.src(['**/*.scss', '!node_modules/**']) // Get source files
      .pipe(sass()) // Sends it through a gulp plugin
      .pipe(gulp.dest('.')); // Outputs the file in the destination folder
});

// Sass compile with watch mode
gulp.task('sass:watch', function () {
    gulp.watch(['**/*.scss', '!node_modules/**'], gulp.series('sass'));
});