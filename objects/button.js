function Button(x, y, s, id) {
    this.x = x;
    this.y = y;
    this.w = s;
    this.h = s;
    this.id = id;

    this.show = function () {
        rectMode(CENTER);

        switch (this.id) {
            case "add":
                fill(255, 100, 100);
                break;
            case "sub":
                fill(100, 100, 255);
                break;
            case "mult":
                fill(100, 255, 100);
                break;
            case "div":
                fill(255, 100, 255);
                break;
            case "undo":
                fill(200);
                break;
            case "reset":
                fill(200);
                break;
            case "next":
                fill(200);
                break;
            case "menu":
                fill(250);
                break;
            case "?":
                fill(170);
                break;
        }

        noStroke();

        if(this.id == "?") {
            ellipse(this.x, this.y, this.w);
        } else {
            rect(this.x, this.y, this.w, this.h, this.w / 3);
        }

        fill(255);
        textAlign(CENTER, CENTER);
        strokeCap(ROUND);
        stroke(255);
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
                stroke(200);
                // strokeWeight(this.w / 12);
                line(this.x - this.w / 4, this.y - this.h / 6, this.x + this.w / 4, this.y - this.h / 6);
                line(this.x - this.w / 4, this.y, this.x + this.w / 4, this.y);
                line(this.x - this.w / 4, this.y + this.h / 6, this.x + this.w / 4, this.y + this.h / 6);
                break;
            case "?":
                textSize(this.w/1.5);
                fill(230);
                noStroke();
                textAlign(CENTER, CENTER);
                text("?", this.x, this.y);
                break;
            
            case "help":
                noFill();
                stroke(0);
                strokeWeight(5);
                arc(this.x, this.y, this.w/2, this.w/2, PI - QUARTER_PI * 1.4, QUARTER_PI * 1.4, OPEN);
                line(this.x + 40 * cos(PI - QUARTER_PI * 1.4), this.y + 40 * sin(PI - QUARTER_PI * 1.4), this.x + 40 * cos(PI - QUARTER_PI * 1.4), this.y + 40 * sin(PI - QUARTER_PI * 1.4) + 20);
                line(this.x + 40 * (cos(QUARTER_PI * 1.4)), this.y + 40 * (sin(QUARTER_PI * 1.4)), this.x + 40 * (cos(QUARTER_PI * 1.4)), this.y + 40 * (sin(QUARTER_PI * 1.4)) + 20);
                for(let i = 0; i < 3; i++) {
                    line(this.x + 40 * (cos(QUARTER_PI * 1.4)), this.y + 40 * (sin(QUARTER_PI * 1.4)) + 30 + 10 * i, this.x + 40 * (cos(PI-QUARTER_PI * 1.4)), this.y + 40 * (sin(QUARTER_PI * 1.4)) + 20 + 10 * i);
                }
                line(this.x - 15 * (cos(QUARTER_PI * 1.4)), this.y + 32.5 * (sin(QUARTER_PI * 1.4)) + 30 + 10 * 3, this.x + 40 * (cos(PI-QUARTER_PI * 1.4)), this.y + 40 * (sin(QUARTER_PI * 1.4)) + 20 + 10 * 3);
                line(this.x + 40 * (cos(PI-QUARTER_PI * 1.4)), this.y + 32.5 * (sin(QUARTER_PI * 1.4)) + 30 + 10 * 3, this.x + 40 * (cos(QUARTER_PI * 1.4)), this.y + 32.5 * (sin(QUARTER_PI * 1.4)) + 30 + 10 * 3);
                line(this.x + 40 * (cos(PI-QUARTER_PI * 1.4)) + 5, this.y + 32.5 * (sin(QUARTER_PI * 1.4)) + 30 + 10 * 4, this.x + 40 * (cos(QUARTER_PI * 1.4)) - 5, this.y + 32.5 * (sin(QUARTER_PI * 1.4)) + 30 + 10 * 4);
                break;
        }
    }

    this.touchingMouse = function () {
        return this.x - this.w / 2 < mouseX && this.x + this.w / 2 > mouseX && this.y - this.h / 2 < mouseY && this.y + this.h / 2 > mouseY;
    }

    this.update = function () {
        if (this.touchingMouse()) {
            buttonSound.play();
            if (selectedCards.length == 2) {
                let i = Math.min(selectedCards[0].i, selectedCards[1].i);
                switch (this.id) {
                    case "add":
                        prevCards = [];
                        cards.forEach(card => {
                            prevCards.push(card);
                        });
                        newCard = new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n + selectedCards[1].n, i);
                        cards.push(newCard);
                        cards.splice(cards.indexOf(selectedCards[0]), 1);
                        cards.splice(cards.indexOf(selectedCards[1]), 1);
                        selectedCards = [];
                        if(selectAfterOperation) {
                            selectedCards.push(newCard);
                        }
                        break;
                    case "sub":
                        prevCards = [];
                        cards.forEach(card => {
                            prevCards.push(card);
                        });
                        if(absoluteValue) {
                            newCard = new Card(selectedCards[1].x, selectedCards[1].y, Math.abs(selectedCards[0].n - selectedCards[1].n), i);
                        } else { 
                            newCard = new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n - selectedCards[1].n, i);
                        }
                        cards.push(newCard);
                        cards.splice(cards.indexOf(selectedCards[0]), 1);
                        cards.splice(cards.indexOf(selectedCards[1]), 1);
                        selectedCards = [];
                        if(selectAfterOperation) {
                            selectedCards.push(newCard);
                        }
                        break;
                    case "mult":
                        prevCards = [];
                        cards.forEach(card => {
                            prevCards.push(card);
                        });
                        newCard = new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n * selectedCards[1].n, i);
                        cards.push(newCard);
                        cards.splice(cards.indexOf(selectedCards[0]), 1);
                        cards.splice(cards.indexOf(selectedCards[1]), 1);
                        selectedCards = [];
                        if(selectAfterOperation) {
                            selectedCards.push(newCard);
                        }
                        break;
                    case "div":
                        prevCards = [];
                        cards.forEach(card => {
                            prevCards.push(card);
                        });
                        if(absoluteValue) {
                            if(selectedCards[0].n >= selectedCards[1].n) {
                                newCard = new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n / selectedCards[1].n, i);
                            } else {
                                newCard = new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[1].n / selectedCards[0].n, i);
                            }
                        } else { 
                            newCard = new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n / selectedCards[1].n, i);
                        }
                        cards.push(newCard);
                        cards.splice(cards.indexOf(selectedCards[0]), 1);
                        cards.splice(cards.indexOf(selectedCards[1]), 1);
                        selectedCards = [];
                        if(selectAfterOperation) {
                            selectedCards.push(newCard);
                        }
                        break;
                }

                if (cards.length == 1) {
                    if (cards[0].n == 24) {
                        scorePoint();
                        // score++;
                        // newBoard();
                    }
                }
            }
            switch (this.id) {
                case "undo":
                    cards = [];
                    selectedCards = [];
                    prevCards.forEach(card => {
                        cards.push(card);
                    });
                    break;
                case "reset":
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
                    isTutorial = true;
                    wut = true;
                    // tutorial();
                    break;
                case "help":
                    break;
            }
        }
    }
}