// get data from world save
var game = new URL(document.location.href).searchParams.get('game');
var gameData = JSON.parse(localStorage.getItem('game' + game));
$('#gameName').innerHTML = 'Game name: ' + gameData.name + ' Game seed: ' + gameData.seed;
// save game function
function saveGame() {
    localStorage.setItem('game' + game, JSON.stringify(gameData));
    alert('Game saved!');
}
// world generator
if (!gameData.tiles) {
    var {SimplexNoise} = require('simplex-noise');
    var noise = new SimplexNoise(gameData.seed);
    gameData.tiles = new Array(20);
    for (let i = 0; i < gameData.tiles.length; i++) {
        gameData.tiles[i] = new Array(20);
        for (let j = 0; j < gameData.tiles[i].length; j++) {
            if (noise.noise2D(i / 10, j / 10) > 0.3) {
                gameData.tiles[i][j] = 'tree';
            }
            else {
                gameData.tiles[i][j] = 'grass';
            }
        }
    }
    var bruh = Math.round(Math.random() * 19);
    var lol = Math.round(Math.random() * 19);
    console.log(bruh, lol);
    gameData.tiles[bruh][lol] = 'store';
}
// cursor position
var x = 0;
var y = 0;
// load images
var shack = new Image();
shack.src = 'images/shack.svg';
var selector = new Image();
selector.src = 'images/selector.svg';
var background = new Image();
background.src = 'images/background.svg';
var tree = new Image();
tree.src = 'images/tree.svg';
var tapped = new Image();
tapped.src = 'images/tree-tapped.svg';
var grass = new Image();
grass.src = 'images/grass.svg';
var store = new Image();
store.src = 'images/tank.svg';
var ctx = $('#canvas').getContext('2d');
grass.onload = displayWorld;
// display world
function displayWorld() {
    // draw background
    ctx.drawImage(background, 0, 0);
    for (var i = 0; i < gameData.tiles.length; i++) {
        for (var j = 0; j < gameData.tiles[i].length; j++) {
            if (gameData.tiles[i][j] == 'tree') {
                // draw tree
                ctx.drawImage(tree, i * 50, j * 50);
            }
            if (gameData.tiles[i][j] == 'shack') {
                // draw shack
                ctx.drawImage(shack, i * 50, j * 50);
            }
            if (gameData.tiles[i][j] == 'grass') {
                // draw grass
                ctx.drawImage(grass, i * 50, j * 50);
            }
            if (gameData.tiles[i][j] == 'tree-tapped') {
                // draw tapped tree
                ctx.drawImage(tapped, i * 50, j * 50);
            }
            if (gameData.tiles[i][j] == 'store') {
                // draw store
                ctx.drawImage(store, i * 50, j * 50);
            }
        }
    }
    ctx.drawImage(selector, x * 50, y * 50);
    $('#money').innerHTML = gameData.money;
    $('#sap').innerHTML = gameData.sap;
    $('#syrup').innerHTML = gameData.syrup;
}

document.onkeydown = function(event) {
    if (event.code == 'ArrowUp') {
        y--;
    }
    if (event.code == 'ArrowDown') {
        y++;
    }
    if (event.code == 'ArrowLeft') {
        x--;
    }selector
    if (event.code == 'ArrowRight') {
        x++;
    }
    if (x > 19) {
        x = 0;
    }
    if (x < 0) {
        x = 19;
    }
    if (y < 0) {
        y = 19;
    }
    if (y > 19) {
        y = 0;
    }
    if (event.code == 'Enter') {
        if (gameData.tiles[x][y] == 'tree') {
            if (gameData.money > 4) {
                gameData.money -= 5;
                gameData.tiles[x][y] = 'tree-tapped';
            }
            else {
                alert('Not enough money!');
            }
        }
        if (gameData.tiles[x][y] == 'grass') {
            if (gameData.money > 99) {
                gameData.money -= 100;
                gameData.tiles[x][y] = 'shack';
            }
            else {
                alert('Not enough money!');
            }
        }
        if (gameData.tiles[x][y] == 'store') {
            if (gameData.money > 999) {
                gameData.money -= 1000;
                gameData.storelevel++;
            }
            else {
                alert('Not enough money!');
            }
        }
    }
    displayWorld();
}

setInterval(function() {
    for (var i = 0; i < gameData.tiles.length; i++) {
        for (var j = 0; j < gameData.tiles[i].length; j++) {
            if (gameData.tiles[i][j] == 'tree-tapped') {
                gameData.sap++;
            }
            if (gameData.tiles[i][j] == 'shack') {
                if (gameData.sap > 39) {
                    gameData.syrup++;
                    gameData.sap -= 40;
                }
            }
        }
    }
    if (gameData.syrup >= gameData.storelevel * 5) {
        gameData.syrup -= gameData.storelevel * 5;
        gameData.money += gameData.storelevel * 10;
    }
    displayWorld();
}, 1000);