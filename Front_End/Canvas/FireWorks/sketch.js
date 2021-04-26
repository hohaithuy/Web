let fireworks = [];
let gravity;
const colors = ['#F27781', '#18298C', '#04BF8A', '#F2CF1D', '#F29F05', '#F23827', '#050259', '#6204BF', '#7C05F2', '#F205CB']

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    stroke(225);
    strokeWeight(4);
    gravity = createVector(0, 0.2);
    background(0);
    colorMode(HSB);
}

addEventListener("resize", function(){
    createCanvas(window.innerWidth, window.innerHeight);
})

function draw(){
    colorMode(RGB);
    background(0, 25);
    if(Math.random(1) < 0.1){
        fireworks.push(new Firework());
    }
    for(let i = fireworks.length - 1; i >= 0; i--){
        fireworks[i].update();
        fireworks[i].show();
        if(fireworks[i].done()){
            fireworks.splice(i, 1);
        }
    }
}