// npm install gulp-concat gulp-rename gulp-uglify gulp-clean-css --save-dev
var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var config = {
    nodeDir: "node_modules",
    targetDir: '../resources/static',
    minJs: 'all.min.js',
    minCss: 'all.min.css'
}

gulp.task("watch", ['build:all'], function() {
    gulp.watch(['app/**/*'], ['build:js', 'app:css']);
});

gulp.task("build:prod", ['build:all', 'minJs', 'minCss']);

gulp.task('minCss', ['build:css'], function() {
     return gulp.src([config.targetDir + '/css/bootstrap.css', config.targetDir + '/css/bootstrap-theme.css', config.targetDir + '/css/*.css', '!' + config.targetDir + '/css/*.min.css'])
        .pipe(concat('all.css'))
        .pipe(gulp.dest(config.targetDir + '/build'))
        .pipe(rename(config.minCss))
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.targetDir + '/css'));
});

gulp.task('minJs', ['build:js'], function() {
    return gulp.src([config.targetDir + '/js/vendor.js', config.targetDir + '/js/*.js', '!' + config.targetDir + '/js/*.min.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest(config.targetDir + '/build'))
        .pipe(rename(config.minJs))
        .pipe(uglify())
        .pipe(gulp.dest(config.targetDir + '/js'));
});

gulp.task("build:all", ['build:js', 'build:css', 'build:misc']);

gulp.task('build:js', ['webpack:build']);

gulp.task('build:css', ['app:css', 'bootstrap:css']);

gulp.task('build:misc', ['bootstrap:fonts']);

gulp.task('app:css', function() {
    return gulp.src('app/css/**/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest(config.targetDir + '/css'));
})

gulp.task('bootstrap:css', function () {
    return gulp.src(config.nodeDir + '/bootstrap/dist/css/*')
        .pipe(gulp.dest(config.targetDir + '/css'));
});

gulp.task("bootstrap:fonts", function() {
   return gulp.src(config.nodeDir + '/bootstrap/fonts/*')
       .pipe(gulp.dest(config.targetDir + '/fonts'))
});

gulp.task("webpack:build", function(callback) {
    // run webpack
    webpack(require('./webpack.config'), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});