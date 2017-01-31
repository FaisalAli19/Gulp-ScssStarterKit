var gulp = require("gulp"),
sass = require("gulp-sass"),
autoprefixer = require("autoprefixer"),
lost = require("lost");

//This task will convert postcss to normal css file.
gulp.task("styles", function() {
    //Source file
    return gulp.src("./app/assets/styles/styles.scss")
        .pipe(sass())
        .pipe(lost())
        .pipe(autoprefixer())
        //If there is an error this function will display an error without breaking the task
        .on("error", function(info) {
            console.log(info.toString);
            this.emit("end");
        })
        //Destination folder
        .pipe(gulp.dest("./app/temp/styles"));
});
