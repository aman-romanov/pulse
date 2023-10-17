const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass') (require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('live-server', function() {
    browserSync.init({
        browser: ["google chrome"],
        server: {
            baseDir: "src"
        }
    });
});

gulp.task ('sass-compiler', function () {
    return gulp.src("src/sass/*.+(sass|scss)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
            }))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('src/css'))
            .pipe (browserSync.stream());
});

gulp.task ('watch', function() {
    gulp.watch("src/sass/**/*.+(sass|scss)", gulp.parallel('sass-compiler'))
    gulp.watch("src/*.html").on("change", browserSync.reload);
    gulp.watch("src/js/*.js").on("change", browserSync.reload);
});

gulp.task ('default',gulp.parallel('watch', 'live-server', 'sass-compiler'));