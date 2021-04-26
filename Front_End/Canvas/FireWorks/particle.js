function Particle(x, y, firework, hu){
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifeSpan = 225;
    this.hu = hu;
    if(this.firework){
        this.vel = createVector(0, random(-20, -10));
    }
    else{
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(10, 30));
    }
    this.acc = createVector(0, 0);
    
    this.appylyForce = function(force){
        this.acc.add(force);
    }

    this.update = function(){
        if(!this.firework){
            this.vel.mult(0.9);
            this.lifeSpan -= 2.25;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.done = function () {
        if (this.lifeSpan < 0) {
            return true;
        } else {
            return false;
        }
    }
    
    this.show = function(){
        colorMode(HSB);
        if(!this.firework){
            strokeWeight(2);
            stroke(this.hu, 500, 500, this.lifeSpan);
            this.vel.mult(0.85);
        }
        else{
            strokeWeight(4);
            stroke(this.hu, 225, 225);
        }
        point(this.pos.x, this.pos.y);
    }
}