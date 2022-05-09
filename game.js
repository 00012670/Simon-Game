var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userCkickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {

    //When the game starts, title shows "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function() {

  //Saving the ID of the button that was clicked.
  var userChosenColor = $(this).attr("id");

  //Adding the contents of a variable
  userCkickedPattern.push(userChosenColor);

  //Playing a sound when the user clicks a button
  playSound(userChosenColor);

  //Adding the "pressed" class to the button that gets clicked
  animatePress(userChosenColor);

  //Calling checkAnswer() after a user has clicked
  checkAnswer(userCkickedPattern.length - 1);
});



function checkAnswer(currentLevel) {

  //Checking if the recent user answer is the same as the game pattern
  if (gamePattern[currentLevel] === userCkickedPattern[currentLevel]) {

    if (userCkickedPattern.length === gamePattern.length) {

      //Creates a delay
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  //If the user got one of the answers wrong
  } else {

    playSound("wrong");

    //Adding the "game-over" class to the body
    $("body").addClass("game-over");

    //Creates a delay
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    //Changing the title
    $("#level-title").text("Game over. Press any key to restart");

    //Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}



function nextSequence() {

  //Reset to the empty array, ready for the next level.
  userCkickedPattern = [];

  //Increasing the level by 1 every time
  level++;

  //Updating title with the new level
  $("#level-title").text("Level " + level);

  //Generate a new random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //Animate a flash to the button
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //Playing the sound when it comes next sequence
  playSound(randomChosenColor);
}



//Sound effect when the button is pressed
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



//Adding animation when the button is clicked
function animatePress(currentColour) {

  //Adding the "pressed" class to the button that gets clicked
  $("#" + currentColour).addClass("pressed");

  //Creates a delay
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}



//Restating the Game
function startOver() {

//Reset values
  level = 0;
  gamePattern = [];
  started = false;
}
