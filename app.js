/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,
  roundScore,
  dice,
  activePlayer,
  gameState = 0;

var diceDom, playerGlobalScore, playerCurrentScore, playerPanel;
diceDom = document.querySelector(".dice");
gameInit();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gameState) {
    diceDom.style.display = "block";
    playerPanel = document.querySelector(".player-" + activePlayer + "-panel");
    playerGlobalScore = document.getElementById("score-" + activePlayer);
    playerCurrentScore = document.querySelector("#current-" + activePlayer);

    dice = Math.floor(Math.random() * 6 + 1);
    document.querySelector("#current-" + activePlayer).textContent = dice;
    diceDom.src = "dice-" + dice + ".png";
    if (dice !== 1) {
      roundScore = roundScore + dice;
      playerCurrentScore.textContent = roundScore;
    } else {
      setTimeout(function () {
        document.querySelector(".dice").style.display = "none";
      }, 1000);

      toggleActivePlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gameState) {
    scores[activePlayer] += roundScore;
    playerGlobalScore.textContent = scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      gameState = 0;
      document.getElementById("name-" + activePlayer).textContent = "Winner";
      playerPanel.classList.add("winner");
      playerPanel.classList.remove("active");
      document.querySelector(".dice").style.display = "none";
    } else toggleActivePlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", gameInit);

function gameInit() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gameState = 1;
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".dice").style.display = "none";
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

function toggleActivePlayer() {
  roundScore = 0;
  playerCurrentScore.textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
}
