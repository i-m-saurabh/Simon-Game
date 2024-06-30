var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

playSound = (name) => {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var num = Math.floor(4*Math.random());
    var randomChosenColor = buttonColors[num];
    // console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    // console.log(gamePattern);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
};


$(document).keypress(() => {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



animatePress = (currentColor) =>{
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

startOver = () => {
  level = 0;
  started = false;
  gamePattern = [];
};
  

checkAnswer = (currentLevel) => {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
};


$(".btn").click(function (){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});





