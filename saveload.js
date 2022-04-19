var games = $('#games');
function refreshGames() {
    games.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        var game = document.createElement('td');
        var header = document.createElement('h1');
        header.innerHTML = 'Game ' + (i + 1);
        game.appendChild(header);
        if (localStorage.getItem('game' + i) === null) {
            var newGameButton = document.createElement('button');
            newGameButton.onclick = function() {
                newGame(i);
            }
            newGameButton.innerHTML = 'New Game';
            game.appendChild(newGameButton);
        }
        else {
            var gameData = JSON.parse(localStorage.getItem('game' + i));
            var gameName = document.createElement('p');
            gameName.innerHTML = 'Name: ' + gameData.name;
            game.appendChild(gameName);
            var date = document.createElement('p');
            date.innerHTML = 'Date created: ' + gameData.date;
            game.appendChild(date);
            var deleteGameButton = document.createElement('button');
            deleteGameButton.onclick = function() {
                deleteGame(i);
            }
            deleteGameButton.innerHTML = 'Delete Game';
            game.appendChild(deleteGameButton);
            var joinGameButton = document.createElement('button');
            joinGameButton.onclick = function() {
                joinGame(i);
            }
            joinGameButton.innerHTML = 'Join Game';
            game.appendChild(joinGameButton);
        }
        games.appendChild(game);
    }
}
refreshGames();
function newGame(game) {
    var seed = prompt('Seed for the world generator (optional):');
    if (seed == '') {
        seed = Math.round(Math.random() * 1000000).toString();
    }
    var gameData = {name: prompt('Enter a name for this game:'), date: new Date().toString(), seed: seed, sap: 0, money: 125, syrup: 0, storelevel: 1};
    localStorage.setItem('game' + game, JSON.stringify(gameData));
    refreshGames();
}
function joinGame(game) {
    document.location.href = 'game.html?game=' + game;
}
function deleteGame(game) {
    localStorage.removeItem('game' + game);
    refreshGames();
}