var gulp = require("gulp"),
watch = require("gulp-watch"),
browserSync = require("browser-sync").create();

//This function will watch for any changes and refresh the browser
gulp.task("watch", function() {
    //Define the main director to browser Sync
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    //This will watch for changes in indexfiles
    watch("./app/index.html", function() {
        browserSync.reload();
    });

    //This will watch for changes in pages files
    watch("./app/assets/pages/*.html", function() {
        browserSync.reload();
    });

    //This will watch for changes in styles folder and inject them without reloading the browser
    watch("./app/assets/styles/**/*.css", function() {
        gulp.start("cssInject");
    });

    //This will watch for changes in script folder
    watch("./app/assets/scripts/**/*.js", function() {
        gulp.start("scriptsRefresh");
    });
});

//This function will inject the css in browser with out reloading the page
gulp.task("cssInject", ["styles"], function() {
    return gulp.src("./app/temp/styles/styles.css")
        .pipe(browserSync.stream());
});

//This function will insert the changes to web browser and reload the same
gulp.task("scriptsRefresh", ["scripts"], function() {
    browserSync.reload();
});
