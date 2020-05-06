var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  uglifyjs = require("gulp-uglifyjs"),
  cssnano = require("gulp-cssnano"),
  rename = require("gulp-rename"),
  autoprefixer = require("gulp-autoprefixer"),
  del = require("del"),
  iconfont = require("gulp-iconfont"),
  iconfontCss = require("gulp-iconfont-css");

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task("clean", function () {
  return del.sync("dist");
});

gulp.task("sass", function () {
  return gulp
    .src("app/sass/style.scss")
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ["last 2 versions"] }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task(
  "css",
  gulp.series("sass", function () {
    return gulp
      .src("app/css/style.css")
      .pipe(cssnano())
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest("app/css"));
  })
);

gulp.task("js", function () {
  return gulp
    .src(["app/js/libs/slick.js", "app/js/libs/wow.js"])
    .pipe(concat("libs.min.js"))
    .pipe(uglifyjs())
    .pipe(gulp.dest("app/js"));
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app",
    },
  });
  gulp.watch("app/sass/**/*.scss", gulp.series("sass", reload));
  gulp.watch("app/*.html").on("change", browserSync.reload);
  gulp.watch("app/js/**/*.js").on("change", browserSync.reload);
});

gulp.task(
  "watch",
  gulp.series("browser-sync", function () {
    gulp.watch("app/sass/**/*.scss");
    gulp.watch("app/*.html");
    gulp.watch("app/js/**/*.js");
  })
);

// icon fonts
var fontName = "icons";

// add svg icons to the folder "icons" and use 'iconfont' task for generating icon font
gulp.task("iconfont", async () => {
  // где лежат наши иконки
  gulp
    .src("app/icons/*.svg")
    .pipe(
      iconfontCss({
        // где будет наш scss файл
        targetPath: "../sass/base/_font.scss",
        // пути подлючения шрифтов см. в _icons.scss
        fontPath: "../../iconfonts/",
        fontName: fontName,
      })
    )
    .pipe(
      iconfont({
        fontName: fontName,
        formats: ["svg", "ttf", "eot", "woff", "woff2"],
        normalize: true,
        fontHeight: 1001,
      })
    )
    // куда выбрасываем нашу папку с шрифтами
    .pipe(gulp.dest("app/iconfonts"));
});

gulp.task(
  "build",
  gulp.series("clean", function () {
    var buildHtml = gulp.src("app/*.html").pipe(gulp.dest("dist"));

    var buildCss = gulp
      .src(["!app/css/libs.css", "app/css/**/*.css"])
      .pipe(gulp.dest("dist/css"));

    var buildJs = gulp.src("app/js/**/*.js").pipe(gulp.dest("dist/js"));

    var buildFonts = gulp.src("app/fonts/**/*").pipe(gulp.dest("dist/fonts"));
  })
);
