var gulp = require("gulp"),
webpack = require("webpack");

//This function will convert es6 code to es5
gulp.task("scripts", ["modernizr"], function(callback) {
    webpack(require("../../webpack.config.js"), function(err, stats) {
        if(err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
});
