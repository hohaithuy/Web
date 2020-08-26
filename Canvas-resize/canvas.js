var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d')

// ========================================================================================================


var mouse = {
    x: undefined,
    y: undefined

}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

window.addEventListener('resize',
    function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }
)
var colorArray = [
    '#F25CA2',
    '#0433BF',
    '#032CA6', 
    '#021859',
    '#0B9ED9',
];  
var circleArray = [];
init();
console.log();
animate();


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (i = 0; i < circleArray.length; i++)
        circleArray[i].move();
    // interactivity

}

function init(){
    circleArray = [];
    for (var i = 0; i < 250; i++) {
        var radius = 50;
        var x = Math.random() * (window.innerWidth - 2 * radius) + radius;
        var y = Math.random() * (window.innerHeight - 2 * radius) + radius;
        var dx = Math.random() * 4;
        var dy = Math.random() * 4;
        circleArray.push(new Circle(x, y, radius, dx, dy));
    }
}

function Circle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }

    this.move = function () {
        if (this.x > window.innerWidth - this.radius || this.x < this.radius) {
            this.dx = -this.dx;
        }
        if (this.y > window.innerHeight - this.radius || this.y < this.radius) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < 100)
                this.radius += 3;
        }
        else if(this.radius > 5){
            this.radius -= 1;
        }
        this.draw();
    }
}