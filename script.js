const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

document.addEventListener("keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

const buttons = document.querySelectorAll(".btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const userChosenColor = this.id;
    userPattern.push(userChosenColor);
    // playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length - 1);
  });
});

function nextSequence() {
  userPattern = [];
  level++;
  document.getElementById("level-title").textContent = `Level ${level}`;

  const randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);

  setTimeout(() => {
    animatePress(randomChosenColor);
    // playSound(randomChosenColor);
  }, 500);
}

// function playSound(name) {
//   const audio = new Audio(`sounds/${name}.mp3`);
//   audio.play();
// }

function animatePress(currentColor) {
  const activeButton = document.getElementById(currentColor);
  activeButton.classList.add("pressed");
  setTimeout(() => {
    activeButton.classList.remove("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    // playSound("wrong");
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
