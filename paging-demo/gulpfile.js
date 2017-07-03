var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');
// var browserify = require('browserify');
// var babelify = require('babelify');

// var source = require('vinyl-source-stream');
// var buffer = require('vinyl-buffer');

var DIST_WEB = './dist';

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
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/build'));
    // return browserify({ entries: './public/reactjs/home.jsx', debug: true })
    //     .transform(babelify, { presets: ['es2015', 'react'] })
    //     .bundle()
    //     .on('error', function (err) {
    //         console.error(err);
    //         this.emit('end');
    //     })
    //     .pipe(source('main.js'))
    //     .pipe(buffer())
    //     .pipe(sourcemaps.init({ loadMaps: true }))
    //     // .pipe(sourcemaps.write('./'))
    //     .pipe(gulp.dest('./public/scripts/'));
});

gulp.task('eslint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src([
            './server/**/*.js',
            './public/**/*.jsx',
            '!node_modules/**',
            '!public/bower_components/**'
        ])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('watch', function () {
    gulp.watch('./public/reactjs/*.jsx', ['build-script']);
});


gulp.task('copy', function () {
    gulp.src('./server/**/*.*')
        .pipe(gulp.dest(DIST_WEB + '/server'));

    gulp.src('./public/**/*.*')
        .pipe(gulp.dest(DIST_WEB + '/public'));

    gulp.src('./package.json')
        .pipe(gulp.dest(DIST_WEB));

    gulp.src('./server.js')
        .pipe(gulp.dest(DIST_WEB));

});

gulp.task('build', function (done) {
    runSequence(
        ['build-script'], ['copy'],
        done);
});

gulp.task('default', ['build']);