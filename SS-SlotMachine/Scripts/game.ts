/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />


// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var stats: Stats;

var assets: createjs.LoadQueue;
var manifest = [
    { id: "rollButton", src: "assets/images/roll.png" }    
];


// Game Variables
var helloLabel: createjs.Text; 

var diceVal1: createjs.Text; 
var diceVal2: createjs.Text; 

var dice1: createjs.Bitmap;
var dice2: createjs.Bitmap;
// create a reference
//var rollButton: createjs.Bitmap;
var rollButton: objects.Button;


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

    document.body.appendChild(stats.domElement);
}


// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring

    stage.update();

    stats.end(); // end measuring
}

// Callback function that allows me to respond to button click events
function rollButtonClicked(event: createjs.MouseEvent) {
    for (var spin = 0; spin < 2; spin++) {   
        var rand = Math.floor((Math.random() * 6) + 1);
        switch (rand) {
            case 1:
                createImageandText("dice1.png", "1", spin);
                break;
            case 2:
                createImageandText("dice2.png", "2", spin);
                break;
            case 3:
                createImageandText("dice3.png", "3", spin);
                break;
            case 4:
                createImageandText("dice4.png", "4", spin);
                break;
            case 5:
                createImageandText("dice5.jpg", "5", spin);
                break;
            case 6:
                createImageandText("dice6.png", "6", spin);
                break;             
        }
    }
}

// Callback functions that change the alpha transparency of the button

// Mouseover event
/*
function rollButtonOver() {
    rollButton.alpha = 0.8;
}
*/

// Mouseout event
/*
function rollButtonOut() {
    rollButton.alpha = 1.0;
}
*/

// Our Main Game Function
function main() {
    
    //helloLabel = new createjs.Text("Hello", "40px Consolas", "#000000");
    //helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
    //helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;
    //helloLabel.x = 160;
    //helloLabel.y = 190;
    //stage.addChild(helloLabel);



    diceVal1 = new createjs.Text("1", "40px Consolas", "#000000");
    diceVal1.regX = diceVal1.getMeasuredWidth() * 0.5
    diceVal1.regY = diceVal1.getMeasuredHeight() * 0.5;
    diceVal1.x = 50;
    diceVal1.y = 200;

    diceVal2 = new createjs.Text("1", "40px Consolas", "#000000");
    diceVal2.regX = diceVal1.getMeasuredWidth() * 0.5
    diceVal2.regY = diceVal1.getMeasuredHeight() * 0.5;
    diceVal2.x = 270;
    diceVal2.y = 200;

    dice1 = new createjs.Bitmap("assets/images/dice1.png");
    dice1.x = 10;
    dice1.y = 100;
    dice1.scaleX = 0.5;
    dice1.scaleY = 0.5;

    dice2 = new createjs.Bitmap("assets/images/dice1.png");
    dice2.x = 230;
    dice2.y = 100;
    dice2.scaleX = 0.5;
    dice2.scaleY = 0.5;

   
    
    rollButton = new objects.Button(assets.getResult("rollButton"), 160, 400);
    //stage.addChild(rollButton.image);
    //rollButton.image.on("click", rollButtonClicked);
    stage.addChild(rollButton);
    stage.addChild(diceVal1);
    stage.addChild(diceVal2);
    stage.addChild(dice1);
    stage.addChild(dice2);
    rollButton.on("click", rollButtonClicked);
}
function createImageandText(imagename,textval,spin)
{
    
    if (spin == 0) {
        stage.removeChild(dice1);
        stage.removeChild(diceVal1);

        diceVal1 = new createjs.Text(textval, "40px Consolas", "#000000");
        diceVal1.regX = diceVal1.getMeasuredWidth() * 0.5
        diceVal1.regY = diceVal1.getMeasuredHeight() * 0.5;
        diceVal1.x = 50;
        diceVal1.y = 200;

        dice1 = new createjs.Bitmap("assets/images/"+imagename);
        dice1.x = 10;
        dice1.y = 100;
        dice1.scaleX = 0.5;
        dice1.scaleY = 0.5;

        stage.addChild(diceVal1);
        
        stage.addChild(dice1);
        
    }
    else if (spin == 1) {


        stage.removeChild(dice2);

        stage.removeChild(diceVal2);

        diceVal2 = new createjs.Text(textval, "40px Consolas", "#000000");
        diceVal2.regX = diceVal1.getMeasuredWidth() * 0.5
        diceVal2.regY = diceVal1.getMeasuredHeight() * 0.5;
        diceVal2.x = 270;
        diceVal2.y = 200;



        dice2 = new createjs.Bitmap("assets/images/" + imagename);
        dice2.x = 230;
        dice2.y = 100;
        dice2.scaleX = 0.5;
        dice2.scaleY = 0.5;


        stage.addChild(dice2);
        stage.addChild(diceVal2);

    }
}