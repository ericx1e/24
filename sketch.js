let sketch = function (p) {
    p.setup = function () {
        p.createCanvas(500, 500);

    };

    let balls = [];

    p.draw = function () {
        p.colorMode(p.RGB);
        p.background(51);
        for (let i = 0; i < balls.length; i++) {
            const ball = balls[i];
            ball.move();
            ball.show();
            if (ball.x < -ball.size || ball.x > p.width + ball.size || ball.size <= 0) {
                balls.splice(i, 1);
                i--;
            }

        }

    };

    p.mouseDragged = function () {
        p.noStroke();
        balls.push(new Ball(p.mouseX, p.mouseY));
    }

    function Ball(x, y) {
        this.x = x;
        this.y = y;
        this.xv = p.random(-5, 5);
        this.yv = 0;
        this.size = 50;
        this.color = p.color(p.random(0, 255), 255, 255);
        this.move = function () {
            this.x += this.xv;
            this.y += this.yv;
            this.yv = this.yv + 0.5;
            this.size -= 0.2;
            if (this.y + this.size / 2 > p.height) {
                this.yv = -this.yv * p.random(0.5, 0.9);
                this.y += this.yv;
            }
        }
        this.show = function () {
            p.colorMode(p.HSB);
            p.fill(this.color);
            p.noStroke();
            p.ellipse(this.x, this.y, this.size, this.size);
        }
    }
}
let p5_0 = new p5(sketch);