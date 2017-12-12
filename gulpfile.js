'use strict';
let gulp = require('gulp');
let babel = require('gulp-babel');
// 获取 uglify 模块（用于压缩 JS）
let uglify = require('gulp-uglify');
/**
 * 编译js文件
 */
gulp.task('es6', function () {
    //pages下面的业务代码进行babel处理
    gulp.src(['./js/uan.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./build'));
});
/**
 * 压缩js
 */
gulp.task('minify-js',()=>{
    return gulp.src(['./buil/uan.js'])
        .pipe(uglify({
            compress:false,
            mangle:{
                reserved:['$super', '$', 'exports', 'require', 'define', 'module']
            }
        }))
        .pipe(gulp.dest('./build/min'));
});
/**
 * 运行任务
 */
gulp.task('build', ['es6'], function () {
    gulp.watch('*.js', ['es6']);
});;