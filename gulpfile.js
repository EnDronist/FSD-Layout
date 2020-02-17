'use strict';
// Gulp
var gulp = require('gulp');
// Gulp plugins
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var consolidate = require('gulp-consolidate');

sass.compiler = require('sass');

// Compiling SASS(scss) into CSS
gulp.task('sass', function() {
    return gulp.src(['./**/*.scss', '!./node_modules/**']) // Get source files
        .pipe(sass()) // Compiles with sass
        .pipe(gulp.dest('.')); // Outputs the file in the destination folder
});

// Consolidating EJS into HTML
gulp.task('ejs', function() {
    return gulp.src('./*/index.ejs') // Get source file
        .pipe(consolidate('ejs')) // Compiles with ejs
        .pipe(rename(path => ({
            dirname: path.dirname,
            basename: path.basename,
            extname: '.html',
        })))
        .pipe(gulp.dest(file => file.base)); // Outputs the file in the destination folder
})

// Compiling with watch mode
gulp.task('watch', function() {
    gulp.watch(['./**/*.scss', '!./node_modules/**'], gulp.series('sass'));
    gulp.watch(['./**/*.ejs', '!./node_modules/**'], gulp.series('ejs'));
});