const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); 
const sourcemaps = require('gulp-sourcemaps');   
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');

const paths = {
  styles: {
    vendors: [
      './assets/css/bootstrap.min.css',
      './assets/css/animate.min.css',
      './assets/css/font-awesome.min.css',
      './assets/css/pe-icon-7-stroke.css',
      './assets/css/magnific-popup.css',
      './assets/css/slick.css',
      './assets/css/meanmenu.min.css',
      './assets/css/default.css',
      './assets/css/style.css'
    ],
    src: './assets/css/template_style.scss', 
    watch: './assets/css/**/*.{scss,css}',      
    dest: './assets/dist/'
  },
scripts: {
    src: [
      // 1. BASE: Força a entrada do jQuery e Modernizr (Coringas no nome)
      'assets/js/vendor/jquery*.js', 
      'assets/js/vendor/modernizr*.js',

      // 2. DEPENDÊNCIAS: Popper e Bootstrap
      'assets/js/popper*.js',
      'assets/js/bootstrap*.js',

      // 3. PLUGINS: Todos os plugins do template
      'assets/js/slick*.js',
      'assets/js/isotope*.js',
      'assets/js/jquery.magnific-popup*.js',
      'assets/js/jquery.inview*.js',
      'assets/js/jquery.countTo*.js',
      'assets/js/jquery.easypiechart*.js',
      'assets/js/jquery.meanmenu*.js',

      // 4. LÓGICA DO TEMA: Seus arquivos finais
      'assets/js/main.js',
      'assets/js/template_sctipt.js', 

      // 5. EXCLUSÕES INTELIGENTES
      '!assets/js/vendor/jquery-migrate*', 
      '!assets/dist/**'
    ],
    dest: 'assets/dist/'
  }
};

function buildCss() {
  return gulp.src([...paths.styles.vendors, paths.styles.src])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS({ level: 2, compatibility: 'ie8' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  // Nota: allowEmpty: true ajuda a não quebrar se um plugin opcional sumir
  return gulp.src(paths.scripts.src, { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify().on('error', function (err) {
        console.error('Erro no JS:', err.toString());
        this.emit('end');
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function watchFiles() {
  gulp.watch(paths.styles.watch, buildCss);
  // Observa mudanças em qualquer JS para refazer o bundle
  gulp.watch(['assets/js/**/*.js', '!assets/dist/**'], scripts);
}

exports.buildCss = buildCss;
exports.scripts = scripts;

const build = gulp.series(gulp.parallel(buildCss, scripts), watchFiles);
exports.default = build;