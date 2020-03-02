'use strict';
// Gulp
var gulp = require('gulp');
// Gulp plugins
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var consolidate = require('gulp-consolidate');
// Misc
var EjsRoute = require('./ejs-route');
var path = require('path');
var colors = require('colors');

// Settings
sass.compiler = require('sass');

// Compiling SASS(scss) into CSS
gulp.task('sass', done => (
    // Gets source files
    gulp.src(['./*/index.scss', '!./node_modules/**'])
        // Compiles with sass
        .pipe(sass().on('error', sass.logError))
        // Outputs the file in the destination folder
        .pipe(gulp.dest('.'))
));

// Consolidating EJS into HTML
gulp.task('ejs', done => (
    // Gets source file
    gulp.src('./*/index.ejs')
        // Compiles with ejs
        .pipe(
            consolidate('ejs', {
                path,
                root: __dirname,
                EjsRoute,
            })
            .on('error', done)
        )
        // Renames files from '.ejs' to '.html'
        .pipe(rename(path => ({
            dirname: path.dirname,
            basename: path.basename,
            extname: '.html',
        })))
        // Outputs the file in the destination folder
        .pipe(gulp.dest(file => file.base))
));

// Compiling with watch mode
gulp.task('watch', () => {
    // Watching sass
    gulp.watch(['./**/*.scss', '!./node_modules/**'], gulp.series('sass'));
    // Watching ejs
    gulp.watch(['./**/*.ejs', '!./node_modules/**'], gulp.series('ejs'));
    console.log('Watching started');
});