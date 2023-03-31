// Определяем переменную "preprocessor"
let preprocessor = 'scss'; // Выбор препроцессора в проекте - sass или less

// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require('gulp');
 
// Подключаем Browsersync
const browserSync = require('browser-sync').create();

// Подключаем gulp-concat
const concat = require('gulp-concat');
 
// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;

// Подключаем модули gulp-sass и gulp-less
const sass = require('gulp-sass')(require('sass'));
 
// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');
 
// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

// Подключаем compress-images для работы с изображениями
const imagecomp = require('compress-images');

 
// Подключаем модуль del
const del = require('del');

let project_folder = "build";
let source_folder = "src";
let portfolio = "portfolio";
let uber = "uber";
let timer = "timer";
let todo = "todo";
let meta = "meta";
let food = "food";


let path = {
	src: {
		html: source_folder + "/**/*.{html, htm}",
		pdf: source_folder + "/**/*.pdf",
		//fonts: {
			//uber: source_folder + "/fonts/uber/**/*",
			//meta: source_folder + "/fonts/meta/**/*",
		//},
		icons: {
			uber: source_folder + '/icons/uber/**/*',
			todo: source_folder + '/icons/todo/**/*',
			food: source_folder + '/icons/food/**/*',
		},
		/* includes: {
			header: source_folder + "/includes/header.html",
			footer: source_folder + "/includes/footer.html"
		}, */
		/*css: [source_folder + "/css/*.css", "!"+source_folder + "/css/*.min.css"], */
		js: {
			portfolio: source_folder + "/js/" + portfolio + ".js",
			uber: source_folder + "/js/" + uber + ".js",
			timer: source_folder + "/js/" + timer + ".js",
			todo: source_folder + "/js/" + todo + ".js",
			meta: source_folder + "/js/" + meta + ".js",
			food: source_folder + "/js/" + food + "/bundle.js"
		},
		img: {
			src: {
				portfolio: source_folder + "/img/" + source_folder + "/" + portfolio + "/",
				uber: source_folder + "/img/" + source_folder + "/" + uber + "/",
				meta: source_folder + "/img/" + source_folder + "/" + meta + "/",
				food: source_folder + "/img/" + source_folder + "/" + food + "/",
				/* timer: source_folder + "/img/" + source_folder + "/" + timer + "/",
				todo: source_folder + "/img/" + source_folder + "/" + todo + "/" */
			},
			build: {
				all: source_folder + "/img/" + project_folder + "/",
				portfolio: source_folder + "/img/" + project_folder + "/" + portfolio + "/",
				uber: source_folder + "/img/" + project_folder + "/" + uber + "/",
				meta: source_folder + "/img/" + project_folder + "/" + meta + "/",
				food: source_folder + "/img/" + project_folder + "/" + food + "/",
				/* timer: source_folder + "/img/" + project_folder + "/" + timer + "/",
				todo: source_folder + "/img/" + project_folder + "/" + todo + "/" */
			}
			
		},
		scss: {
			portfolio: source_folder + "/scss/" + portfolio + "/*.scss",
			uber: source_folder + "/scss/" + uber + "/*.scss",
			timer: source_folder + "/scss/" + timer + "/*.scss",
			todo: source_folder + "/scss/" + todo + "/*.scss",
			meta: source_folder + "/scss/" + meta + "/*.scss",
			food: source_folder + "/scss/" + food + "/*.scss"
		},
		min: {
			css: {
				/* portfolio: source_folder + "/css/" + portfolio + "/*.min.css", */
				uber: source_folder + "/css/" + uber + "/*.min.css",
				/* timer: source_folder + "/css/" + timer + "/*.min.css",
				todo: source_folder + "/css/" + todo + "/*.min.css" */
			},
			js: {
				portfolio: source_folder + "/js/" + portfolio + "*.min.js",
				uber: source_folder + "/js/" + uber + "*.min.js",
				timer: source_folder + "/js/" + timer + "*.min.js",
				todo: source_folder + "/js/" + todo + "*.min.js",
				meta: source_folder + "/js/" + meta + "*.min.js",
				food: source_folder + "/js/" + food + "*.min.js"
			}
		},
		css: {
			uber: source_folder + "/css/" + uber + "/font.css",
			meta: source_folder + "/css/" + meta + "/font.css"
		}
	},
	build: {
		html: project_folder + "/",
		css: {
			portfolio: project_folder + "/css/" + portfolio + "/",
			uber: project_folder + "/css/" + uber + "/",
			timer: project_folder + "/css/" + timer + "/",
			todo: project_folder + "/css/" + todo + "/",
			meta: project_folder + "/css/" + meta + "/",
			food: project_folder + "/css/" + food + "/"
		},
		js: {
			portfolio: project_folder + "/js/" + portfolio + "/",
			uber: project_folder + "/js/" + uber + "/",
			timer: project_folder + "/js/" + timer + "/",
			todo: project_folder + "/js/" + todo + "/",
			meta: project_folder + "/js/" + meta + "/",
			food: project_folder + "/js/" + food + "/"
		},
		img: {
			portfolio: project_folder + "/img/" + portfolio + "/",
			uber: project_folder + "/img/" + uber + "/",
			timer: project_folder + "/img/" + timer + "/",
			todo: project_folder + "/img/" + todo + "/",
			meta: project_folder + "/img/" + meta + "/",
			food: project_folder + "/img/" + food + "/"
		}
	}
};

//подключаем gulp-file-include
const fileinclude = require('gulp-file-include');
const gulp = require('gulp');

// Определяем логику работы Browsersync
function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: project_folder }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
};

//Создадим функцию scripts() для экспорта задач
function scriptsportfolio() {
	return src([ // Берем файлы из источников
		'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
		path.src.js.portfolio // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
	])
	.pipe(concat(portfolio + '.min.js')) // Конкатенируем в один файл
	.pipe(uglify()) // Сжимаем JavaScript
	.pipe(dest(project_folder + '/js/')) // Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

function scriptsuber() {
	return src([ // Берем файлы из источников
		'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
		path.src.js.uber // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
	])
	.pipe(concat(uber + '.min.js')) // Конкатенируем в один файл
	.pipe(uglify()) // Сжимаем JavaScript
	.pipe(dest(project_folder + '/js/')) // Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

function scriptstimer() {
	return src([ // Берем файлы из источников
		'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
		path.src.js.timer // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
	])
	.pipe(concat(timer + '.min.js')) // Конкатенируем в один файл
	.pipe(uglify()) // Сжимаем JavaScript
	.pipe(dest(project_folder + '/js/')) // Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

function scriptstodo() {
	return src([ // Берем файлы из источников
		'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
		path.src.js.todo // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
	])
	.pipe(concat(todo + '.min.js')) // Конкатенируем в один файл
	.pipe(uglify()) // Сжимаем JavaScript
	.pipe(dest(project_folder + '/js/')) // Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

function scriptsmeta() {
	return src([ // Берем файлы из источников
		'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
		path.src.js.meta // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
	])
	.pipe(concat(meta + '.min.js')) // Конкатенируем в один файл
	.pipe(uglify()) // Сжимаем JavaScript
	.pipe(dest(project_folder + '/js/')) // Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

function scriptsfood() {
	return src([ // Берем файлы из источников
		'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
		path.src.js.food // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
	])
	.pipe(concat(food + '.min.js')) // Конкатенируем в один файл
	.pipe(uglify()) // Сжимаем JavaScript
	.pipe(dest(project_folder + '/js/')) // Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

//обработка стилей
function stylesportfolio() {
	return src('src/' + preprocessor + '/' + portfolio + '/*.' + preprocessor + '') // Выбираем источник: "src/scss/main.scss"
	.pipe(eval('sass')()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat(portfolio + '.min.css')) // Конкатенируем в файл src.min.css
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest(project_folder + '/css/' + portfolio + '/')) // Выгрузим результат в папку "build/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function stylesuber() {
	return src('src/' + preprocessor + '/' + uber + '/*.' + preprocessor + '') // Выбираем источник: "src/scss/main.scss"
	.pipe(eval('sass')()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat(uber + '.min.css')) // Конкатенируем в файл src.min.css
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest(project_folder + '/css/' + uber + '/')) // Выгрузим результат в папку "build/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function stylestimer() {
	return src('src/' + preprocessor + '/' + timer + '/*.' + preprocessor + '') // Выбираем источник: "src/scss/main.scss"
	.pipe(eval('sass')()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat(timer + '.min.css')) // Конкатенируем в файл src.min.css
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest(project_folder + '/css/' + timer + '/')) // Выгрузим результат в папку "build/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function stylestodo() {
	return src('src/' + preprocessor + '/' + todo + '/*.' + preprocessor + '') // Выбираем источник: "src/scss/main.scss"
	.pipe(eval('sass')()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat(todo + '.min.css')) // Конкатенируем в файл src.min.css
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest(project_folder + '/css/' + todo + '/')) // Выгрузим результат в папку "build/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function stylesmeta() {
	return src('src/' + preprocessor + '/' + meta + '/*.' + preprocessor + '') // Выбираем источник: "src/scss/main.scss"
	.pipe(eval('sass')()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat(meta + '.min.css')) // Конкатенируем в файл src.min.css
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest(project_folder + '/css/' + meta + '/')) // Выгрузим результат в папку "build/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function stylesfood() {
	return src('src/' + preprocessor + '/' + food + '/*.' + preprocessor + '') // Выбираем источник: "src/scss/main.scss"
	.pipe(eval('sass')()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat(food + '.min.css')) // Конкатенируем в файл src.min.css
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest(project_folder + '/css/' + food + '/')) // Выгрузим результат в папку "build/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

///////////////////////////////////////////////////////

//function fontsuber() {
	//return src(path.src.css.uber) // Выбираем источник: "src/scss/main.scss"
	//.pipe(concat(uber + 'fonts.min.css')) // Конкатенируем в файл src.min.css
	//.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	//.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	//.pipe(dest(project_folder + '/css/' + uber + '/')) // Выгрузим результат в папку "build/css/"
	//.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
//}

//function fontsmeta() {
	//return src(path.src.css.meta) // Выбираем источник: "src/scss/main.scss"
	//.pipe(concat(meta + 'fonts.min.css')) // Конкатенируем в файл src.min.css
	//.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	//.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	//.pipe(dest(project_folder + '/css/' + meta + '/')) // Выгрузим результат в папку "build/css/"
	//.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
//}

//обработка изображений
async function imagesportfolio() {
	imagecomp(
		path.src.img.src.portfolio, // Берём все изображения из папки источника
		path.src.img.build.portfolio, // Выгружаем оптимизированные изображения в папку назначения
		{ compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { // Обновляем страницу по завершению
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

async function imagesuber() {
	imagecomp(
		path.src.img.src.uber + '/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}', // Берём все изображения из папки источника
		path.src.img.build.uber, // Выгружаем оптимизированные изображения в папку назначения
		{ compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { // Обновляем страницу по завершению
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

async function imagesmeta() {
	imagecomp(
		path.src.img.src.meta + '/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}', // Берём все изображения из папки источника
		path.src.img.build.meta, // Выгружаем оптимизированные изображения в папку назначения
		{ compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { // Обновляем страницу по завершению
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

async function imagesfood() {
	imagecomp(
		path.src.img.src.food + '/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}', // Берём все изображения из папки источника
		path.src.img.build.food, // Выгружаем оптимизированные изображения в папку назначения
		{ compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { // Обновляем страницу по завершению
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

/* async function imagestimer() {
	imagecomp(
		path.src.img.src.timer + '/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}', // Берём все изображения из папки источника
		path.src.img.build.timer, // Выгружаем оптимизированные изображения в папку назначения
		{ compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { // Обновляем страницу по завершению
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

async function imagestodo() {
	imagecomp(
		path.src.img.src.todo + '/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}', // Берём все изображения из папки источника
		path.src.img.build.todo, // Выгружаем оптимизированные изображения в папку назначения
		{ compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { // Обновляем страницу по завершению
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
} */

//функция сборки проекта
function buildcopy() {
	return src([ // Выбираем нужные файлы
		path.src.pdf,
		path.src.icons.uber,
		path.src.icons.todo,
		path.src.icons.food,
		//path.src.fonts.uber,
		//path.src.fonts.meta,
		path.src.min.css.portfolio + "/*",
		path.src.min.css.uber,
		path.src.min.css.timer + "/*",
		path.src.min.css.todo + "/*",
		path.src.min.css.meta + "/*",
		path.src.min.css.food + "/*",
		path.src.min.js.portfolio + "/*",
		path.src.min.js.uber + "/*",
		path.src.min.js.timer + "/*",
		path.src.min.js.todo + "/*",
		path.src.min.js.meta + "/*",
		path.src.min.js.food + "/*",
		path.src.img.src.portfolio + "/**/*",
		path.src.img.src.uber + "/**/*",
		path.src.img.src.meta + "/**/*",
		path.src.img.src.food + "/**/*",
		path.src.css.uber,
		/* path.src.img.build.timer + "/*",
		path.src.img.build.todo + "/*", */
		], { base: source_folder }) // Параметр "base" сохраняет структуру проекта при копировании
	.pipe(dest(project_folder)) // Выгружаем в папку с финальной сборкой
}

//функция очистки папки dest
function cleanimg() {
	return del(path.src.img.build.all, { force: true }) // Удаляем все содержимое папки "app/images/dest/"
}

//функция очистки папки собранного файла
function cleandist() {
	return del(project_folder + '/**/*', { force: true }) // Удаляем все содержимое папки "dist/"
}

function html(){
	return src(path.src.html)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		  }))
		.pipe(dest(project_folder))
		.pipe(browserSync.stream())
}

//при сохранении скриптов, происходит автоматическое обновление страницы в браузере
function startwatch() {
 
	// Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
	watch([path.src.js.portfolio], scriptsportfolio);
	watch([path.src.js.uber], scriptsuber);
	watch([path.src.js.timer], scriptstimer);
	watch([path.src.js.todo], scriptstodo);
	watch([path.src.js.meta], scriptsmeta);
	watch([path.src.js.food], scriptsfood);

	// Мониторим файлы препроцессора на изменения
	watch(source_folder + '/**/' + preprocessor + '/**/*', stylesportfolio);
	watch(source_folder + '/**/' + preprocessor + '/**/*', stylesuber);
	watch(source_folder + '/**/' + preprocessor + '/**/*', stylestimer);
	watch(source_folder + '/**/' + preprocessor + '/**/*', stylestodo);
	watch(source_folder + '/**/' + preprocessor + '/**/*', stylesmeta);
	watch(source_folder + '/**/' + preprocessor + '/**/*', stylesfood);

	// Мониторим CSS файлы на изменения
	//watch(source_folder + '/css/' + meta + '/**/*', fontsuber);
	//watch(source_folder + '/css/' + uber + '/**/*', fontsmeta);

	// Мониторим файлы HTML на изменения
	watch(path.src.html).on('change', browserSync.reload);

	// Мониторим папку-источник изображений и выполняем images(), если есть изменения
	watch(path.src.img.src.portfolio, imagesportfolio);
	watch(path.src.img.src.uber, imagesuber);
	watch(path.src.img.src.meta, imagesmeta);
	watch(path.src.img.src.food, imagesfood);
	/* watch(path.src.img.src.timer, imagestimer);
	watch(path.src.img.src.todo, imagestodo); */
}

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;

exports.startwatch = startwatch;

// Экспортируем функцию scripts() в таск scripts
exports.scriptsportfolio = scriptsportfolio;
exports.scriptsuber = scriptsuber;
exports.scriptstimer = scriptstimer;
exports.scriptstodo = scriptstodo;
exports.scriptsmeta = scriptsmeta;
exports.scriptsfood = scriptsfood;
/* exports.scriptsPortfolio = scripts(portfolio);
exports.scriptsUber = scripts(uber);
exports.scriptsTimer = scripts(timer);
exports.scriptsTodo = scripts(todo); */

// Экспортируем функцию styles() в таск styles
/* exports.styles = styles; */
exports.stylesportfolio = stylesportfolio;
exports.stylesuber = stylesuber;
exports.sctylestimer = stylestimer;
exports.stylestodo = stylestodo;
exports.stylesmeta = stylesmeta;
exports.stylesfood = stylesfood;

//exports.fontsuber = fontsuber;
//exports.fontsmeta = fontsmeta;

// Экспорт функции images() в таск images
exports.imagesportfolio = imagesportfolio;
exports.imagesuber = imagesuber;
exports.imagesmeta = imagesmeta;
exports.imagesfood = imagesfood;
/* exports.imagestimer = imagestimer;
exports.imagestodo = imagestodo; */
/* exports.imagesPortfolio = images(portfolio);
exports.imagesUber = images(uber);
exports.imagesTimer = images(timer);
exports.imagesTodo = images(todo); */

// Экспортируем функцию cleanimg() как таск cleanimg
exports.cleanimg = cleanimg;

exports.cleandist = cleandist;

exports.html = html;

exports.buildcopy = buildcopy;


// Создаем новый таск "build", который последовательно выполняет нужные операции
exports.build = series(cleandist, html, 
					   stylesportfolio, stylesuber, stylestimer, stylestodo, stylesmeta, stylesfood,
					   //fontsuber, fontsmeta,
					   scriptsportfolio, scriptsuber, scriptstimer, scriptstodo, scriptsmeta, scriptsfood,
					   imagesportfolio, imagesuber, imagesmeta, imagesfood, /* imagestimer, imagestodo, */
					   buildcopy);

// Экспортируем дефолтный таск с нужным набором функций
exports.default = series( 
	parallel(
	  html,
	  stylesportfolio, stylesuber, stylestimer, stylestodo, stylesmeta, stylesfood,
	  //fontsuber, fontsmeta,
	  scriptsportfolio, scriptsuber, scriptstimer, scriptstodo, scriptsmeta, scriptsfood,
	  imagesportfolio, imagesuber, imagesmeta, imagesfood, /* imagestimer, imagestodo, */
	), 
	parallel(
	  browsersync,
	  startwatch
	)
  );