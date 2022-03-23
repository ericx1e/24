function Card(x, y, n, i) {
    this.x = x;
    this.y = y;
    this.h = (width + height) / 10;
    this.w = this.h / 7 * 5;
    // this.w = 125;
    // this.h = 175;
    this.n = n;
    this.i = i;
    this.lifted = false;
    this.selected = false;

    this.show = function () {
        // noStroke();
        let tx;
        tx = Math.round(n * 100) / 100;
        if (!faceNumbers) {
            switch (this.n) {
                case 1:
                    tx = 'A';
                    break;
                case 11:
                    tx = 'J';
                    break;
                case 12:
                    tx = 'Q';
                    break;
                case 13:
                    tx = 'K';
                    break;
            }
        }

        rectMode(CORNER);
        textFont('Helvetica');

        this.selected = selectedCards.includes(this);
        if (cards[0].n > 23.9999 && cards[0].n < 24.0001 && cards.length == 1) {
            this.selected = false;
            this.lifted = false;
        }

        if (this.lifted) {
            noStroke();
            fill(17, 100);
            rect(this.x, this.y, this.w, this.h, this.w / 5);
            if (this.selected) {
                strokeWeight(5);
                stroke(255, 50, 50);
            } else {
                strokeWeight(2);
                stroke(17);
            }
            fill(255);
            rect(this.x + 5, this.y - 3, this.w, this.h, this.w / 5);
            fill(255, 100, 100);
            noStroke();
            textSize(this.w / 2);
            textAlign(CENTER, CENTER)
            text(tx, this.x + 5 + this.w / 2, this.y - 3 + this.h / 2);

            noStroke();
            fill(200);
            textSize(this.w / 5);
            text(i, this.x + 4 * this.w / 5 + 5, this.y + this.w / 5 - 3);

            if (this.selected) {
                noStroke();
                fill(255, 50, 50);
                textSize(this.w / 5);
                text(selectedCards.indexOf(this) + 1, this.x + 5 + this.w / 5, this.y - 3 + this.w / 5);
            }
        } else {
            if (this.selected) {
                strokeWeight(5);
                stroke(255, 50, 50);
            } else {
                strokeWeight(2);
                stroke(17);
            }
            if (cards[0].n > 23.9999 && cards[0].n < 24.0001 && cards.length == 1) {
                for (let i = 0; i < 20; i++) {
                    stroke(255, 255, 0, 20);
                    strokeWeight(20 - i);
                    noFill();
                    rect(this.x, this.y, this.w, this.h, this.w / 5);
                }
                fill(255, 255, 0, 80);
                stroke(255, 255, 0);
                strokeWeight(7);
            }
            fill(255);
            rect(this.x, this.y, this.w, this.h, this.w / 5);
            textAlign(CENTER, CENTER);
            textSize(this.w / 2);
            if (cards[0].n > 23.9999 && cards[0].n < 24.0001 && cards.length == 1) {
                for (let i = 0; i < 10; i++) {
                    stroke(255, 255, 0, 15);
                    strokeWeight(10 - i);
                    fill(255, 255, 0);
                    text(tx, this.x + this.w / 2, this.y + this.h / 2);
                }
            } else {
                fill(255, 100, 100);
                noStroke();
                text(tx, this.x + this.w / 2, this.y + this.h / 2);
            }

            noStroke();
            fill(200);
            textSize(this.w / 5);
            text(i, this.x + 4 * this.w / 5, this.y + this.w / 5);

            if (this.selected) {
                noStroke();
                fill(255, 50, 50);
                textSize(this.w / 5);
                text(selectedCards.indexOf(this) + 1, this.x + this.w / 5, this.y + this.w / 5);
            }
        }

    }

    this.update = function () {
        if (isTutorial) {
            return;
        }
        if (this.lifted) {
            this.x += mouseX - pmouseX;
            this.y += mouseY - pmouseY;
        }

        this.x = Math.max(this.x, 0);
        this.x = Math.min(this.x, width - this.w);
        this.y = Math.max(this.y, buttonPanelH);
        this.y = Math.min(this.y, height - this.h);

        this.lifted = mouseIsPressed && this.touchingMouse();

        // if(this.lifted) {
        //     this.x += mouseX-pmouseX;
        //     this.y += mouseY-pmouseY;
        // }
        return this.lifted; //So you can only life one card at a time
    }

    this.touchingMouse = function () {
        return this.x < mouseX && this.x + this.w > mouseX && this.y < mouseY && this.y + this.h > mouseY;
    }
}