function Firework() {

    this.hu = random(225);
    this.particles = [];
    this.firework = new Particle(Math.random() * window.innerWidth, height, true, this.hu);
    this.exploded = false


    this.done = function(){
        if(this.particles.length === 0 && this.exploded){
            return true;
        }
        else{
            return false;
        }
    }

    this.update = function () {
        if (!this.exploded) {
            this.firework.update();
            this.firework.appylyForce(gravity);
            if (this.firework.vel.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        }
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].appylyForce(gravity);
            this.particles[i].update();

            if (this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }
    };

    this.explode = function () {
        for (let i = 0; i < 100; i++) {
            this.particles.push(new Particle(this.firework.pos.x, this.firework.pos.y, false, this.hu));
        }
    };

    this.show = function () {
        if (!this.exploded) {
            this.firework.show();
        }

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].show();
        }
    };

}