// const backgroundColor = [230,220,190];
const sounds = Array.from({ length: 6 });
const WIDTH = 800;
const HEIGHT = 800;
const WALL_MARGIN = 100;
const WALL_WEIGHT = 5;
const BALL_STROKE = 6;
const NUM_BALLS = 3;
const MAX_BALL_SIZE = 50;
const MIN_BALL_SIZE = 10;
const MAX_SPEED = 8;
const MIN_SPEED = 1;

const balls = [];

function preload() {
    sounds.forEach((sound, i) => {
        sounds[i] = loadSound(`sounds/${i}.mp3`)
    });
    
    for(let i = 0; i < NUM_BALLS; i++){
        const fillColor = [];
        const strokeColor = [];
        for(let i = 0; i < 3; i++){
            fillColor.push(Math.floor(Math.random() * 255));
            strokeColor.push(Math.floor(Math.random() * 255));
        }
        balls.push({
            x: WIDTH/2,
            y: HEIGHT/2,
            r: Math.floor(Math.random() * (MAX_BALL_SIZE - MIN_BALL_SIZE)) + MIN_BALL_SIZE,
            xVel: Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED)) + MIN_SPEED,
            yVel: Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED)) + MIN_SPEED,
            angle: Math.random() * Math.PI,
            fillColor: fillColor,
            strokeColor: strokeColor,
        });
    }
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    background(230, 220, 190);
    ellipseMode(RADIUS);
}

function draw() {
    background(230, 220, 190);
    drawWalls(WALL_MARGIN);
    balls.forEach(ball => {
        move(ball);
        drawCircle(ball)
    });
}

function checkHorCollision(ball){
    return ball.x + ball.r > WIDTH - WALL_MARGIN || ball.x - ball.r < WALL_MARGIN;
}

function checkVerCollision(ball){
    return ball.y + ball.r > HEIGHT - WALL_MARGIN || ball.y - ball.r < WALL_MARGIN;
}

function changeBall(ball){
    sounds[Math.floor(Math.random() * sounds.length)].play();
    for(let i = 0; i < 3; i++){
        ball.fillColor[i] = Math.floor(Math.random() * 255);
        ball.strokeColor[i] = Math.floor(Math.random() * 255);
    }
}

function move(ball) {
    if (checkHorCollision(ball)) {
        ball.xVel *= -1;
        changeBall(ball);
    }
    if(checkVerCollision(ball)){
        ball.yVel *= -1;
        changeBall(ball);
    }
    ball.x += ball.xVel;
    ball.y += ball.yVel;
}

function drawWalls(margin) {
    stroke(0);
    strokeWeight(WALL_WEIGHT);
    line(margin, margin, margin, HEIGHT - margin);
    line(WIDTH - margin, margin, WIDTH - margin, HEIGHT - margin);
    line(margin, margin, WIDTH - margin, margin);
    line(margin, HEIGHT - margin, WIDTH - margin, HEIGHT - margin);
}

function drawCircle(ball) {
    stroke(ball.strokeColor);
    strokeWeight(BALL_STROKE);
    fill(ball.fillColor)
    ellipse(ball.x, ball.y, ball.r);
}