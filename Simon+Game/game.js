let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(() => {
    if (!started){
        $("h1").text(`Level ${level}`);
        nextSequence();
        started = true;
    }   
})

$(".btn").click (function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Correct")
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else {
        console.log("Wrong")
        playSound("Wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
  }

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
  }

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text(`Level ${level}`);
    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}



function playSound(name) {
    const music = new Audio(`sounds/${name}.mp3`)
    music.play();
  }


function animatePress(currentColour) {  
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}