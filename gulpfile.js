//chamar os pluguins

const { src, dest, series, parallel, watch } = require('gulp');

const sass = require('gulp-sass') (require('sass'));
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const dart = require('gulp-dart');
const dartSass = require('gulp-dart-sass');

//funçao para compilar o sass

function buildStyles() {
    return  src ('src/styles/**/*.scss')
    .pipe(dartSass({outputStyle: 'compressed'}).on('error', dartSass.logError))
    .pipe(dest('dist/styles'));
}

//funçao para juntar os arquivos js

function buildScripts(){
    return src('src/scripts/**/*.js')
    .pipe(dest('dist/scripts'));
}
//funçao para otmizar as imagens

function optimizarImagens(){
    return src ('src/images/**/*', {encoding: false})
    .pipe(imagemin())
    .pipe(dest('dist/images'));
}

// Tarefa para monitorar alterações nos arquivos
function watchFiles() {
    watch('src/styles/**/*.scss', buildStyles);
    watch('src/scripts/**/*.js', buildScripts);
    watch('src/images/**/*', optimizarImagens);
  }
 //tarefa para construir os quivos de produçao somente uma vez
 const build = parallel(buildStyles, buildScripts, optimizarImagens);
 //exportar tarefas  individuais

 exports.styles = buildStyles;
 exports.scripts = buildScripts;
 exports.images = optimizarImagens;
 exports.watch = watchFiles;
 exports.build = build;

 //tarefa padrao
 exports.default = series(
    parallel(buildStyles, buildScripts, optimizarImagens),
    watchFiles
  );
  