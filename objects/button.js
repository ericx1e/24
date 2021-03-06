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
            case "soln":
                fill(170);
                break;
            case "modes":
                fill(170);
                break;
            case "enter":
                fill(170);
                break;
            case "preset":
                fill(170);
                break;
        }

        noStroke();

        if (this.id == "?" || this.id == "soln" || this.id == "modes" || this.id == "enter" || this.id == "preset") {
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
                noStroke();
                stroke(200);
                strokeWeight(this.w / 100);
                fill(200);
                textAlign(CENTER, CENTER);
                textFont(icons);
                textSize(this.w / 1.5);
                text('\uf1de', this.x, this.y);
                // line(this.x - this.w / 4, this.y - this.h / 6, this.x + this.w / 4, this.y - this.h / 6);
                // line(this.x - this.w / 4, this.y, this.x + this.w / 4, this.y);
                // line(this.x - this.w / 4, this.y + this.h / 6, this.x + this.w / 4, this.y + this.h / 6);
                break;
            case "?":
                textSize(this.w / 1.5);
                fill(230);
                noStroke();
                textFont(icons);
                textAlign(CENTER, CENTER);
                text('\uf129', this.x, this.y);
                // text('?', this.x, this.y);
                // if(this.touchingMouse()) {
                //     fill(255);
                //     text("show instructions", mouseX, mouseY);
                // }
                break;

            case "soln":

                // fill(255);
                // noStroke();
                // rectMode(CENTER);
                // rect(this.x + this.w / 20, this.y, this.w * 3.5 / 6, this.h * 3.5 / 6, this.w / 10);
                // fill(170);
                // ellipse(this.x + this.w / 20 + this.w * 3.5 / 15, this.y, this.w / 5);
                // fill(255);
                // ellipse(this.x + this.w / 20, this.y + this.h * 3.5 / 10, this.w / 5);
                // ellipse(this.x + this.w / 20, this.y - this.h * 3.5 / 10, this.w / 5);
                // ellipse(this.x + this.w / 20 - this.w * 3.5 / 10, this.y, this.w / 5);

                textSize(this.w / 1.5);
                fill(230);
                noStroke();
                textFont(icons);
                textAlign(CENTER, CENTER);
                text('\uf0eb', this.x, this.y);
                break;

            case "modes":
                // fill(255);
                noFill();
                strokeWeight(this.w / 20);
                stroke(255);
                this.setLineDash([this.w * 5 / 40, this.w * 5 / 60]); //longer stitches
                arc(this.x, this.y, this.w * 5 / 6, this.w * 5 / 6, PI / 2, 3 * PI / 2)
                this.setLineDash([]);
                arc(this.x, this.y, this.w * 5 / 6, this.w * 5 / 6, 3 * PI / 2, PI / 2)
                // ellipse(this.x, this.y, this.w * 5 / 6, this.w * 5 / 6);

                push();
                translate(this.x, this.y);
                line(0, 0, 0, -this.h / 4);
                rotate(PI * 7 / 4)
                line(0, 0, 0, this.h / 4);
                pop();
                break;
            case "enter":
                textSize(this.w / 1.5);
                fill(230);
                noStroke();
                textFont(icons);
                textAlign(CENTER, CENTER);
                text('\uf2f6', this.x, this.y);
                break;
            case "preset":
                textSize(this.w / 1.5);
                fill(230);
                noStroke();
                textFont(icons);
                textAlign(CENTER, CENTER);
                text('\uf58d', this.x, this.y);
                break;
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
                        if (selectAfterOperation) {
                            selectedCards.push(newCard);
                        }
                        break;
                    case "sub":
                        prevCards = [];
                        cards.forEach(card => {
                            prevCards.push(card);
                        });
                        if (absoluteValue) {
                            newCard = new Card(selectedCards[1].x, selectedCards[1].y, Math.abs(selectedCards[0].n - selectedCards[1].n), i);
                        } else {
                            newCard = new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n - selectedCards[1].n, i);
                        }
                        cards.push(newCard);
                        cards.splice(cards.indexOf(selectedCards[0]), 1);
                        cards.splice(cards.indexOf(selectedCards[1]), 1);
                        selectedCards = [];
                        if (selectAfterOperation) {
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
                        if (selectAfterOperation) {
                            selectedCards.push(newCard);
                        }
                        break;
                    case "div":
                        prevCards = [];
                        cards.forEach(card => {
                            prevCards.push(card);
                        });
                        if (absoluteValue) {
                            if (selectedCards[0].n >= selectedCards[1].n) {
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
                        if (selectAfterOperation) {
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
                    // isTutorial = true;
                    popup = new Popup("tutorial");
                    // tutorial();
                    break;
                case "soln":
                    popup = new Popup("solution");
                    break;
                case "modes":
                    remainingCountdownFrames = 300;
                    countingDown = true;
                    break;
                case "enter":
                    let input;
                    try {
                        input = prompt("Enter four card numbers separated by spaces").trim().split(" ");
                    } catch {
                        input = "";
                    }
                    if (input == "") {
                        break;
                    }

                    while (input.length != 4 || isNaN(parseInt(input[0])) || isNaN(parseInt(input[1])) || isNaN(parseInt(input[2])) || isNaN(parseInt(input[3]))) {
                        input = prompt("Invalid input. Try again").trim().split(" ");
                    }

                    let inputInt = []

                    for (let i = 0; i < 4; i++) {
                        inputInt[i] = parseInt(input[i]);
                    }

                    newBoard(inputInt);
                    break;
                case "preset":
                    popup = new Popup("preset");
                    break;
            }
        }
    }
}