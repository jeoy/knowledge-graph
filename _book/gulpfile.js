var gulp = require('gulp');
const shell = require('shelljs');
var ora = require('ora');
var spinner = ora('').start();

var connect = require('gulp-connect');

var $ = require('gulp-load-plugins')();
var open = require('open');

gulp.task("reload", function(cd){
    console.log('reloading...');
    gulp.src(["./TurboFan/css/*.html"])
    	.pipe(connect.reload());
    cd();
})

gulp.task("webserver", function(cd){//配置热更新服务器
	connect.server({
		root: "./TurboFan/css",
		livereload: true,
		port: 4000
	})

    open('http://localhost:4000');
    gulp.watch("./TurboFan/css/*", gulp.parallel("reload"));
    cd();
})

gulp.task('default', gulp.parallel('webserver'));
