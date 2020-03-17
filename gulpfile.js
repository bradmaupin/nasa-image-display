var gulp = require('gulp');
var shell = require('gulp-shell');
var path = require('path');
var zip = require('gulp-zip');
var minimist = require('minimist');
var fs = require('fs');

gulp.task('build', shell.task('gulp', {
    cwd: './client'
}));

gulp.task('package', package);

gulp.task('default', ['build', 'package']);

function package() {

    var knownOptions = {
        string: 'packageName',
        string: 'packagePath',
        default: {packageName: "Package.zip", packagePath: path.join(__dirname, '_package')}
    };
    var options = minimist(process.argv.slice(2), knownOptions);
    var packagePaths = [
        '**',
        '!**/_package/**',
        '!**/typings/**',
        '!typings',
        '!_package',
        '!gulpfile.js',
        '!client/node_modules/**',
        '!client/node_modules',
        '!client/public/**',
        '!client/public',
        '!client/src/**',
        '!client/src',
        '!client/.gitignore',
        '!client/package.json',
        '!client/README.md',
        '!client/yarn.lock',
        '!client/gulpfile.js'
    ];

    //add exclusion patterns for all dev dependencies
    var packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
    var devDeps = packageJSON.devDependencies;

    for (var propName in devDeps) {
        var excludePattern1 = "!**/node_modules/" + propName + "/**";
        var excludePattern2 = "!**/node_modules/" + propName;
        packagePaths.push(excludePattern1);
        packagePaths.push(excludePattern2);
    }

    return gulp.src(packagePaths)
        .pipe(zip(options.packageName))
        .pipe(gulp.dest(options.packagePath));
}