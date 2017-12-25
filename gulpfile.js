'use strict';
let gulp = require('gulp');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');

/**
 * ES6 编译
 */
gulp.task('es6', function () {
    gulp.src(['./js/uan.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./build'));
});
/**
 * uan 压缩
 */
gulp.task('minify-js',['es6'],()=>{
    return gulp.src(['./build/uan.js'])
        .pipe(uglify({
            compress:false,
            mangle:{
                reserved:['$super', '$', 'exports', 'require', 'define', 'module']
            }
        }))
        .pipe(gulp.dest('./build/min'));
});

/**
 * 构建
 */
gulp.task('build', ['minify-js'], function () {
    gulp.watch('js/*.js',['es6']);
    gulp.watch('build/*.js',['minify-js']);
});;