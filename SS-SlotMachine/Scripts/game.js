/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="objects/button.ts" />
// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage;
var stats;
var assets;
var manifest = [
    { id: "spinButton", src: "assets/images/spinButton.png" },
    { id: "resetButton", src: "assets/images/resetButton.png" }
];
// Game Variables
var background;
var fruit1;
var fruit2;
var fruit3;
// create a reference
//var rollButton: createjs.Bitmap;
var spinButton;
var resetButton;
// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}
// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop);
    // calling main game function
    main();
}
// function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps
    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '330px';
    stats.domElement.style.top = '10px';
    // document.body.appendChild(stats.domElement);
}
// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring
    stage.update();
    stats.end(); // end measuring
}
// Callback function that allows me to respond to button click events
function spinButtonClicked(event) {
    for (var spin = 0; spin < 3; spin++) {
        var rand = Math.floor((Math.random() * 8) + 1);
        switch (rand) {
            case 1:
                createImage("banana.png", spin);
                break;
            case 2:
                createImage("bar.png", spin);
                break;
            case 3:
                createImage("bigwin.png", spin);
                break;
            case 4:
                createImage("eggplant.png", spin);
                break;
            case 5:
                createImage("lemon.png", spin);
                break;
            case 6:
                createImage("melon.png", spin);
                break;
            case 7:
                createImage("orange.png", spin);
                break;
            case 8:
                createImage("pee.png", spin);
                break;
            case 9:
                createImage("seven.png", spin);
                break;
            case 10:
                createImage("blank.png", spin);
                break;
        }
    }
}
// Our Main Game Function
function main() {
    background = new createjs.Bitmap("assets/images/background.png");
    resetButton = new objects.Button(assets.getResult("resetButton"), 80, 550);
    spinButton = new objects.Button(assets.getResult("spinButton"), 439, 550);
    stage.addChild(background);
    stage.addChild(resetButton);
    stage.addChild(spinButton);
    spinButton.on("click", spinButtonClicked);
    //resetButton.on("click", init());
}
function createImage(imagename, spin) {
    var obj;
    var x = 0;
    var y = 0;
    if (spin == 0) {
        x = 90;
        y = 380;
        obj = fruit1;
    }
    else if (spin == 1) {
        x = 220;
        y = 380;
        obj = fruit2;
    }
    else {
        x = 360;
        y = 380;
        obj = fruit3;
    }
    stage.removeChild(obj);
    obj = new createjs.Bitmap("assets/images/" + imagename);
    obj.x = x;
    obj.y = y;
    stage.addChild(obj);
}
//# sourceMappingURL=game.js.map