

let cards = [];
let prevCards = [];
let selectedCards = [];
let intialCards = [];
let prevBoard = [];
let score = 0;
let info = false;
let buttons = [];
let buttonIds = ["add", "sub", "mult", "div", "undo", "reset"];

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.position(0, 0);

    for(let i = 0; i < buttonIds.length; i++) {
        buttons.push(new Button(width - 700 + 125 * i, 50, buttonIds[i]));
    }

    // cards = [new Card(100, 100, 7),new Card(100, 100, 7),new Card(100, 100, 3),new Card(100, 100, 3)];
    // console.log(checkPossible());

    newBoard();
    prevBoard = cards;

    // for(let n = 0; n < 4; n++) {
    //     for(let i = 1; i <= 13; i++) {
    //         cards.push(new Card(random(0, width-50), random(0, height-50), i));
    //     }
    // }
}

function windowResized() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.position(0, 0);
}


function draw() {
    background(51);

    
    let flag = false;
    for (let i = cards.length - 1; i >= 0; i--) {
        let card = cards[i];
        if (!flag && card.update()) {
            flag = true;
            cards.splice(i, 1);
            cards.push(card);
            // cards.splice(0, 0, card);
        }
    }
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        card.show();
    }



    rectMode(CORNER);

    noStroke();
    fill(70);
    rect(0, 0, width, 100);
    textSize(30);
    fill(255);
    noStroke();
    textAlign(LEFT, CENTER);
    text("score: " + score, 50, 50);


    buttons.forEach(button => {
        button.show();
        button.update();
    });


    noCursor();
    if (mouseIsPressed) {
        stroke(255, 50, 50);
        strokeWeight(15);
    } else {
        stroke(255, 0, 0);
        strokeWeight(10);
    }

    line(mouseX, mouseY, pmouseX, pmouseY);
}

function touchStarted() {
    let flag = false;
    for (let i = cards.length - 1; i >= 0; i--) {
        let card = cards[i];
        if (!flag && card.touchingMouse()) {
            flag = true;
            // card.selected = !card.selected;
            cards.splice(i, 1);
            cards.push(card);
            if (selectedCards.includes(card)) {
                selectedCards.splice(selectedCards.indexOf(card), 1);
            } else {
                selectedCards.push(card);
                if (selectedCards.length > 2) {
                    selectedCards.splice(0, 1);
                }

            }
        }
    }
    return false;
}

function keyTyped() {
    if (key == ' ') {
    }

    if (key == 'n') {
        newBoard();
    }

    if(selectedCards.length == 2) {
        if(key == 'a' || key == '+') {
            prevCards = [];
            cards.forEach(card => {
                prevCards.push(card);
            });
            cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n + selectedCards[1].n));
            cards.splice(cards.indexOf(selectedCards[0]), 1);
            cards.splice(cards.indexOf(selectedCards[1]), 1);
            selectedCards = [];
        }
        
        if(key == 's' || key == '-') {
            prevCards = [];
            cards.forEach(card => {
                prevCards.push(card);
            });
            cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n - selectedCards[1].n));
            cards.splice(cards.indexOf(selectedCards[0]), 1);
            cards.splice(cards.indexOf(selectedCards[1]), 1);
            selectedCards = [];
        }

        if(key == 'd' || key == '*') {
            prevCards = [];
            cards.forEach(card => {
                prevCards.push(card);
            });
            cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n / selectedCards[1].n));
            cards.splice(cards.indexOf(selectedCards[0]), 1);
            cards.splice(cards.indexOf(selectedCards[1]), 1);
            selectedCards = [];
        }

        if(key == 'm' || key == '/') {
            prevCards = [];
            cards.forEach(card => {
                prevCards.push(card);
            });
            cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n * selectedCards[1].n));
            cards.splice(cards.indexOf(selectedCards[0]), 1);
            cards.splice(cards.indexOf(selectedCards[1]), 1);
            selectedCards = [];
        }

        if (cards.length == 1) {
            if (cards[0].n == 24) {
                score++;
                newBoard();
            }
        }
    }

    if (key == 'u') {
        cards = [];
        selectedCards = [];
        prevCards.forEach(card => {
            cards.push(card);
        });
    }

    if (key == 'r') {
        cards = [];
        selectedCards = [];
        intialCards.forEach(card => {
            cards.push(card);
        });
    }

    if (key == 'p') {
        cards = [];
        selectedCards = [];
        prevBoard.forEach(card => {
            cards.push(card);
        });
    }

}

function touchMoved() {
    return false;
}

function newBoard() {
    prevBoard = [];

    intialCards.forEach(card => {
        prevBoard.push(card);
    });

    cards = [];
    for (let i = 0; i < 4; i++) {
        cards.push(new Card(random(0, width - 125), random(0, height - 175), Math.floor(random(1, 14))));
    }
    while (!checkPossible()) {
        cards = [];
        for (let i = 0; i < 4; i++) {
            cards.push(new Card(random(0, width - 125), random(0, height - 175), Math.floor(random(1, 14))));
        }
    }

    prevCards = [];
    cards.forEach(card => {
        prevCards.push(card);
    });

    intialCards = [];
    cards.forEach(card => {
        intialCards.push(card);
    });

    selectedCards = [];

    // console.log(checkPossible());
}

function permutator(inputArr) {
    var results = [];

    function permute(arr, memo) {
        var cur, memo = memo || [];

        for (var i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }

        return results;
    }

    return permute(inputArr);
}

function Card(x, y, n) {
    this.x = x;
    this.y = y;
    this.w = 125;
    this.h = 175;
    this.n = n;
    this.lifted = false;
    this.selected = false;

    this.show = function () {
        // noStroke();
        let tx;
        // switch(this.n) {
        //     case 1:
        //         tx = 'A';
        //         break;
        //     case 11:
        //         tx = 'J';
        //         break;
        //     case 12:
        //         tx = 'Q';
        //         break;
        //     case 13:
        //         tx = 'K';
        //         break;
        //     default:
        //         break;
        // }
        tx = Math.round(n * 100) / 100;

    rectMode(CORNER);

        this.selected = selectedCards.includes(this);

        if (this.lifted) {
            noStroke();
            fill(17, 100);
            rect(this.x, this.y, this.w, this.h, 20);
            if (this.selected) {
                strokeWeight(5);
                stroke(255, 50, 50);
            } else {
                strokeWeight(2);
                stroke(17);
            }
            fill(255);
            rect(this.x + 5, this.y - 3, this.w, this.h, 20);
            fill(255, 100, 100);
            noStroke();
            textSize(this.w / 2);
            textAlign(CENTER, CENTER)
            text(tx, this.x + 5 + this.w / 2, this.y - 3 + this.h / 2);

            if (this.selected) {
                noStroke();
                fill(255, 50, 50);
                textSize(20);
                text(selectedCards.indexOf(this) + 1, this.x + 5 + 20, this.y - 3 + 20);
            }
        } else {
            if (this.selected) {
                strokeWeight(5);
                stroke(255, 50, 50);
            } else {
                strokeWeight(2);
                stroke(17);
            }
            fill(255);
            rect(this.x, this.y, this.w, this.h, 20);
            fill(255, 100, 100);
            noStroke();
            textSize(this.w / 2);
            textAlign(CENTER, CENTER)
            text(tx, this.x + this.w / 2, this.y + this.h / 2);

            if (this.selected) {
                noStroke();
                fill(255, 50, 50);
                textSize(20);
                text(selectedCards.indexOf(this) + 1, this.x + 20, this.y + 20);
            }
        }

    }

    this.update = function () {
        if (this.lifted) {
            this.x += mouseX - pmouseX;
            this.y += mouseY - pmouseY;
        }

        // this.x = Math.max(this.x, 0);
        // this.x = Math.min(this.x, width - this.w);
        // this.y = Math.max(this.y, 0);
        // this.y = Math.min(this.y, height - this.h);

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

function Button(x, y, id) {
    this.x = x;
    this.y = y;
    this.w = 75;
    this.h = 75;
    this.id = id;

    this.show = function() {
        rectMode(CENTER);

        switch(this.id) {
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
                fill(220);
                break;
            case "reset":
                fill(220);
                break;
        }

        noStroke();

        rect(this.x, this.y, this.w, this.h, 20);

        fill(255);
        textAlign(CENTER, CENTER);
        strokeCap(ROUND);
        stroke(255);
        strokeWeight(this.w/10);
        switch(this.id) {
            case "add":
                line(this.x, this.y - this.h/4, this.x, this.y + this.h/4);
                line(this.x - this.w/4, this.y, this.x + this.w/4, this.y);
                break;
            case "sub":
                line(this.x - this.w/4, this.y, this.x + this.w/4, this.y);
                break;
            case "mult":
                line(this.x - this.w/5, this.y - this.h/5, this.x + this.w/5, this.y + this.h / 5);
                line(this.x + this.w/5, this.y - this.h/5, this.x - this.w/5, this.y + this.h / 5);
                break;
            case "div":
                line(this.x - this.w/4, this.y, this.x + this.w/4, this.y);
                strokeWeight(12);
                line(this.x, this.y - this.h/4.5, this.x, this.y - this.h/4.5);
                line(this.x, this.y + this.h/4.5, this.x, this.y + this.h/4.5);
                break;
            case "undo":
                noFill();
                line(this.x - this.w/4, this.y, this.x + this.w/4, this.y);
                triangle(this.x - this.w/4, this.y - this.w/20, this.x - this.w/4, this.y + this.w/20, this.x - this.w/4 - this.w/15, this.y);
                break;
            case "reset":
                noFill();
                arc(this.x, this.y, this.w/2, this.h/2, 3/2*PI, PI);
                triangle(this.x, this.y - this.h/4 - this.w/20, this.x, this.y - this.h/4 + this.w/20, this.x - this.w/15, this.y - this.h/4);
                break;
        }
    }

    this.touchingMouse = function () {
        return this.x - this.w/2 < mouseX && this.x + this.w/2 > mouseX && this.y - this.h / 2< mouseY && this.y + this.h / 2> mouseY;
    }

    this.update = function() {
        if(this.touchingMouse() && mouseIsPressed) {
            if(selectedCards.length == 2) {
                switch(this.id) {
                    case "add":
                        prevCards = [];
                        cards.forEach(card => {
                            prevCards.push(card);
                        });
                        cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n + selectedCards[1].n));
                        cards.splice(cards.indexOf(selectedCards[0]), 1);
                        cards.splice(cards.indexOf(selectedCards[1]), 1);
                        selectedCards = [];
                        break;
                    case "sub":
                        prevCards = [];
                        cards.forEach(card => {
                            prevCards.push(card);
                        });
                        cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n - selectedCards[1].n));
                        cards.splice(cards.indexOf(selectedCards[0]), 1);
                        cards.splice(cards.indexOf(selectedCards[1]), 1);
                        selectedCards = [];
                        break;
                    case "mult":
                        prevCards = [];
                        cards.forEach(card => {
                            prevCards.push(card);
                        });
                        cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n * selectedCards[1].n));
                        cards.splice(cards.indexOf(selectedCards[0]), 1);
                        cards.splice(cards.indexOf(selectedCards[1]), 1);
                        selectedCards = [];
                        break;
                    case "div":
                        prevCards = [];
                        cards.forEach(card => {
                            prevCards.push(card);
                        });
                        cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n / selectedCards[1].n));
                        cards.splice(cards.indexOf(selectedCards[0]), 1);
                        cards.splice(cards.indexOf(selectedCards[1]), 1);
                        selectedCards = [];
                        break;
                }

                if (cards.length == 1) {
                    if (cards[0].n == 24) {
                        score++;
                        newBoard();
                    }
                }
            }
            switch(this.id) {
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
            }
        }
    }
}