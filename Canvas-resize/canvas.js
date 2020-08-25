function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d')

// ========================================================================================================
function Circle(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
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

        this.draw();
    }
}

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


var circleArray = [];

for (var i = 0; i < 50; i++) {
    var radius = 50;
    var x = Math.random() * (window.innerWidth - 2 * radius) + radius;
    var y = Math.random() * (window.innerHeight - 2 * radius) + radius;
    var dx = Math.random() * 4;
    var dy = Math.random() * 4;
    var color = getRandomColor();
    circleArray.push(new Circle(x, y, radius, dx, dy, color));
}


animate();


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (i = 0; i < circleArray.length; i++)
        circleArray[i].move();
    // interactivity

}