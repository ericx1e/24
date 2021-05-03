let sketch1 = function (f) {
    let buttons = [];
    let brushColor = f.color(0);
    let colors = [f.color(0), f.color(51), f.color(240), f.color(255, 100, 100), f.color(255, 150, 100), f.color(255, 255, 100), f.color(150, 255, 100), f.color(100, 255, 255), f.color(100, 100, 255), f.color(150, 100, 255)];

    let rSlider;
    let gSlider;
    let bSlider;
    let clearButton;
    let weightSlider;
    let canvas;
    let weight = 5;

    f.setup = function () {
        canvas = f.createCanvas(600, 700);
        // canvas.position(8, 650); 
        f.background(51);

        for (let i = 0; i < colors.length; i++) {
            let x = i * 25;
            let y = 0;
            let w = 25;
            let h = 100;
            buttons.push(new Button(x, y, w, h, colors[i]));
        }

        rSlider = f.createSlider(0, 255, 0);
        gSlider = f.createSlider(0, 255, 0);
        bSlider = f.createSlider(0, 255, 0);
        weightSlider = f.createSlider(1, 20, 5, 0.5);
        clearButton = f.createButton('clear');
        clearButton.mousePressed(function () { f.background(51) });

        buttons.push(new ColorButton(25, 25, f.color(0, 0, 0)));
        buttons.push(new ColorButton(100, 25, f.color(255, 100, 100)));
        buttons.push(new ColorButton(175, 25, f.color(255, 150, 100)));
        buttons.push(new ColorButton(250, 25, f.color(255, 100, 150)));
    };


    f.draw = function () {
        f.fill(255);
        f.noStroke();
        f.rect(0, 0, f.width, 100);
        buttons.forEach(button => {
            button.show();
        });

        prevMouse.x = f.mouseX;
        prevMouse.y = f.mouseY;

        weight = weightSlider.value();
    };

    prevMouse = { x: -1, y: -1 };

    f.mouseDragged = function () {
        if (f.mouseX < 0 || f.mouseX > f.width || f.mouseY < 100 || f.mouseY > f.height) {
            return;
        }
        // f.noStroke();
        f.stroke(brushColor);
        f.strokeWeight(weight);
        f.strokeCap(f.ROUND);
        f.line(prevMouse.x, prevMouse.y, f.mouseX, f.mouseY);
    }

    f.mousePressed = function () {
        buttons.forEach(button => {
            if (button.touchingMouse()) {
                brushColor = button.c;
            }
        });
    }

    function Button(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;

        this.show = function () {
            f.fill(c);
            // f.strokeWeight(5);
            // f.stroke(100);
            f.noStroke();
            f.rect(this.x, this.y, this.w, this.h);
        }

        this.touchingMouse = function () {
            return f.mouseX < this.x + this.w && f.mouseX > x && f.mouseY < this.y + this.h && f.mouseY > this.y;
        }
    }
}
let p5_1 = new p5(sketch1);