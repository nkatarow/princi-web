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
	nunjucksRender = require('gulp-nunjucks-render');

function onError(err) {
	console.log(err);
}

// nunjucks templating
gulp.task('nunjucks', function() {
	return gulp.src('app/pages/**/*.+(html|nunjucks)')
		.pipe(nunjucksRender({
			path: ['app/templates']
		}))
		.pipe(gulp.dest('app'))
		.pipe(livereload());
});

// Concat/autoprefix CSS
gulp.task('styles', function(){
	return sass('app/_ui/css/main.scss', { style: 'expanded'})
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 9', 'ios 6', 'android 4', '> 1%']}))
		.pipe(gulp.dest('app/_ui/compiled'))
		.pipe(plumber({errorHandler: onError}))
		.pipe(livereload());
});

// Concat JS
gulp.task('scripts', function(){
	return gulp.src(['app/_ui/js/lib/*.js', 'app/_ui/js/app.main.js', 'app/_ui/js/components/*.js'])
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('app/_ui/compiled'))
		.pipe(plumber({errorHandler: onError}))
		.pipe(livereload());
});


// Minify / Uglify
gulp.task('minify', function(){
	return gulp.src('app/_ui/compiled/main.css')
		.pipe(cleanCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/_ui/dist'))
		.pipe(plumber({errorHandler: onError}));
});
gulp.task('uglify', function(){
	return gulp.src('app/_ui/compiled/scripts.js')
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify(''))
		.pipe(gulp.dest('app/_ui/dist'))
		.pipe(plumber({errorHandler: onError}));
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

	gulp.watch('app/_ui/css/**/*.scss', ['styles']);
	gulp.watch('app/_ui/js/**/*.js', ['scripts']);
	gulp.watch('app/pages/*.nunjucks', ['nunjucks']);
	gulp.watch('app/templates/*.nunjucks', ['nunjucks']);
});

// Build task
gulp.task('build', ['cleandist'], function(){
	gulp.start('minify', 'uglify', 'nunjucks');
});
