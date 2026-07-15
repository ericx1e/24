function Button(x, y, s, id) {
    this.x = x;
    this.y = y;
    this.w = s;
    this.h = s;
    this.id = id;
    this.hoverT = 0;
    this.isOp = id == "add" || id == "sub" || id == "mult" || id == "div";
    this.isUtility = id == "undo" || id == "reset" || id == "next" || id == "menu";
    this.enableT = this.isOp ? 0 : 1;

    this.label = {
        add: 'add (a)',
        sub: 'subtract (s)',
        mult: 'multiply (m)',
        div: 'divide (d)',
        undo: 'undo (u)',
        reset: 'reset (r)',
        next: 'new cards (n)',
        menu: 'settings',
        '?': 'how to play',
        soln: 'solutions',
        enter: 'enter your own cards',
        preset: 'challenge sets',
    }[id];

    this.show = function () {
        let enabled = !this.isOp || selectedCards.length == 2;
        this.enableT = lerp(this.enableT, enabled ? 1 : 0, 0.18);
        let bump = this.enableT * (1 - this.enableT) * 4; // peaks mid-transition

        let hov = this.touchingMouse() && !popup;
        this.hoverT = lerp(this.hoverT, hov ? 1 : 0, 0.25);
        let sc = (1 + 0.1 * this.hoverT - (hov && mouseIsPressed ? 0.12 : 0)) * (1 + 0.06 * bump);

        push();
        translate(this.x, this.y);
        scale(sc);
        translate(-this.x, -this.y);
        rectMode(CENTER);
        noStroke();

        if (this.isOp) {
            let muted = color(255, 255, 255, 22);
            fill(lerpColor(muted, color(PALETTE[this.id]), this.enableT));
            setShadow('rgba(0,0,0,' + 0.3 * this.enableT + ')', this.w / 6 + this.hoverT * this.w / 8, this.w / 30);
            rect(this.x, this.y, this.w, this.h, this.w / 3);
            clearShadow();
        } else if (this.isUtility) {
            fill(255, 255, 255, 12 + 32 * this.hoverT);
            rect(this.x, this.y, this.w, this.h, this.w / 3);
        } else {
            fill(255, 255, 255, 30 + 25 * this.hoverT);
            setShadow('rgba(0,0,0,0.3)', this.w / 6 + this.hoverT * this.w / 8, this.w / 30);
            ellipse(this.x, this.y, this.w);
            clearShadow();
        }

        let iconA = this.isOp ? 150 + 105 * this.enableT : 255;
        fill(255, iconA);
        textAlign(CENTER, CENTER);
        strokeCap(ROUND);
        stroke(255, iconA);
        strokeWeight(this.w / 10);
        switch (this.id) {
            case "add":
                line(this.x, this.y - this.h / 4, this.x, this.y + this.h / 4);
                line(this.x - this.w / 4, this.y, this.x + this.w / 4, this.y);
                break;
            case "sub":
                line(this.x - this.w / 4, this.y, this.x + this.w / 4, this.y);
                break;
            case "mult":
                line(this.x - this.w / 5, this.y - this.h / 5, this.x + this.w / 5, this.y + this.h / 5);
                line(this.x + this.w / 5, this.y - this.h / 5, this.x - this.w / 5, this.y + this.h / 5);
                break;
            case "div":
                line(this.x - this.w / 4, this.y, this.x + this.w / 4, this.y);
                strokeWeight(this.w / 6);
                point(this.x, this.y - this.h / 4.5);
                point(this.x, this.y + this.h / 4.5);
                break;
            case "undo":
                noFill();
                arc(this.x, this.y + this.h / 3, this.w, this.h, PI + PI / 3, -PI / 3);
                push()
                translate(this.x, this.y + this.h / 3);
                rotate(-PI / 6);
                triangle(0, 0 - this.h / 2 - this.w / 20, 0, 0 - this.h / 2 + this.w / 20, 0 - this.w / 15, 0 - this.h / 2);
                pop();
                break;
            case "reset":
                noFill();
                arc(this.x, this.y, this.w / 2, this.h / 2, 3 / 2 * PI, PI);
                triangle(this.x, this.y - this.h / 4 - this.w / 20, this.x, this.y - this.h / 4 + this.w / 20, this.x - this.w / 15, this.y - this.h / 4);
                break;
            case "next":
                noFill();
                line(this.x - this.w / 4, this.y, this.x + this.w / 4, this.y);
                triangle(this.x + this.w / 4, this.y - this.w / 20, this.x + this.w / 4, this.y + this.w / 20, this.x + this.w / 4 + this.w / 15, this.y);
                break;
            case "menu":
                noStroke();
                fill(235);
                textAlign(CENTER, CENTER);
                textFont(icons);
                textSize(this.w / 1.5);
                text('', this.x, this.y);
                break;
            case "?":
                textSize(this.w / 1.5);
                fill(235);
                noStroke();
                textFont(icons);
                textAlign(CENTER, CENTER);
                text('', this.x, this.y);
                break;
            case "soln":
                textSize(this.w / 1.5);
                fill(235);
                noStroke();
                textFont(icons);
                textAlign(CENTER, CENTER);
                text('', this.x, this.y);
                break;
            case "modes":
                noFill();
                strokeWeight(this.w / 20);
                stroke(255);
                this.setLineDash([this.w * 5 / 40, this.w * 5 / 60]); //longer stitches
                arc(this.x, this.y, this.w * 5 / 6, this.w * 5 / 6, PI / 2, 3 * PI / 2)
                this.setLineDash([]);
                arc(this.x, this.y, this.w * 5 / 6, this.w * 5 / 6, 3 * PI / 2, PI / 2)
                push();
                translate(this.x, this.y);
                line(0, 0, 0, -this.h / 4);
                rotate(PI * 7 / 4)
                line(0, 0, 0, this.h / 4);
                pop();
                break;
            case "enter":
                textSize(this.w / 1.5);
                fill(235);
                noStroke();
                textFont(icons);
                textAlign(CENTER, CENTER);
                text('', this.x, this.y);
                break;
            case "preset":
                textSize(this.w / 1.5);
                fill(235);
                noStroke();
                textFont(icons);
                textAlign(CENTER, CENTER);
                text('', this.x, this.y);
                break;
        }
        pop();

        // tooltip
        let lbl = this.label;
        if (this.isOp && selectedCards.length != 2) {
            lbl = 'select two cards first';
        }
        if (lbl && this.hoverT > 0.6 && !popup) {
            let a = (this.hoverT - 0.6) / 0.4;
            textFont(UI_FONT);
            textStyle(BOLD);
            let th = constrain(this.w / 3, 18, 26);
            textSize(th * 0.55);
            let tw = textWidth(lbl);
            let ty = this.y < height / 2 ? this.y + this.h / 2 + th : this.y - this.h / 2 - th;
            rectMode(CENTER);
            noStroke();
            fill(0, 0, 0, 200 * a);
            rect(this.x, ty, tw + th, th, th / 2);
            fill(255, 255 * a);
            textAlign(CENTER, CENTER);
            text(lbl, this.x, ty);
            textStyle(NORMAL);
        }
    }


    this.setLineDash = function (list) {
        drawingContext.setLineDash(list);
    }

    this.touchingMouse = function () {
        return this.x - this.w / 2 < mouseX && this.x + this.w / 2 > mouseX && this.y - this.h / 2 < mouseY && this.y + this.h / 2 > mouseY;
    }

    this.update = function () {
        if (this.touchingMouse()) {
            buttonSound.play();
            switch (this.id) {
                case "add":
                    applyOperation('add');
                    break;
                case "sub":
                    applyOperation('sub');
                    break;
                case "mult":
                    applyOperation('mult');
                    break;
                case "div":
                    applyOperation('div');
                    break;
                case "undo":
                    if (cards.length == 1 && cards[0].n > 23.9999 && cards[0].n < 24.0001) {
                        break;
                    }
                    cards = [];
                    selectedCards = [];
                    prevCards.forEach(card => {
                        cards.push(card);
                    });
                    break;
                case "reset":
                    if (cards.length == 1 && cards[0].n > 23.9999 && cards[0].n < 24.0001) {
                        break;
                    }
                    cards = [];
                    selectedCards = [];
                    intialCards.forEach(card => {
                        cards.push(card);
                    });
                    break;
                case "next":
                    newBoard();
                    break;
                case "menu":
                    toggleMenu();
                    break;
                case "?":
                    popup = new Popup("tutorial");
                    break;
                case "soln":
                    popup = new Popup("solution");
                    break;
                case "modes":
                    remainingCountdownFrames = 300;
                    countingDown = true;
                    break;
                case "enter":
                    popup = new Popup("enter");
                    break;
                case "preset":
                    popup = new Popup("preset");
                    break;
            }
        }
    }
}
