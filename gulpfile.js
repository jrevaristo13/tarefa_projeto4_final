// Chamar os plugins
const { src, dest, series, parallel, watch } = require('gulp');
const dartSass = require('gulp-dart-sass');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

// Função para compilar o Sass -> CSS comprimido em public/css
function buildStyles() {
    return src('src/styles/**/*.scss')
        .pipe(dartSass({ outputStyle: 'compressed' }).on('error', dartSass.logError))
        .pipe(dest('public/css'));
}

// Função para juntar/copiar os arquivos JS -> public/js
function buildScripts() {
    return src('src/scripts/**/*.js')
        .pipe(concat('main.js')) // opcional: junta tudo em um só
        .pipe(dest('public/js'));
}

// Função para copiar os arquivos HTML para a pasta public
function copyHtml() {
    return src('src/html/**/*.html')
        .pipe(dest('public'));
}

// Função para otimizar as imagens -> public/images
function optimizeImages() {
    return src('src/images/**/*', { encoding: false })
        .pipe(imagemin())
        .pipe(dest('public/images'));
}

// Tarefa para monitorar alterações nos arquivos
function watchFiles() {
    watch('src/styles/**/*.scss', buildStyles);
    watch('src/scripts/**/*.js', buildScripts);
    watch('src/images/**/*', optimizeImages);
}

// Tarefa para construir todos os arquivos uma vez
const build = parallel(buildStyles, buildScripts, optimizeImages, copyHtml);

// Exportar tarefas individuais
exports.buildStyles = buildStyles;
exports.buildScripts = buildScripts;
exports.optimizeImages = optimizeImages;
exports.copyHtml = copyHtml; // <--- Não esqueça de exportar
exports.watch = watchFiles;
exports.build = build;

// Tarefa padrão (roda build completo e fica observando mudanças)
exports.default = series(build, watchFiles);

  