var gulp = require ('gulp'),
	sass = require('gulp-ruby-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	merge = require('merge-stream'),
	del = require('del'),
	plumber = require('gulp-plumber'),
	livereload = require('gulp-livereload'),
	pump = require('pump'),
	nunjucksRender = require('gulp-nunjucks-render');

function createErrorHandler(name) {
    return function (err) {
    	console.error('Error from ' + name + ' in compress task', err.toString());
    };
}


// nunjucks templating
gulp.task('nunjucks', function() {
	return gulp.src('src/templates/pages/**/*.+(html|nunjucks)')
		.pipe(nunjucksRender({
			path: ['src/templates/']
		}))
		.pipe(gulp.dest('app'))
		.pipe(livereload());
});

// Concat/autoprefix CSS
gulp.task('styles', function(){
	return sass('src/_ui/scss/main.scss', { style: 'expanded'})
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 9', 'ios 6', 'android 4', '> 1%']}))
		.pipe(gulp.dest('app/_ui/compiled'))
    	.on('error', createErrorHandler('styles task'))
		.pipe(livereload());
});

// Concat JS
gulp.task('scripts', function(){
	return gulp.src(['src/_ui/js/lib/*.js', 'src/_ui/js/app.main.js', 'src/_ui/js/components/*.js'])
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('app/_ui/compiled'))
    	.on('error', createErrorHandler('scripts task'))
		.pipe(livereload());
});


// Minify / Uglify
gulp.task('minify', function(){
	return gulp.src('app/_ui/compiled/main.css')
		.pipe(cleanCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/_ui/dist'))
    	.on('error', createErrorHandler('minify task'))
});
gulp.task('uglify', function(){
	return gulp.src('app/_ui/compiled/scripts.js')
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
    	.on('error', createErrorHandler('uglify task'))
		.pipe(gulp.dest('app/_ui/dist'))
});


// Cleaners
gulp.task('cleancompiled', function(){
	return del(['app/_ui/compiled']);
});
gulp.task('cleandist', function(){
	return del(['app/_ui/dist']);
});


// Default task
gulp.task('default', ['cleancompiled'], function(){
	gulp.start('styles', 'scripts', 'nunjucks');
});

// Watch task
gulp.task('watch', function(){
	livereload.listen();

	// SCSS/JS
	gulp.watch('src/_ui/scss/**/*.scss', ['styles']);
	gulp.watch('src/_ui/js/**/*.js', ['scripts']);

	// Partials
	gulp.watch('src/templates/partials/*.nunjucks', ['nunjucks']);

	// Pages
	gulp.watch('src/templates/pages/*.nunjucks', ['nunjucks']);
	gulp.watch('src/templates/pages/**/*.nunjucks', ['nunjucks']);
	gulp.watch('src/templates/pages/**/**/*.nunjucks', ['nunjucks']);
});

// Build task
gulp.task('build', ['cleandist'], function(){
	gulp.start('minify', 'uglify', 'nunjucks');
});
