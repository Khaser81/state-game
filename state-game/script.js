const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

let playerCount = 0;
let currentPlayer = 1;
let playerPoints = {};
let playerInputs = {};
let incorrectCount = 0;

function getPlayerNames() {
  playerCount = parseInt(document.getElementById("playerCount").value);

  if (playerCount >= 2 && playerCount <= 8) {
    const playerNamesContainer = document.getElementById("player-names");
    playerNamesContainer.innerHTML = '<p>Enter names for each player:</p>';
    
    for (let i = 1; i <= playerCount; i++) {
      playerNamesContainer.innerHTML += `
        <label for="player${i}Name">Player ${i} Name:</label>
        <input type="text" id="player${i}Name"><br>
      `;
    }

    playerNamesContainer.innerHTML += '<button onclick="startGame()">Start Game</button>';
    playerNamesContainer.style.display = "block";
  } else {
    alert("Please enter a valid number of players (2-8).");
  }
}

function startGame() {
  for (let i = 1; i <= playerCount; i++) {
    const playerName = document.getElementById(`player${i}Name`).value.trim();
    if (playerName === "") {
      alert(`Please enter a name for Player ${i}.`);
      return;
    }
    playerInputs[i] = { name: playerName, states: [] };
  }

  currentPlayer = 1;
  playerPoints = {};
  incorrectCount = 0;
  for (let i = 1; i <= playerCount; i++) {
    playerPoints[i] = 0;
  }

  showGameState();
}

function showGameState() {
  const gameContainer = document.getElementById("game-container");
  const inputHistoryContainer = document.getElementById("input-history");
  inputHistoryContainer.innerHTML = '<p>Input History:</p>';
  
  for (let i = 1; i <= playerCount; i++) {
    inputHistoryContainer.innerHTML += `<p>${playerInputs[i].name}: ${playerInputs[i].states.join(', ')}</p>`;
  }

  gameContainer.innerHTML = `
    <p>${playerInputs[currentPlayer].name}'s turn</p>
    <p>Points: ${getPlayerPoints()}</p>
    <p>Incorrect Count: ${incorrectCount}</p>
    <label for="stateInput">Enter a USA state:</label>
    <input type="text" id="stateInput">
    <button onclick="checkAnswer()">Check Answer</button>
  `;
}

function checkAnswer() {
  const stateInput = document.getElementById("stateInput").value.trim().toLowerCase();
  playerInputs[currentPlayer].states.push(stateInput);

  const index = states.findIndex(state => state.toLowerCase() === stateInput);

  if (index !== -1) {
    const correctState = states.splice(index, 1)[0];
    playerPoints[currentPlayer]++;
    showResultDialog(`Correct! ${correctState} removed from the list.`);
  } else {
    incorrectCount++;
    showResultDialog("Incorrect. Next player's turn.");
  }

  currentPlayer++;
  if (currentPlayer > playerCount) {
    currentPlayer = 1;
  }

  if (states.length === 0) {
    showResultDialog("Game Over! All states have been guessed.");
  } else {
    showGameState();
  }
}

function getPlayerPoints() {
  return Object.keys(playerPoints).map(player => `${playerInputs[player].name}: ${playerPoints[player]}`).join(' | ');
}

function showResultDialog(message) {
  const resultDialog = document.getElementById("result-dialog");
  const resultMessage = document.getElementById("result-message");
  resultMessage.innerText = message;
  resultDialog.style.display = "block";
}

function closeDialog() {
  const resultDialog = document.getElementById("result-dialog");
  resultDialog.style.display = "none";
}
