
//alert("hello guys!");
var buttonColours=['red','blue','green','yellow'];
var gamePattern=[];
var userClickedPattern=[];
var level = 0; // Initialize level
var gameStarted = false; 
$(".btn").on("click",function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    // Call checkAnswer with the index of the last answer
    checkAnswer(userClickedPattern.length - 1);
});
$(document).on("touchstart keydown", function(event) {
    // Check if the game is not started or is over
    if (!gameStarted || level === 0) {
        startGame(); // Start the game
    }
});

function startGame() {
    level = 0; // Reset level
    gamePattern = []; // Reset game pattern
    userClickedPattern = []; // Reset user clicked pattern
    $("#level-title").text("Level " + level); // Update the title
    nextSequence(); // Start the game
    gameStarted = true; // Set the game started flag to true
}

function nextSequence(){
    userClickedPattern = [];
    level++; // Increase level by 1
    $("#level-title").text("Level " + level); 
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
    animatePress(randomChosenColour);  
}

function playsound(name){
    var audio = new Audio( name +".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
// Function to check the user's answer
function checkAnswer(currentLevel) {
    // Check if the most recent user answer is the same as the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success"); // Log success
        // Check if the user has finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            // Call nextSequence after a 1000 millisecond delay
            setTimeout(function() {
                nextSequence();
            }, 1000);
            // Reset userClickedPattern for the next level
            
        }
    } else {
        console.log("wrong"); // Log wrong
        // Optionally, you can add code here to handle game over
      playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over"); 
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    }
}
// Function to reset the game state
function startOver() {
    level = 0; // Reset level
    gamePattern = []; // Reset game pattern
    userClickedPattern = []; // Reset user clicked pattern
    gameStarted = false; // Reset the game started flag
}
