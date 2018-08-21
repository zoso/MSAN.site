const gulp = require('gulp');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const noop = require('gulp-noop');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();

const config = {
    srcCss: './Styles/sass/scaffold.scss',
    buildCss: './Dist/css',
    srcJs: './Scripts/app.js',
    buildJs: './Dist/Js',
    debug: true
};

/**
 * Function used for building Vue-applications
 *
 * @param entries The main source for the Vue-application.
 * @param pipeSource The name of the compiled file in the /Dist-folder
 */
function vueBuild(entries, pipeSource) {
    const b = browserify({
        entries: entries,
        debug: config.debug,
        transform: [["babelify", {"presets": ["env"]}], "vueify"]
    });
    //b.external(vendors);

    b.bundle()
        .pipe(source(pipeSource))
        .pipe(buffer())
        .pipe(!config.debug ? uglify() : noop())
        .pipe(!config.debug ? sourcemaps.init({loadMaps: true}) : noop())
        .pipe(!config.debug ? sourcemaps.write('./maps') : noop())
        .pipe(gulp.dest(config.buildJs));
        //.pipe(livereload());
}

/**
 * Task for building 'MFMAdmin'.
 */
gulp.task('build:server', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./Styles/sass/**/*.scss', ['build:css']);
    gulp.watch('./Scripts/MFMAdmin/**/*.*', ['build:mfmadmin.js']);
});

gulp.task('reload', () => {
    browserSync.reload();
});

gulp.task('build:mfmadmin.js', ["build:css", "reload"], () => {
    vueBuild('./Scripts/MFMAdmin/app.js', 'mfmadmin.js');
});

gulp.task('build:css', ["reload"], () => {
    return gulp.src(config.srcCss)
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({grid: true}))
        .pipe(cleanCSS({compatibillity: 'ie8'}))
        .pipe(gulp.dest(config.buildCss));
});

gulp.task('all:watch', ['build:server'], () => {
    
});