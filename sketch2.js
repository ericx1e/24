let sketch2 = function(s) {
    let texts = [];
    let gravity = 0.5;
    let x = 50;
    s.setup = function() {
        canvas = s.createCanvas(800, 600);
    }

    s.draw = function() {
        s.colorMode(s.RGB);
        s.background(100);
        // canvas.position(mouseX, mouseY);
        for (let i = 0; i < texts.length; i++) {
            const text = texts[i];
            text.show();
            text.update();
            if(text.y > s.height) {
                if(text.bounces > 0) {
                    text.yv *= -text.restitution;
                    text.y += text.yv;
                    text.rotV = s.random(-0.2, 0.2);
                    text.bounces--;
                } else {
                    texts.splice(i, 1);
                    i--;
                }
            }
        }
        if(x>=50) {
            x-=(x-50)/100;
        }
        s.noStroke();
        s.fill(255);
        s.triangle(x-10, 0, x+10, 0, x, 20);
    }

    s.keyPressed = function() {
        if(s.key.length == 1) {
            texts.push(new FallingText(s.key, x));
            x+=50;
        }
    }

    function FallingText(char, x) {
        this.x = x;
        this.y = -10;
        this.yv = 0;
        this.char = char;
        this.bounces = 2;
        this.restitution = s.random(0.3 , 0.7);
        this.rotV = s.random(-0.2, 0.2);
        this.rot = 0;
        
        this.show = function() {
            let ascii = char.charCodeAt(0);
            let c = s.map(ascii, 32, 126, 0, 255);
            s.colorMode(s.HSB);
            s.fill(c, 255, 255);
            s.noStroke();
            s.textSize(50);
            s.push();
            s.translate(this.x, this.y);
            s.rotate(this.rot);
            s.textAlign(s.CENTER, s.CENTER);
            s.text(this.char, 0, 0);
            s.pop();
        }

        this.update = function() {
            this.y += this.yv;
            this.yv += gravity;
            this.rot += this.rotV;
        }
    }
}
let p5_2 = new p5(sketch2);