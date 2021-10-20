//https://github.com/slowizzm

function Confetti(x, y, s) {
    this.x = x;
    this.y = y;
    this.speed = s;
    this.time = random(0, 100);
    this.color = random(confettiColor);
    this.amp = random(2, 30);
    this.phase = random(0.5, 2);
    this.size = random(width / 100 + height/100, width/50 + height/50);
    this.form = round(random(0, 1));

    this.confettiDisplay = function() {
        fill(this.color);
        noStroke();
        push();
        translate(this.x, this.y);
        translate(this.amp * sin(this.time * this.phase), this.speed * cos(2 * this.time * this.phase));
        rotate(this.time);
        rectMode(CENTER);
        scale(cos(this.time / 4), sin(this.time / 4));
        if (this.form === 0) {
            rect(0, 0, this.size, this.size / 2);
        } else {
            ellipse(0, 0, this.size);
        }
        pop();

        this.time = this.time + 0.1;

        if(this.speed < 0) {
            this.speed *= 0.8;
        }
        
        this.speed += height / 14000;

        this.y += this.speed;
    }
}