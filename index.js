// const backgroundColor = [230,220,190];
const sounds = Array.from({ length: 6 });

function preload(){

    sounds.forEach((sound, i) => {
        sounds[i] = loadSound(`sounds/${i}.mp3`)
    })

    // for(let i = 0; i < sounds.length; i++){
    //     sounds[i] = loadSound(`sounds/${i}.mp3`)
    // }
}

function setup(){
    createCanvas(800, 800);
    background(230,220,190);
}

function draw(){
    stroke(0,220,20);
    fill(190, 80, 230);
    ellipse(300, 300, 90);
}