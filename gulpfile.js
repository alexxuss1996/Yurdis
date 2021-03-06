var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		cleanCSS		 = require('gulp-clean-css'),
		imagemin		 = require('gulp-imagemin'),
		uglify       = require('gulp-uglifyjs');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
		browserSync.init({
				server: { baseDir: './'},
				port: 3000,
				notify: false,
		});
});


gulp.task('compress', function() {
	gulp.src('app/img/*')
	.pipe(imagemin({
		progressive: true
	}))
	.pipe(gulp.dest('app/img/'));
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(minifycss())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'./app/libs/modernizr/modernizr.js',
		'./app/libs/jquery/jquery-1.11.2.min.js',
		'./app/libs/OwlCarousel2/dist/owl.carousel.min.js',
		'./app/libs/superfish/js/superfish.min.js',
		'./app/libs/jQuery.mmenu/dist/jquery.mmenu.all.js',
		'./app/libs/equalheights/equalheights.js',
		'./app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		])
		.pipe(concat('libs.js'))
		.pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./app/js/'));
});

gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/img/*', ['compress']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
