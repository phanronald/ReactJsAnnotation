/// <binding Clean='clean' />

var gulp = require("gulp");
var rimraf = require("rimraf");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var uglify = require("gulp-uglify");

var buffer = require('gulp-buffer');
var source = require('vinyl-source-stream');
var request = require('request');
var merge = require('merge2');

var project = require("./project.json");

var paths = {
	webroot: "./" + project.webroot + "/",
	lib: "./" + project.webroot + "/lib/",
	customjs: "./" + project.webroot + "/js/",
	customcss: "./" + project.webroot + "/css/",
	customsass: "Styles/",
	bundledjs: project.webroot + "/minjs/",
	bundledcss: "./" + project.webroot + "/mincss/"
};

gulp.task("clean:js", function (cb) {
	rimraf(paths.bundledjs, cb);
});

gulp.task("clean:css", function (cb) {
	rimraf(paths.bundledcss, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("bundleJqueryValidationJs", function () {

	gulp.src([paths.lib + "jquery-validation/dist/jquery.validate.js",
				paths.lib + "jquery-validation-unobtrusive/jquery-validation-unobtrusive.js"])
		.pipe(concat(paths.bundledjs + "jquery-validation.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("."));
});

gulp.task("bundleHomeCss", function () {

	gulp.src([paths.customsass + "generic.css", paths.customsass + "main.css",
				paths.customsass + "home.css", paths.customsass + "navigation.css",
				paths.customsass + "container.css", paths.customcss + "grid-system.css",
				paths.customsass + "mobile-phone.css", paths.customsass + "mobile-tablet.css"])
		.pipe(concat(paths.bundledcss + "site.min.css"))
		.pipe(cssmin())
		.pipe(gulp.dest("."));

});

gulp.task("bundleGoogleFonts", function () {

	var sanscaptiongooglefont = request('http://fonts.googleapis.com/css?family=PT+Sans+Caption')
		.pipe(source('sanscaptiongooglefont.css'));

	var sansnarrowgooglefont = request('http://fonts.googleapis.com/css?family=PT+Sans+Narrow')
			.pipe(source('sansnarrowgooglefont.css'));

	var sansptgooglefont = request('http://fonts.googleapis.com/css?family=PT+Sans')
			.pipe(source('sansptgooglefont.css'));

	var opensansgooglefont = request('http://fonts.googleapis.com/css?family=Open+Sans')
			.pipe(source('opensansgooglefont.css'));

	var opensansitalicgooglefont = request('http://fonts.googleapis.com/css?family=Open+Sans:300italic')
			.pipe(source('opensansitalicgooglefont.css'));

	var crimsontextitalicgooglefont = request('http://fonts.googleapis.com/css?family=Crimson+Text:700italic')
			.pipe(source('crimsontextitalicgooglefont.css'));

	var main = gulp.src([paths.customcss + "grid-system.css"]);
	return merge(sanscaptiongooglefont, sansnarrowgooglefont, sansptgooglefont, opensansgooglefont, opensansitalicgooglefont, crimsontextitalicgooglefont, main)
		.pipe(buffer())
		.pipe(concat(paths.bundledcss + "googlefonts-grid.min.css"))
		.pipe(cssmin())
		.pipe(gulp.dest("."));
});

gulp.task('copy-requirejs', function () {
	gulp.src(['./node_modules/requirejs/require.js'])
	.pipe(concat(paths.customjs + "requirejs/require.js"))
	.pipe(gulp.dest("."));
})

gulp.task("min", ["bundleHomeJs", "bundleHomeCss", "bundleGoogleFonts"]);