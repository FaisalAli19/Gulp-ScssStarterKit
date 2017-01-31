var gulp = require("gulp"),
modernizr = require("gulp-modernizr");

//This function will detect the non supported component inlegacy browser and add appropriate class to html tag
gulp.task("modernizr", function() {
    return gulp.src(["./app/assets/styles/**/*.css", "./app/assets/scripts/**/*.js"])
        .pipe(modernizr({
            "options": [
                "setClasses"
            ]
        }))
        .pipe(gulp.dest("./app/temp/scripts/"));
});
