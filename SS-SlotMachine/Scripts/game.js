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
    { id: "resetButton", src: "assets/images/resetButton.png" },
    { id: "betOneButton", src: "assets/images/betOneButton.png" },
    { id: "betMaxButton", src: "assets/images/betMaxButton.png" }
];
// Images
var background;
var fruit1;
var fruit2;
var fruit3;
//Text
var winningText;
var accountText;
var jackpotText;
var bit10Text;
var bit30Text;
var winvalueText;
var totalBetText;
var totalText;
//Default Value
var jackpot = 10000;
var minBet = 0;
var maxBet = 0;
var defaultamount = 1000;
var winvaluetxt = 0;
var totalBetValue = 0;
var curBetValue = 0;
// create a reference
var spinButton;
var resetButton;
var betOneButton;
var betMaxButton;
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
        var rand = Math.floor((Math.random() * 9) + 1);
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
    background = new createjs.Bitmap("assets/images/background1.png");
    resetButton = new objects.Button(assets.getResult("resetButton"), 80, 310);
    spinButton = new objects.Button(assets.getResult("spinButton"), 439, 310);
    betMaxButton = new objects.Button(assets.getResult("betMaxButton"), 310, 310);
    betOneButton = new objects.Button(assets.getResult("betOneButton"), 200, 310);
    winningText = new createjs.Text("Welcome! Click Spin Button", "25px Consolas", "#FFFFFF");
    winningText.x = 80;
    winningText.y = 540;
    jackpotText = new createjs.Text(jackpot.toString(), "20px Consolas", "#FFFFFF");
    jackpotText.x = 233;
    jackpotText.y = 139;
    accountText = new createjs.Text(defaultamount.toString(), "20px Consolas", "#FFFFFF");
    accountText.x = 65;
    accountText.y = 238;
    winvalueText = new createjs.Text(winvaluetxt.toString(), "20px Consolas", "#FFFFFF");
    winvalueText.x = 425;
    winvalueText.y = 238;
    stage.addChild(background);
    stage.addChild(resetButton);
    stage.addChild(betOneButton);
    stage.addChild(betMaxButton);
    stage.addChild(winningText);
    stage.addChild(winvalueText);
    stage.addChild(accountText);
    stage.addChild(spinButton);
    stage.addChild(jackpotText);
    spinButton.on("click", spinButtonClicked);
    betOneButton.on("click", doBet10);
    betMaxButton.on("click", doBet30);
    resetButton.on("click", resetValue);
}
function resetValue() {
    jackpot = 10000;
    minBet = 0;
    maxBet = 0;
    defaultamount = 1000;
    winvaluetxt = 0;
    totalBetValue = 0;
    stage.removeChild(winningText);
    stage.removeChild(jackpotText);
    stage.removeChild(accountText);
    stage.removeChild(winvalueText);
    stage.removeChild(bit30Text);
    stage.removeChild(bit10Text);
    stage.removeChild(totalBetText);
    stage.removeChild(totalText);
    winningText = new createjs.Text("Welcome! Click Spin Button", "25px Consolas", "#FFFFFF");
    winningText.x = 80;
    winningText.y = 540;
    jackpotText = new createjs.Text(jackpot.toString(), "20px Consolas", "#FFFFFF");
    jackpotText.x = 233;
    jackpotText.y = 139;
    accountText = new createjs.Text(defaultamount.toString(), "20px Consolas", "#FFFFFF");
    accountText.x = 65;
    accountText.y = 238;
    winvalueText = new createjs.Text(winvaluetxt.toString(), "20px Consolas", "#FFFFFF");
    winvalueText.x = 425;
    winvalueText.y = 238;
    totalBetText = new createjs.Text(totalBetValue.toString(), "20px Consolas", "#FFFFFF");
    totalBetText.x = 243;
    totalBetText.y = 300;
    totalText = new createjs.Text("Total", "20px Consolas", "#FFFFFF");
    totalText.x = 228;
    totalText.y = 270;
    stage.addChild(totalText);
    stage.addChild(winningText);
    stage.addChild(jackpotText);
    stage.addChild(accountText);
    stage.addChild(winvalueText);
    stage.addChild(totalBetText);
}
function doBet30() {
    if (totalBetValue < defaultamount) {
        totalBetValue += 30;
        stage.removeChild(accountText);
        stage.removeChild(totalBetText);
        stage.removeChild(bit30Text);
        maxBet += 30;
        bit30Text = new createjs.Text(maxBet.toString(), "20px Consolas", "#FFFFFF");
        bit30Text.x = 300;
        bit30Text.y = 238;
        totalBetText = new createjs.Text(totalBetValue.toString(), "20px Consolas", "#FFFFFF");
        totalBetText.x = 243;
        totalBetText.y = 300;
        totalText = new createjs.Text("Total", "20px Consolas", "#FFFFFF");
        totalText.x = 228;
        totalText.y = 270;
        var remainingamount = defaultamount - totalBetValue;
        accountText = new createjs.Text(remainingamount.toString(), "20px Consolas", "#FFFFFF");
        accountText.x = 65;
        accountText.y = 238;
        stage.addChild(accountText);
        stage.addChild(totalText);
        stage.addChild(totalBetText);
        stage.addChild(bit30Text);
    }
    else {
        alert("You have no money");
    }
}
function doBet10() {
    if (totalBetValue < defaultamount) {
        totalBetValue += 10;
        stage.removeChild(accountText);
        stage.removeChild(totalBetText);
        stage.removeChild(bit10Text);
        minBet += 10;
        bit10Text = new createjs.Text(minBet.toString(), "20px Consolas", "#FFFFFF");
        bit10Text.x = 190;
        bit10Text.y = 238;
        totalBetText = new createjs.Text(totalBetValue.toString(), "20px Consolas", "#FFFFFF");
        totalBetText.x = 243;
        totalBetText.y = 300;
        totalText = new createjs.Text("Total", "20px Consolas", "#FFFFFF");
        totalText.x = 228;
        totalText.y = 270;
        var remainingamount = defaultamount - totalBetValue;
        accountText = new createjs.Text(remainingamount.toString(), "20px Consolas", "#FFFFFF");
        accountText.x = 65;
        accountText.y = 238;
        stage.addChild(accountText);
        stage.addChild(totalText);
        stage.addChild(totalBetText);
        stage.addChild(bit10Text);
    }
    else {
        alert("You have no money");
    }
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