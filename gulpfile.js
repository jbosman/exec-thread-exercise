const gulp =        require('gulp');
const babel =       require('gulp-babel');
const concat =      require('gulp-concat');
const liveReload =  require('gulp-livereload');
const notify =      require('gulp-notify');
const plumber =     require('gulp-plumber');
const rename =      require('gulp-rename');
const sass =        require('gulp-sass');
const sourcemaps =  require('gulp-sourcemaps');

const runSeq =      require('run-sequence');



gulp.task( 'reload', () => { liveReload.reload(); });
gulp.task( 'reloadCSS', () => gulp.src('./public/style.css').pipe(liveReload()) );

gulp.task( 'buildJS', () => {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});

gulp.task( 'buildCSS', () => {

    const sassCompilation = sass();
    sassCompilation.on('error', console.error.bind(console));

    return  gulp.src('./browser/scss/main.scss')
            .pipe(plumber({
                errorHandler: notify.onError('Sass processing failed. Check gulp process.')
            }))
            .pipe(sourcemaps.init())
            .pipe(sassCompilation)
            .pipe(sourcemaps.write())
            .pipe(rename('style.css'))
            .pipe(gulp.dest('./public'))

});

// Build Order
gulp.task('build', () => { runSeq(['buildJS', 'buildCSS']) });

gulp.task('default', () => {

	gulp.start('build');

    gulp.watch('browser/js/**',   () => { runSeq('buildJS', 'reload'); });
    gulp.watch('browser/scss/**', () => { runSeq('buildCSS', 'reloadCSS')});

	liveReload.listen();

});