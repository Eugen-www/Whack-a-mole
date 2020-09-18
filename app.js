const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const score = document.querySelector(".game-score p span");
const startButton = document.querySelector(".game-btn button");
let lastHole;
let timeUp = false;
let scoreNumber = 0;

function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomHole(holes) {
  let index = Math.floor(Math.random() * holes.length);
  let hole = holes[index];
  if (hole === lastHole) {
    randomHole(holes);
  }
  lastNumber = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1500);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  timeUp = false;
  scoreNumber = 0;
  peep();
  setTimeout(() => (timeUp = true), 20000);
}

function bonk(e) {
  scoreNumber++;
  score.innerText = scoreNumber;
  const target = e.target;
  target.parentNode.classList.remove("up");
}

moles.forEach((mole) => {
  mole.addEventListener("click", function (e) {
    bonk(e);
  });
});

startButton.addEventListener("click", startGame);
