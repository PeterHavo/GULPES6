var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	browserSyn = require('browser-sync').create();
/*
// once we install plugins via npm sudo npm install gulp-load-plugins --save
 we dont need anymore partial libs  sudo npm install gulp-sourcemaps gulp-cssmin gulp-autoprefixer --save

sass = require('gulp-sass'),
autoprefix = require('gulp-autoprefixer')
cssMinimal = require('gulp-cssmin'),
sourceMap = require('gulp-sourcemaps') ;*/


//traspile  sass to css


gulp.task('css', function() {
	//traspile  sass
	//output file to dist folder

	// we use return to make sure we run tasks asynchron in case we have more complex and more time cosuming tasks
	return gulp.src(['./src/sass/main.scss'])
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass().on('error', plugins.sass.logError))
		.pipe(plugins.cssmin())
		.pipe(plugins.autoprefixer())
		.pipe(plugins.sourcemaps.write())
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSyn.stream());

})

//traspile  our javascript task
//as a minifier for css we use same for js by installing plugin sudo npm install gulp-uglify --save

gulp.task('js', function() {

	return gulp.src(['./node_modules/jquery/dist/jquery.min.js',
			'./src/js/magic.js',
			'./src/js/admin.js'
		])
		.pipe(plugins.babel({
			presets: ['es2015']
		}))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('all.js'))
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write())
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSyn.stream());

});

//lets bring all minified js files in one file in to  dist folder, we will use gulp-concat 

//npm install gulp-concat --save

//setup ES6 to ES5 we use babel and setup preset for ES6 = es2015 sudo npm install gulp-babel babel-preset-es2015 --save

// watching changes in files 

gulp.task('watch', function(){
	//gulp watch method needs 2 arguments first is which files to watch or folder, second which task  
	gulp.watch(['./src/sass/*.scss'],['css']);
	gulp.watch(['./src/js/*.js'],['js']);

});

gulp.task('default',['css','js','watch','serve']);


// next time after running above task to refresh our browser we use browsersync  npm install brovser-sync --save 

gulp.task('serve', function(){
	browserSyn.init({
		server:{baseDir:'./'}
	});
	gulp.watch('*.html').on('change',browserSyn.reload);
});