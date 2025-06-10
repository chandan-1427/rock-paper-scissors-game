const emojiMap = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️'
};

let score = {
  wins: parseInt(localStorage.getItem('wins')) || 0,
  losses: parseInt(localStorage.getItem('losses')) || 0,
  draws: parseInt(localStorage.getItem('draws')) || 0
};

function updateScoreBoard() {
  document.getElementById('score').innerHTML =
    `Wins: ${score.wins} &nbsp;&nbsp; Losses: ${score.losses} &nbsp;&nbsp; Draws: ${score.draws}`;
}

function playGame(playerMove) {
  const computerMove = getComputerMove();
  const result = getResult(playerMove, computerMove);

  if (result === 'win') score.wins++;
  else if (result === 'loss') score.losses++;
  else score.draws++;

  localStorage.setItem('wins', score.wins);
  localStorage.setItem('losses', score.losses);
  localStorage.setItem('draws', score.draws);

  document.getElementById('choice').textContent =
    `Your choice: ${emojiMap[playerMove]} | Computer's choice: ${emojiMap[computerMove]}`;

  const resultText = result === 'win' ? 'You Win!' : result === 'loss' ? 'You Lose!' : "It's a Draw!";
  const resultElem = document.getElementById('result');
  resultElem.textContent = `Result: ${resultText}`;
  resultElem.classList.remove('animate-bounce-once');
  void resultElem.offsetWidth; // Force reflow to retrigger animation
  resultElem.classList.add('animate-bounce-once');

  updateScoreBoard();
}

function getComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  return moves[Math.floor(Math.random() * 3)];
}

function getResult(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'win';
  return 'loss';
}

function resetGame() {
  score = { wins: 0, losses: 0, draws: 0 };
  localStorage.clear();
  updateScoreBoard();
  document.getElementById('choice').textContent = 'Your choice: - | Computer\'s choice: -';
  document.getElementById('result').textContent = 'Result: -';
}

updateScoreBoard();
