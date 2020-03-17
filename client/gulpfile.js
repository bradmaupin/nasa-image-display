var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('install', shell.task("npm install"));

gulp.task('build', ['install'], shell.task("npm run build", {cwd: __dirname}));

gulp.task('default', ['install', 'build']);