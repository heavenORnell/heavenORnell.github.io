/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

let HighScore = 0;

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var rect = board.getBoundingClientRect();
  var points = 0;
  // Game Item Objects

  $("<div class = part id = id0 id = head>").appendTo("#board")
  let snakeHead = {
    "x": 100,
    "y": 100,
    "rotation": 1
  }
  let snake = [];
  snake.push(snakeHead);

  $("<div class = apple>").appendTo("#board")
  let apple = {
    "x": 200,
    "y": 200
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function moveSquareTo() {
    let newRot;
    let oldRot;
    for (i = 0; i < snake.length; i++) {
      info = checkRotation(i)
      snake[i].x += info[0];
      $("#id" + i).css("left", snake[i].x)
      snake[i].y += info[1];
      $("#id" + i).css("top", snake[i].y)
      newRot = snake[i].rotation;
      if (i > 0) {
        snake[i].rotation = oldRot
      }
      oldRot = newRot
    }
  }
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  //  1 = right, 2 = down, 3 = left, 4 = up
  function newFrame() {
    hasHitSnake();
    handleKeypress();
    hasHitWall();
    moveSquareTo()
    hasHitApple();
    updateSpeed();
  }

  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }
  function handleKeypress() {
    $(document).on("keypress", function (e) {
      if (e.key === "a" && snake[0].rotation !== 1) {
        snake[0].rotation = 3;
      } else if (e.key === "w" && snake[0].rotation !== 2) {
        snake[0].rotation = 4;
      } else if (e.key === "d" && snake[0].rotation !== 3) {
        snake[0].rotation = 1;
      } else if (e.key === "s" && snake[0].rotation !== 4) {
        snake[0].rotation = 2;
      }
    });
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function checkRotation(pos) {
    // 1 = right, 2 = down, 3 = left, 4 = up
    var arr = []
    if (snake[pos].rotation === 1) {
      arr = [20, 0]
    } else if (snake[pos].rotation === 2) {
      arr = [0, 20];
    } else if (snake[pos].rotation === 3) {
      arr = [-20, 0];
    } else {
      arr = [0, -20];
    }
    return arr;
  }



  function updateSpeed() {

  }
  function hasHitApple() {
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
      points++;
      updateApple();
    }
  }
  function updateApple() {
    apple.x = Math.floor(Math.random() * 21) * 20;
    $(".apple").css("left", apple.x);
    apple.y = Math.floor(Math.random() * 21) * 20;
    $(".apple").css("top", apple.y);
    $("#score").text("Score: " + points);
    makeSnakeSquare();
  }

  function makeSnakeSquare() {
    //  1 = right, 2 = down, 3 = left, 4 = up
    rot = checkRotation(points - 1);
    var newSquare = {
      "x": snake[points - 1].x - rot[0],
      "y": snake[points - 1].y - rot[1],
      "rotation": snake[points - 1].rotation
    }
    snake.push(newSquare);
    $("<div class = part id = id" + points + ">").appendTo("#board")
    console.log(snake[0].y)
    console.log(snake)
  }

  function hasHitWall() {
    if (rect.right - 60 < snake[0].x && snake[0].rotation === 1) {
      endGame()
    } else if (rect.left + 20 > snake[0].x && snake[0].rotation === 3) {
      endGame()
    } else if (rect.top + 20 > snake[0].y && snake[0].rotation === 4) {
      endGame()
    } else if (rect.bottom - 60 < snake[0].y && snake[0].rotation === 2) {
      endGame()
    }
  }

  function hasHitSnake() {
    for (i = 0; i < snake.length; i++) {
      for (n = 0; n < snake.length; n++) {
        if (n === i) {
        } else if (snake[i].x === snake[n].x && snake[i].y === snake[n].y) {
          endGame();
        }
      }
    }
  }

  function endGame() {
    // stop the interval timer
    if (HighScore < points) {
      HighScore = points;
      points = 0;
      $("#HS").text("High Score: " + HighScore)
    }
    clearInterval(interval);
    $(".part").remove();
    $(".apple").remove();
    // turn off event handlers
    runProgram();
  }

}
