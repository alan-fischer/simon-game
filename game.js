var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStarted = false;

var level = 0;


// Function to detect key press and start the game
$(document).on("keypress", function () {
  if (gameStarted == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

// Function to check answer, call next color if user gets it right or game over if user gets it wrong
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success!!");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("Wrong!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");      
    }, 200);
    $("#level-title").text("Game Over! Press Any Key To Restart")
    startOver();
  }
}

// Function to start the game again after game over
function startOver () {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

// Function to call the next random colour
function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

// Function to detect what button the user clicked, and later check if it's right with function checkAnswer
$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Function to play sound based on the name
function playSound(name) {
  var sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

// Function to animate the buttons after pressing
function animatePress(currentColour) {
  var currentButton = $("." + currentColour);
  currentButton.addClass("pressed");

  setTimeout(function () {
    currentButton.removeClass("pressed");
  }, 100);
}
