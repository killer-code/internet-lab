const gulp         = require('gulp'),
      stylus       = require('gulp-stylus'),
      pug          = require('gulp-pug'),
      minifyCSS    = require('gulp-minify-css'),
      uglifyJS     = require('gulp-uglify-es'),
      autoprefixer = require('gulp-autoprefixer'),
      rename       = require('gulp-rename'),
      browserSync  = require('browser-sync'),
      reload       = browserSync.reload;

const paths = {
  styl: ['src/styles/style.styl'],
  pug : ['src/templates/index.pug'],
  js  : ['src/scripts/main.js'],
  mods: ['src/scripts/modules/*.js']
};

gulp.task('autoReload', () => {
  browserSync({
    server: {
      baseDir: "./"
    },
    port: 3030,
    open: true,
    notify: false
  });
});

gulp.task('compilStyl', () => {
  return gulp.src(paths.styl)
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/dist'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('compilPug', () => {
  return gulp.src(paths.pug)
    .pipe(pug())
    .pipe(gulp.dest('./'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('modulesJS', () => {
  return gulp.src(paths.mods)
    .pipe(uglifyJS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/scripts/modules'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('watch', () => {
  gulp.watch(paths.styl, gulp.series('compilStyl'));
  gulp.watch(paths.pug, gulp.series('compilPug'));
  // gulp.watch(paths.js, gulp.series('js'));
});

gulp.task('default', gulp.parallel('watch', 'autoReload'));
