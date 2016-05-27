// var gulp = require('gulp'),
//     livereload = require('gulp-livereload');
// 
// gulp.task('watch', function () {    // 这里的watch，是自定义的，写成live或者别的也行
//     var server = livereload();
//     
//     // app/**/*.*的意思是 app文件夹下的 任何文件夹 的 任何文件
//     gulp.watch('_site/**/*.*', function (file) {
//         server.changed(file.path);
//     });
// });
//
var gulp = require('gulp');

var feed_list;

var LIVERELOAD_PORT = 35729;
var EXPRESS_ROOT = "_site";


// We'll need a reference to the tinylr
// object to send notifications of file changes
// further down
var lr;
function startLivereload() {

  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}

// Notifies livereload of changes detected
// by `gulp.watch()` 
function notifyLivereload(event) {

  // `gulp.watch()` events provide an absolute path
  // so we need to make it relative to the server root
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);

  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

// Default task that will be run
// when no parameter is provided
// to gulp
gulp.task('default', function () {

//  startExpress();
  startLivereload();
  gulp.watch('_site/**', notifyLivereload);
});
