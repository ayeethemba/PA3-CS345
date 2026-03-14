

let paddleY = 150;
let startScreen;
let score = 0;
let ballX = 0;
let ballY = 200;
let ballSpeedX = 10;
let ballSpeedY = -1.25;
let gameState = "start";
let bgMusic;


function preload() {
  startScreen = loadImage("assets/galaxy.jpeg");
  bgMusic = loadSound("assets/Darude - Sandstorm.mp3");
}
function setup() {
  createCanvas(600, 400);
  bgMusic.loop();
}
function mousePressed() {
  if (mouseX > width/2 - 80 && mouseX < width/2 + 80 && mouseY > 157 && mouseY < 202) {
    gameState = "playing";
}
}

function draw() {
  if (gameState === "start") {
    image(startScreen, 0, 0);
    fill(230, 220, 255);
    stroke(230, 220, 255);
    textSize(50);
    drawingContext.shadowBlur = 30;
    drawingContext.shadowColor = "rgb(180,120,255)";
    text("THEMBAS PONG", (width / 6), 40);
    drawingContext.shadowBlur = 15;
    text("THEMBAS PONG", (width / 6), 40);
    drawingContext.shadowBlur = 0;

    rectMode(CENTER)
    stroke(0);
    fill(0, 255, 0);
    rect(width / 2, 180, 160, 45);
    stroke(0);
    fill(0);
    text("START", (width / 2) - 80, height / 2);


  } else if (gameState === "playing") {
    rectMode(CORNER);
    //Background and Scores
    background(0);
    stroke(255);
    fill(255);
    textFont("Times New Roman");
    textSize(30);
    text("SCORE: " + score, 0, 30);

    //Player Paddle
    stroke(144, 238, 144);
    fill(144, 238, 144);
    rect(500, paddleY, 20, 100);

    if (keyIsPressed) {
      if (keyIsDown(UP_ARROW)) {
        paddleY -= 14;
      }
      if (keyIsDown(DOWN_ARROW)) {
        paddleY += 14;
      }
    }
    paddleY = constrain(paddleY, 0, height - 100);

    //Circle/Pong Ball
    stroke(173, 216, 230);
    fill(173, 216, 230);
    ellipse(ballX, ballY, 30, 30);
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //Bouncing Logic
    if (ballY <= 0 || ballY >= height - 15) {
      ballSpeedY *= -1;
    }
    if (ballX <= 0) {
      ballSpeedX *= -1;
    }

    //Paddle Collision
    if ((ballX >= 490) && (ballY >= paddleY && ballY <= paddleY + 100)) {
      ballSpeedX *= -1;
      ballX = 489;
      score++;
    }

    //Player misses ball ball gets resest
    if (ballX >= 600) {
      score--;
      ballX = 0;
      ballY = 200;
    }

  }
}
