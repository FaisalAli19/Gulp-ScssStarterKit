var gulp = require("gulp"),
svgSprite = require("gulp-svg-sprite"),
rename = require("gulp-rename"),
del = require("del"),
svg2png = require("gulp-svg2png");

//Svg Sprite configuration file
var config = {
    mode: {
        css: {
            variables: {
                replaceSvgWithPng: function() {
                    return function(sprite, render) {
                        return render(sprite).split(".svg").join(".png");
                    }
                }
            },
            sprite: "sprite.svg",
            render: {
                css: {
                    template: "./gulp/templates/sprite.css"
                }
            }
        }
    }
}

//This function will start cleaning the old folder
gulp.task("beginClean", function() {
    return del(["./app/temp/sprite", "./app/assets/images/sprites"]);
});

//This function will create the svg sprite
gulp.task("createSprite", ["beginClean"], function() {
    return gulp.src("./app/assets/images/icons/**/*.svg")
        .pipe(svgSprite(config))
        .pipe(gulp.dest("./app/temp/sprite/"));
});

//This function will create png copy of the svg sprite
gulp.task("createPngCopy", ["createSprite"], function() {
    return gulp.src("./app/temp/sprite/css/*.svg")
        .pipe(svg2png())
        .pipe(gulp.dest("./app/temp/sprite/css"));
});

//This function will copy the sprite from temp to assets folder
gulp.task("copySpriteGraphic", ["createPngCopy"], function() {
    return gulp.src("./app/temp/sprite/css/**/*.{svg,png}")
        .pipe(gulp.dest("./app/assets/images/sprites"))
});

//This function will copy css sprite file from temp to assets folder after renaming it.
gulp.task("copySpriteCSS", ["createSprite"], function() {
    return gulp.src("./app/temp/sprite/css/*.css")
        .pipe(rename("_sprite.css"))
        .pipe(gulp.dest("./app/assets/styles/modules"));
});

//This function will deleted the sprite folder/files in temp folder
gulp.task("endClean", ["copySpriteGraphic", "copySpriteCSS"], function() {
    return del("./app/temp/sprite");
});

//This function will run all the above function one by one.
gulp.task("icons", ["beginClean", "createSprite", "createPngCopy", "copySpriteGraphic", "copySpriteCSS", "endClean"]);
