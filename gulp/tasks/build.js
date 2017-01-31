var gulp = require("gulp"),
imagemin = require("gulp-imagemin"),
del = require("del"),
usemin = require("gulp-usemin"),
rev = require("gulp-rev"),
cssnano = require("gulp-cssnano"),
uglify = require("gulp-uglify"),
browserSync = require("browser-sync").create();

//This function will preview the after build version of the website in browser
gulp.task("previewDocs", function() {
    //Define the main director to browser Sync
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
});

//Every time build finction is run this will delete the older doc folder
gulp.task("deletDocsFolder", ["icons"], function() {
    return del("./docs");
});

//This function will copy the general folder/files to docs
gulp.task("copyGeneralFiles", ["deletDocsFolder"], function() {
    var pathToCopy = [
        "./app/**/*",
        "!./app/index.html",
        "!./app/assets/pages/**",
        "!./app/assets/images/**",
        "!./app/assets/styles/**",
        "!./app/assets/scripts/**",
        "!./app/temp",
        "!./app/temp/**"
    ]

    return gulp.src(pathToCopy)
        .pipe(gulp.dest("./docs"))
});

//This function will optimize the images to improve the performance
gulp.task("optimizeImages", ["deletDocsFolder"], function() {
    return gulp.src(["./app/assets/images/**/*", "!./app/assets/images/icons", "!./app/assets/images/icons/**/*"])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest("./docs/assets/images"));
});

//This function will trigger usemin and pages function
gulp.task("useminTrigger", ["deletDocsFolder"], function() {
    gulp.start("usemin");
    gulp.start("pages");
});

//This function will compress and revise the styles and scripts files and copy index file.
gulp.task("usemin", ["styles", "scripts"], function() {
    return gulp.src("./app/index.html")
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
});

//This function will compress and revise the styles and scripts files and copy pages folder and files.
gulp.task("pages", ["styles", "scripts"], function() {
    return gulp.src("./app/assets/pages/**/*.html")
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("./docs/assets/pages"));
});

gulp.task("build", ["deletDocsFolder", "copyGeneralFiles", "optimizeImages", "useminTrigger"]);
