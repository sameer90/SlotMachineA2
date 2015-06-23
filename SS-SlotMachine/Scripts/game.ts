/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="objects/button.ts" />

// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var stats: Stats;
var assets: createjs.LoadQueue;
var manifest = [
    { id: "spinButton", src: "assets/images/spinButton.png" },    
    { id: "resetButton", src: "assets/images/resetButton.png" },
    { id: "betOneButton", src: "assets/images/betOneButton.png" },
    { id: "betMaxButton", src: "assets/images/betMaxButton.png" }
];


//Images
var background: createjs.Bitmap; 
var fruit1: createjs.Bitmap;
var fruit2: createjs.Bitmap;
var fruit3: createjs.Bitmap;

//Text
var winningText: createjs.Text;
var accountText: createjs.Text;
var jackpotText: createjs.Text;
var bit10Text: createjs.Text;
var bit30Text: createjs.Text;
var winvalueText: createjs.Text;
var totalBetText: createjs.Text;
var totalText: createjs.Text;

//Default Value
var jackpot = 10000;
var minBet = 0;
var maxBet = 0;
var defaultamount = 1000;
var remainingvalue = 1000;
var winvaluetxt = 0;
var totalBetValue = 0;
var curBetValue = 0;

var bananaScore = 1;
var lemonScore = 2;
var peeScore = 3;
var melonScore = 4;
var eggplantScore = 5;
var orangeScore = 6;
var sevenScore = 7;
var bigWinScore = 100;
var barScore = 30;

var winScore = 0;
var winArray = new Array();

var timer1, timer2;
var timerstatus = false;
var objj, obj1, obj2;
var totalBetBeforeReset = 0;

//create a reference
var spinButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;
var betOneButton: createjs.Bitmap;
var betMaxButton: createjs.Bitmap;


//Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this); 
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}
                
//Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop); 
    
    // calling main game function
    main();
}

//function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps

    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '330px';
    stats.domElement.style.top = '10px';
   // document.body.appendChild(stats.domElement);
}

//Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring
    stage.update();
    stats.end(); // end measuring
}
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

//Callback function that allows me to respond to button click events
function spinButtonClicked() {
    timerstatus = false;
    for (var spin = 0; spin < 3; spin++) {   
        var rand = Math.floor((Math.random() * 90) + 1);
        switch (rand) {
            case checkRange(rand, 1, 20):
                createImage("banana.png", spin);
                winArray[spin] = "banana"; 
                break;
            case checkRange(rand, 20, 30):
                createImage("bigwin.png", spin);
                winArray[spin] = "bigwin";
                break;
            case checkRange(rand, 31, 33):
                createImage("blank.png", spin);
                  
                break;
            case checkRange(rand, 34, 42):
                createImage("bar.png",spin);
                winArray[spin] = "bar";
                break;
            
            case checkRange(rand, 43, 50):
                createImage("eggplant.png", spin);
                winArray[spin] = "eggplant";
                break;
            case checkRange(rand, 51, 64):
                createImage("lemon.png", spin);
                winArray[spin] = "lemon"; 
                break;
            case checkRange(rand, 65, 72):
                createImage("melon.png", spin);
                winArray[spin] = "melon"; 
                break;             
            case checkRange(rand, 73, 79):
                createImage("orange.png",spin);
                winArray[spin] = "orange"; 
                break;
            case checkRange(rand, 80, 85):
                createImage("pee.png", spin);
                winArray[spin] = "pee"; 
                break;
            case checkRange(rand, 86, 90):
                createImage("seven.png", spin);
                winArray[spin] = "seven"; 
                break;
            
        }
    }
    calulateWIN();
}

//our Main Game Function
function main() {
    
    background = new createjs.Bitmap("assets/images/background1.png");

    
    resetButton = new createjs.Bitmap(assets.getResult("resetButton"));
    resetButton.x = 60;
    resetButton.y = 295;   

    spinButton = new createjs.Bitmap(assets.getResult("spinButton"));
    spinButton.x = 405;
    spinButton.y = 290;


    betMaxButton = new createjs.Bitmap(assets.getResult("betMaxButton"))
    betMaxButton.x = 290;
    betMaxButton.y = 295;


    betOneButton = new createjs.Bitmap(assets.getResult("betOneButton"));
    betOneButton.x = 180;
    betOneButton.y = 295;

    

    
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

    spinButton.on("click", roller);
    betOneButton.on("click", doBet10);
    betMaxButton.on("click", doBet30);
    resetButton.on("click", resetValue);
}
function resetValue() {    

    jackpot = 10000;
    minBet = 0;
    maxBet = 0;
    defaultamount = 1000;
    remainingvalue = 1000;
    winvaluetxt = 0;
    totalBetValue = 0;
    totalBetBeforeReset = 0;

     stage.removeChild(jackpotText);
    stage.removeChild(accountText);
    stage.removeChild(winvalueText);
    stage.removeChild(bit30Text);
    stage.removeChild(bit10Text);
    stage.removeChild(totalBetText);
    stage.removeChild(totalText);

    stage.removeChild(winningText);
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
                                        
    stage.removeChild(objj);
    stage.removeChild(obj1);
    stage.removeChild(obj2);
    clearInterval(timer1);
    clearTimeout(timer2);
    timerstatus = false;

}
function doBet30() {
    if (timerstatus == true) {
        alert("Wait until Spinning Stops");
    }
    else {

        if (totalBetBeforeReset+30 < defaultamount) {

            totalBetValue += 30;
            totalBetBeforeReset += 30;
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

            remainingvalue = remainingvalue - 30;

            accountText = new createjs.Text(remainingvalue.toString(), "20px Consolas", "#FFFFFF");
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
}
function doBet10() {
    if (timerstatus == true) {
        alert("Wait until Spinning Stops");
    }
    else {
        if (totalBetBeforeReset < defaultamount) {
            totalBetValue += 10;
            totalBetBeforeReset += 10;
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

            remainingvalue = remainingvalue - 10;

            accountText = new createjs.Text(remainingvalue.toString(), "20px Consolas", "#FFFFFF");
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
}
function createImage(imagename,spin) {
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
        obj = new createjs.Bitmap("assets/images/"+imagename);
        obj.x = x;
        obj.y = y;
        stage.addChild(obj);
        if (spin == 0)
            fruit1 = obj;
        if (spin == 1)
            fruit2 = obj;   
        if (spin == 2)
            fruit3 = obj;
}


function roller() {
    
    if (remainingvalue == 0 && totalBetValue == 0) {
        alert("You have no Money. Please Reset");
    }
    else if (totalBetValue == 0) {
        alert("Please Bet");
    }
    else {
        stage.removeChild(winvalueText);
        winvaluetxt = 0;                
        winvalueText = new createjs.Text(winvaluetxt.toString(), "20px Consolas", "#FFFFFF");
        winvalueText.x = 425;
        winvalueText.y = 238;
        stage.addChild(winvalueText);

        var arr = new Array();
        arr[0] = "blank.png";
        arr[1] = "banana.png";
        arr[2] = "bar.png";
        arr[3] = "bigwin.png";
        arr[4] = "eggplant.png";
        arr[5] = "lemon.png";
        arr[6] = "melon.png";
        arr[7] = "orange.png";
        arr[8] = "pee.png";
        arr[9] = "seven.png";

        if (timerstatus == false) {
            var x1 = 0;
            var y1 = 347;

            timerstatus = true;
            stage.removeChild(winningText);
            winningText = new createjs.Text("........Spinning.........", "25px Consolas", "#FFFFFF");
            winningText.x = 80;
            winningText.y = 540;
            stage.addChild(winningText);

            stage.removeChild(fruit1);
            stage.removeChild(fruit2);
            stage.removeChild(fruit3);

            timer1 = setInterval(function () {
                if (y1 + 15 > 465)
                    y1 = 347;

                x1 = 90;
                stage.removeChild(objj);
                objj = new createjs.Bitmap("assets/images/" + arr[Math.floor((Math.random() * 9))]);
                objj.x = x1;
                objj.y = y1;
                stage.addChild(objj);

                x1 = 220;
                stage.removeChild(obj1);
                obj1 = new createjs.Bitmap("assets/images/" + arr[Math.floor((Math.random() * 9))]);
                obj1.x = x1;
                obj1.y = y1;
                stage.addChild(obj1);



                x1 = 360;
                stage.removeChild(obj2);
                obj2 = new createjs.Bitmap("assets/images/" + arr[Math.floor((Math.random() * 9))]);
                obj2.x = x1;
                obj2.y = y1;

                stage.addChild(obj2);

                y1 = y1 + 15;
            }, 50);

            timer2 = setTimeout(function () {
                stage.removeChild(objj);
                stage.removeChild(obj1);
                stage.removeChild(obj2);
                spinButtonClicked();

                clearInterval(timer1);
                clearTimeout(timer2);

            }, 5000);
        }
        else {
            alert("Already Spinning");
        }
    }
}
function calulateWIN() {
    if (winArray[0] == winArray[1] && winArray[0] == winArray[2]) {

        stage.removeChild(winningText);
        winningText = new createjs.Text("You Won", "40px Consolas", "#FFFFFF");
        winningText.x = 160;
        winningText.y = 540;
        stage.addChild(winningText);        

        var calcamount = 0;
        var winFruit = winArray[0];
        if (winFruit == "banana") {
            calcamount = totalBetValue * bananaScore;
            remainingvalue = remainingvalue + calcamount;
        }
        else if (winFruit == "bar") {
            calcamount = totalBetValue * barScore;
            remainingvalue = remainingvalue + calcamount;
        }
        else if (winFruit == "bigwin") {
            calcamount = jackpot;
            remainingvalue = remainingvalue + jackpot;
            stage.removeChild(winningText);
            winningText = new createjs.Text("JJAACCKKPPOOOOT", "40px Consolas", "#FFFFFF");
            winningText.x = 170;
            winningText.y = 540;
            stage.addChild(winningText);
        }
        else if (winFruit == "eggplant") {
            calcamount = totalBetValue * eggplantScore;
            remainingvalue = remainingvalue + calcamount;
        }
        else if (winFruit == "lemon") {
            calcamount = totalBetValue * lemonScore;
            remainingvalue = remainingvalue + calcamount;
        }
        else if (winFruit == "melon") {
            calcamount = totalBetValue * melonScore;
            remainingvalue = remainingvalue + calcamount;
        }
        else if (winFruit == "orange") {
            calcamount = totalBetValue * orangeScore;
            remainingvalue = remainingvalue + calcamount;
        }
        else if (winFruit == "pee") {
            calcamount = totalBetValue * peeScore;
            remainingvalue = remainingvalue + calcamount;
        }
        else if (winFruit == "seven") {
            calcamount = totalBetValue * sevenScore;
            remainingvalue = remainingvalue + calcamount;
        }

        stage.removeChild(winvalueText);

        winvaluetxt = calcamount;

        winvalueText = new createjs.Text(winvaluetxt.toString(), "20px Consolas", "#FFFFFF");
        winvalueText.x = 425;
        winvalueText.y = 238;
        stage.addChild(winvalueText);

    }
    else {
        winArray = new Array();
        stage.removeChild(winningText);
        winningText = new createjs.Text("You Loose", "40px Consolas", "#FFFFFF");
        winningText.x = 170;
        winningText.y = 540;
        stage.addChild(winningText);
    }
    winArray = new Array();
    minBet = 0;
    maxBet = 0;
    totalBetValue = 0;

        
    stage.removeChild(bit30Text);
    stage.removeChild(bit10Text);
    stage.removeChild(totalBetText);
    stage.removeChild(totalText);


}