var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

// build all the JavaScript things
gulp.task('build-script', function () {
    var src = ['./public/reactjs/*.jsx', ];

    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                'es2015',
                'react'
            ]
        }))
        .pipe(gulp.dest('./public/build'));
});

gulp.task('watch', function () {
    gulp.watch('./public/reactjs/*.jsx', ['build-script']);
});