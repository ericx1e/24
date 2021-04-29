let sketch1 = function(f) {
    let buttons = [];
    let brushColor = f.color(0);

    f.setup = function() {
        canvas = f.createCanvas(600, 700);
        canvas.position(8, 650);
        f.background(51);
        f.push();
        
        buttons.push(new ColorButton(25, 25, f.color(0, 0, 0)));
        buttons.push(new ColorButton(100, 25, f.color(255, 100, 100)));
        buttons.push(new ColorButton(175, 25, f.color(255, 150, 100)));
        buttons.push(new ColorButton(250, 25, f.color(255, 100, 150)));
        f.pop();
    };

    
    f.draw = function() {
        f.fill(255);
        f.noStroke();
        f.rect(0, 0, f.width, 100);
        buttons.forEach(button => {
            button.show();
        });

        if(f.mouseIsPressed) {
            prevMouse.x = f.mouseX;
            prevMouse.y = f.mouseY;
        }
    };

    prevMouse = {x: -1, y: -1};

    f.mouseDragged = function() {
        if(f.mouseX < 0 || f.mouseX > f.width || f.mouseY < 100 || f.mouseY > f.height) {
            return;
        }
        // f.noStroke();
        f.stroke(brushColor);
        f.strokeWeight(5);
        f.strokeCap(f.ROUND);
        f.line(prevMouse.x, prevMouse.y, f.mouseX, f.mouseY);
    }

    f.mousePressed = function() {
        buttons.forEach(button => {
            if(button.touchingMouse()) {
                brushColor = button.c;
            }
        });
    }

    function ColorButton(x, y, c) {
        this.x = x;
        this.y = y;
        this.c = c;
        this.size = 50;

        this.show = function() {
            f.fill(c);
            // f.strokeWeight(5);
            // f.stroke(100);
            f.noStroke();
            f.rect(this.x, this.y, this.size, this.size);
        }

        this.touchingMouse = function() {
            return f.mouseX < this.x+this.size && f.mouseX > x && f.mouseY < this.y+this.size && f.mouseY > this.y;
        }
    }
}
let p5_2 = new p5(sketch1);