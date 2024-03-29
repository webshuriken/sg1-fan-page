import prettier from "gulp-prettier";
import pkg from "gulp";
import sourcemaps from "gulp-sourcemaps";
import replace from 'gulp-replace';
import imagemin from "gulp-imagemin";
// css
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
// js
import eslint from "gulp-eslint-new";
import terser from "gulp-terser";

const { series, parallel, src, dest } = pkg;

// make sure js uses single quotes sprinkle with eslint and js use double space
export default function clean() {
  return src("app/js/*.js")
    .pipe(prettier({ singleQuotes: true }))
    .pipe(dest((file) => file.base))
}

// lint the js file
function validate () {
  return src("app/js/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

// update css and js folder locations
function html() {
  return src("index.html")
    .pipe(replace("app/js/main.js", "js/main.js"))
    .pipe(replace("app/css/styles.css", "css/styles.css"))
    .pipe(dest("dist/"))
}

// improve browser support and minify
function css() {
  return src("app/css/styles.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/css"))
}

// lets take terser and minify the js
function javascript() {
  return src("app/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/js"))
}

// minify images used on the site
function minifyImages() {
  return src("images/*.webp")
    .pipe(dest("dist/images"))
    .pipe(src(["images/*", "!images/*.webp", "!images/screenshot"]))
    .pipe(imagemin())
    .pipe(dest("dist/images"))
}

// build the site
export const build = parallel(series(clean, validate, css, javascript, html), minifyImages);
