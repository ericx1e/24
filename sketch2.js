

let cards = [];
let prevCards = [];
let selectedCards = [];
let intialCards = [];
let prevBoard = [];
let score = 0;
let info = false;
let buttons = [];
let buttonIds = ["add", "sub", "mult", "div", "undo", "reset", "next", "menu"];
let buttonPanelH;
let menuOpen = false;
let menuX, menuY;
let menuW;
let menuH;
let canvas;
let menuButtons = [];
let menuButtonIds = ["randomloc", "allpossible", "confetti", "facenumbers"];
let spawnRandomLocation = true;
let allPossible = true;
let isConfetti = true;
let faceNumbers = true;

let confettiColor;
let confetti = [];

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.position(0, 0);
    confettiColor = [color('#00aeef'), color('#ec008c'), color('#72c8b6'), color('#d198f9')];
    initialize();

    // console.log(checkPossible());

    newBoard();
    // cards = [new Card(width/2, height/2, 24)];
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
    initialize();
}

function initialize() {
    buttonPanelH = (width + 0.25 * height) / 15;

    menuW = (2 * width + height) / 10;
    menuX = width;
    menuY = buttonPanelH;
    menuH = height - buttonPanelH;

    buttons = [];
    for (let i = 0; i < buttonIds.length; i++) {
        buttons.push(new Button(width - buttonPanelH * (buttonIds.length - 0.5) + buttonPanelH * i, buttonPanelH / 2, buttonPanelH * 4 / 5, buttonIds[i]));
    }

    menuButtons = [];
    for (let i = 0; i < menuButtonIds.length; i++) {
        menuButtons.push(new SlidingButton(width + menuW * 3 / 4, buttonPanelH * 1.5 + buttonPanelH / 2 * i, buttonPanelH / 2, menuButtonIds[i]));
    }

    // for (let i = 0; i < cards.length; i++) {
    //     prevCards[i] = new Card(Math.min(prevCards[i].x, width-prevCards[i].w), Math.min(prevCards[i].y, height - prevCards[i].h), prevCards[i].n);
    // }

    // for (let i = 0; i < cards.length; i++) {
    //     intialCards[i] = new Card(Math.min(intialCards[i].x, width-intialCards[i].w), Math.min(intialCards[i].y, height - intialCards[i].h), intialCards[i].n);
    // }

    // for (let i = 0; i < cards.length; i++) {
    //     cards[i] = new Card(Math.min(cards[i].x, width-cards[i].w), Math.min(cards[i].y, height - cards[i].h), cards[i].n);
    // }

    newBoard();
}


function draw() {
    background(51);


    let flag = false;
    if (!menuOpen) {
        for (let i = cards.length - 1; i >= 0; i--) {
            let card = cards[i];
            if (!flag && card.update()) {
                flag = true;
                cards.splice(i, 1);
                cards.push(card);
                // cards.splice(0, 0, card);
            }
        }
    }
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        card.show();
    }

    if (menuOpen) {
        menuX = lerp(menuX, width - menuW, 0.1);
    } else {
        menuX = lerp(menuX, width, 0.1);
    }

    fill(0, 100);
    noStroke();
    rectMode(CORNER);
    rect(menuX, menuY, menuW, menuH);

    menuButtons.forEach(button => {
        if (menuOpen) {
            button.x += lerp(menuX, width - menuW, 0.1) - menuX;
            button.buttonX += lerp(menuX, width - menuW, 0.1) - menuX;
        } else {
            button.x += lerp(menuX, width, 0.1) - menuX;
            button.buttonX += lerp(menuX, width, 0.1) - menuX;
        }
        // button.buttonX = menuX + menuW / 2;
        button.update();
        button.show();
    });



    //Button panel
    rectMode(CORNER);
    noStroke();
    fill(70);
    rect(0, 0, width, buttonPanelH);
    textSize(buttonPanelH / 2);
    fill(255);
    noStroke();
    textAlign(LEFT, CENTER);
    text(score, buttonPanelH / 2, buttonPanelH / 2);


    buttons.forEach(button => {
        button.show();
    });

    confetti.forEach(c => {
        c.confettiDisplay();
    });

    for (let i = 0; i < confetti.length; i++) {
        if (confetti[i].y > height * 2) {
            confetti.splice(i, 1);
            i--;
        }
    }

    if (confetti.length < 75 && confetti.length > 0) {
        newBoard();
    }

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
    buttons.forEach(button => {
        button.update();
    });

    if (menuOpen) {
        menuButtons.forEach(button => {
            button.click();
        });
    }

    if (menuOpen) {
        if (mouseX < width - menuW) {
            toggleMenu();
        }
        return false;
    }
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

    if (selectedCards.length == 2) {
        if (key == 'a' || key == '+') {
            prevCards = [];
            cards.forEach(card => {
                prevCards.push(card);
            });
            cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n + selectedCards[1].n));
            cards.splice(cards.indexOf(selectedCards[0]), 1);
            cards.splice(cards.indexOf(selectedCards[1]), 1);
            selectedCards = [];
        }

        if (key == 's' || key == '-') {
            prevCards = [];
            cards.forEach(card => {
                prevCards.push(card);
            });
            cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n - selectedCards[1].n));
            cards.splice(cards.indexOf(selectedCards[0]), 1);
            cards.splice(cards.indexOf(selectedCards[1]), 1);
            selectedCards = [];
        }

        if (key == 'd' || key == '/') {
            prevCards = [];
            cards.forEach(card => {
                prevCards.push(card);
            });
            cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n / selectedCards[1].n));
            cards.splice(cards.indexOf(selectedCards[0]), 1);
            cards.splice(cards.indexOf(selectedCards[1]), 1);
            selectedCards = [];
        }

        if (key == 'm' || key == '*') {
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
                scorePoint();
                // score++;
                // newBoard();
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
    confetti = [];
    prevBoard = [];

    intialCards.forEach(card => {
        prevBoard.push(card);
    });

    cards = [];

    if (spawnRandomLocation) {
        for (let i = 0; i < 4; i++) {
            let h = (width + height) / 10;
            let w = h / 7 * 5;
            let randX = random(0, width - w);
            let randY = random(buttonPanelH, height - h);
            while (locationTaken(randX, randY)) {
                randX = random(0, width - w);
                randY = random(buttonPanelH, height - h);
            }
            cards.push(new Card(randX, randY, Math.floor(random(1, 14))));
        }
        // cards = [new Card(100, 100, 1),new Card(200, 100, 3),new Card(300, 100, 4),new Card(400, 100, 6)];

        if (allPossible) {
            while (checkPossible() == 0) {
                cards = [];
                for (let i = 0; i < 4; i++) {
                    let h = (width + height) / 10;
                    let w = h / 7 * 5;
                    let randX = random(0, width - w);
                    let randY = random(buttonPanelH, height - h);
                    while (locationTaken(randX, randY)) {
                        randX = random(0, width - w);
                        randY = random(buttonPanelH, height - h);
                    }
                    cards.push(new Card(randX, randY, Math.floor(random(1, 14))));
                }
            }
        }
    } else {
        for (let i = 0; i < 4; i++) {
            let h = (width + height) / 10;
            let w = h / 7 * 5;
            cards.push(new Card(width / 8 * i + width / 4 + (width / 8 - w) / 2, height / 2 + buttonPanelH / 2 - h / 2, Math.floor(random(1, 14))));
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

function locationTaken(x, y) {
    let result = false;
    cards.forEach(card => {
        if (x > card.x - card.w && x < card.x + card.w && y > card.y - card.h && y < card.y + card.h) {
            result = true;
        }
    });
    return result;
}

function scorePoint() {
    score++;
    if (isConfetti) {
        for (let i = 0; i < 150; i++) {
            confetti[i] = new Confetti(random(0, width), random(height / 2, height * 2), -height / 7);
        }
    } else {
        newBoard();
    }

}

function toggleMenu() {
    menuOpen = !menuOpen;
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

function Card(x, y, n) {
    this.x = x;
    this.y = y;
    this.h = (width + height) / 10;
    this.w = this.h / 7 * 5;
    // this.w = 125;
    // this.h = 175;
    this.n = n;
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

        this.selected = selectedCards.includes(this);
        if (n == 24 && cards.length == 1) {
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
            if (n == 24 && cards.length == 1) {
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
            if (n == 24 && cards.length == 1) {
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

            if (this.selected) {
                noStroke();
                fill(255, 50, 50);
                textSize(this.w / 5);
                text(selectedCards.indexOf(this) + 1, this.x + this.w / 5, this.y + this.w / 5);
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
        }

        noStroke();

        rect(this.x, this.y, this.w, this.h, this.w / 3);

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
        }
    }

    this.touchingMouse = function () {
        return this.x - this.w / 2 < mouseX && this.x + this.w / 2 > mouseX && this.y - this.h / 2 < mouseY && this.y + this.h / 2 > mouseY;
    }

    this.update = function () {
        if (this.touchingMouse()) {
            if (selectedCards.length == 2) {
                switch (this.id) {
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
            }
        }
    }
}

function SlidingButton(x, y, w, id) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = this.w / 2;
    this.toggle = false; //false is left, true is right
    this.buttonX = this.x + this.w / 4;
    this.color = 150;
    switch (id) {
        case "randomloc":
            this.toggle = spawnRandomLocation;
            break;
        case "allpossible":
            this.toggle = allPossible;
            break;
        case "confetti":
            this.toggle = isConfetti;
            break;
        case "facenumbers":
            this.toggle = faceNumbers;
            break;
    }

    this.show = function () {
        let tx = "";
        textAlign(RIGHT, CENTER);
        switch (id) {
            case "randomloc":
                tx = "Random Card Locations";
                break;
            case "allpossible":
                tx = "Only possible combinations";
                break;
            case "confetti":
                tx = "Confetti";
                break;
            case "facenumbers":
                tx = "Face card numbers";
                break;
        }

        fill(240);
        textSize(this.h / 1.5);
        text(tx, this.x - this.h * 1.25, this.y);

        rectMode(CENTER);
        noStroke();
        fill(this.color, this.color, this.color);
        rect(this.x, this.y, this.w, this.h, this.h / 2);
        fill(200);
        ellipse(this.buttonX, this.y, this.h * 9 / 10, this.h * 9 / 10);

    }

    this.update = function () {
        if (this.toggle) {
            this.buttonX = lerp(this.buttonX, this.x + this.w / 4, 0.1);
            this.color += 4 * (lerp(this.buttonX, this.x + this.w / 4, 0.2) - this.buttonX);
        } else {
            this.buttonX = lerp(this.buttonX, this.x - this.w / 4, 0.1);
            this.color += 4 * (lerp(this.buttonX, this.x - this.w / 4, 0.2) - this.buttonX);
        }
        switch (id) {
            case "randomloc":
                spawnRandomLocation = this.toggle;
                break;
            case "allpossible":
                allPossible = this.toggle;
                break;
            case "confetti":
                isConfetti = this.toggle;
                break;
            case "facenumbers":
                faceNumbers = this.toggle;
                break;
        }
    }

    this.click = function () {
        if (this.touchingMouse()) {
            this.toggle = !this.toggle;
        }
    }

    this.touchingMouse = function () {
        return this.x - this.w / 2 < mouseX && this.x + this.w / 2 > mouseX && this.y - this.h / 2 < mouseY && this.y + this.h / 2 > mouseY;
    }
}