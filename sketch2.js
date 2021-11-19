

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
let menuSlidingButton = [];
let menuButtonIds = ["randomloc", "allpossible", "confetti", "facenumbers", "autoselect", "absolutevalue"];
let spawnRandomLocation = true;
let allPossible = true;
let isConfetti = true;
let faceNumbers = true;
let selectAfterOperation = false;
let isTutorial = true;
let absoluteValue = false;
let ericLink;

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
    if(ericLink!=null) {
        ericLink.remove();
    }
    ericLink = createA('https://github.com/ericx1e', 'made by Eric Xie', '_blank');
    ericLink.style('font-size', width/50 + 'px');
    ericLink.style('color', '#ff0000');
    ericLink.position(width/2 - 6.5*width/100, height/2 + height*9.5/25 );
    ericLink.hide();

    menuW = (2 * width +  2 * height) / 10;
    menuX = width;
    menuY = buttonPanelH;
    menuH = height - buttonPanelH;

    buttons = [];
    for (let i = 0; i < buttonIds.length; i++) {
        buttons.push(new Button(width - buttonPanelH * (buttonIds.length - 0.5) + buttonPanelH * i, buttonPanelH / 2, buttonPanelH * 4 / 5, buttonIds[i]));
    }
    buttons.push(new Button(buttonPanelH / 2, height -  buttonPanelH / 2, buttonPanelH/2, "?"));


    menuSlidingButton = [];
    for (let i = 0; i < menuButtonIds.length; i++) {
        menuSlidingButton.push(new SlidingButton(width + menuW * 3 / 4, buttonPanelH + menuW / 6 * (i + 1), menuW / 7, menuButtonIds[i]));
    }

    // for (let i = 0; i < cards.length; i++) {
    //     prevCards[i] = new Card(Math.min(prevCards[i].x, width-prevCards[i].w), Math.min(prevCards[i].y, height - prevCards[i].h), prevCards[i].n);
    // }

    // for (let i = 0; i < cards.length; i++) {
    //     intialCards[i] = new Card(Math.min(intialCards[i].x, width-intialCards[i].w), Math.min(intialCards[i].y, height - intialCards[i].h), intialCards[i].n);
    // }

    for (let i = 0; i < cards.length; i++) {
        cards[i] = new Card(Math.min(cards[i].x, width-cards[i].w), Math.min(cards[i].y, height - cards[i].h), cards[i].n);
    }

    // newBoard();
}


function draw() {
    background(51);
    // ericLink.style('font', 'Helvetica')

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

    menuSlidingButton.forEach(button => {
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
    if(isTutorial) {
        ericLink.show();
        rectMode(CENTER);
        noStroke();
        fill(0, 200);
        rect(width/2, height/2, width*9.5/10, height*9.5/10, width*9/200);
        fill(255);
        textAlign(CENTER, TOP);
        textSize(width/20);
        textFont("Monospace");

        text("welcome to 24 the game!", width/2, height/2-height*9.5/22);
        textSize(width/50);
        text("\n\n\nthe objective of the game is to use all the cards to create 24\nyou must use all four cards and only be left with the 24 card\nclick on cards to select them\nonce you have two cards selected, choose an operation to combine them\naddition ('a','+','left')\tmultiplication ('m','*','right')\nsubtraction ('s','-','up')\tdivision ('d','/','down')\nundo ('u')\treset ('r')\tnext ('n')\n\n\n(click anywhere to close)", width/2, height/2-height*9.5/22);
        

        textFont('Helvetica');
    } else {
        ericLink.hide();
    }
    textFont();

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

let wut = false;

function touchStarted() {
    if(isTutorial) {
        return;
    }
    buttons.forEach(button => {
        button.update();
    });

    if (menuOpen) {
        menuSlidingButton.forEach(button => {
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

function touchEnded() {
    if(isTutorial && !wut) {
        isTutorial = false;
        return;
    }
    wut = false;
    return false;
}

let leftPressed = false;
let upPressed = false;
let rightPressed = false;
let downPressed = false;

function keyPressed() {
    if(keyCode === LEFT_ARROW) {
        leftPressed = true;
        keyTyped();
    }
    if(keyCode === UP_ARROW) {
        upPressed = true;
        keyTyped();
    }
    if(keyCode === RIGHT_ARROW) {
        rightPressed = true;
        keyTyped();
    }
    if(keyCode === DOWN_ARROW) {
        downPressed = true;
        keyTyped();
    }
}

function keyReleased() {
    if(keyCode === LEFT_ARROW) {
        leftPressed = false;
    }
    if(keyCode === UP_ARROW) {
        upPressed = false;
    }
    if(keyCode === RIGHT_ARROW) {
        rightPressed = false;
    }
    if(keyCode === DOWN_ARROW) {
        downPressed = false;
    }
}


function keyTyped() {
    console.log("hello");
    if(isTutorial) {
        return;
    }
    if (key == ' ') {
    }

    if (key == 'n' || key == 'N') {
        newBoard();
    }
    if(key == '1' || key == '2' || key == '3' || key == '4') {
        let flag = false;
        for (let i = cards.length - 1; i >= 0; i--) {
            let card = cards[i];
            if(!flag && card.i == parseInt(key)) {
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
    
    }

    if (selectedCards.length == 2) {
        let i = Math.min(selectedCards[0].i, selectedCards[1].i);
        // let i = 1;
        // while(true) {
        //     let flag = true;
        //     for(let j = 0; j < cards.length; j++) {
        //         if(cards[j].i == i) {
        //             flag = false;
        //             break;
        //         }
        //     }
        //     if(flag) {
        //         break;
        //     }
        //     i++;
        // }

        if (key == 'a' || key == '+' || key == 'A' || leftPressed) {
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
        }

        if (key == 's' || key == '-' || key == 'S' || upPressed) {
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
        }

        if (key == 'd' || key == '/' || key == 'D' || downPressed) {
            prevCards = [];
            cards.forEach(card => {
                prevCards.push(card);
            });
            if(absoluteValue) {
                if(selectedCards[0].n >= selectedCards[1].n) {
                    newCard = new Card(selectedCards[1].x, selectedCards[1].y, Math.abs(selectedCards[0].n / selectedCards[1].n), i);
                } else {
                    newCard = new Card(selectedCards[1].x, selectedCards[1].y, Math.abs(selectedCards[1].n / selectedCards[0].n), i);
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
        }

        if (key == 'm' || key == '*' || key == 'M' || rightPressed) {
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
        }

        if (cards.length == 1) {
            if (cards[0].n == 24) {
                scorePoint();
                // score++;
                // newBoard();
            }
        }
    }

    if (key == 'u' || key == 'U') {
        cards = [];
        selectedCards = [];
        prevCards.forEach(card => {
            cards.push(card);
        });
    }

    if (key == 'r' || key == 'R') {
        cards = [];
        selectedCards = [];
        intialCards.forEach(card => {
            cards.push(card);
        });
    }

    if (key == 'p' || key == 'P') {
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
            cards.push(new Card(randX, randY, Math.floor(random(1, 14)), i+1));
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
                    cards.push(new Card(randX, randY, Math.floor(random(1, 14)), i+1));
                }
            }
        }
    } else {
        for (let i = 0; i < 4; i++) {
            let h = (width + height) / 10;
            let w = h / 7 * 5;
            cards.push(new Card(width / 8 * i + width / 4 + (width / 8 - w) / 2, height / 2 + buttonPanelH / 2 - h / 2, Math.floor(random(1, 14)), i+1));
        }
        if (allPossible) {
            while (checkPossible() == 0) {
                cards = [];
                for (let i = 0; i < 4; i++) {
                    let h = (width + height) / 10;
                    let w = h / 7 * 5;
                    cards.push(new Card(width / 8 * i + width / 4 + (width / 8 - w) / 2, height / 2 + buttonPanelH / 2 - h / 2, Math.floor(random(1, 14)), i+1));
                }
            }
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