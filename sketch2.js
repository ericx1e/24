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
let menuT = 0;
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
let absoluteValue = false;
let dealDifficulty = 'any';
let menuDiffChips = [];
let remainingCountdownFrames = 0;
let remainingTimeFrames = 0;
let countingDown = false;
let timedMode = false;
let timedModeScore = 0;

let solutions;
let boardRating;
let ericLink;

let confettiColor;
let confetti = [];

let dealSound;
let cardSounds = [];
let partySound;
let buttonSound;

let popup;
let presets;

let bgG;
let driftSuits = [];
let floatingTexts = [];
let scorePop = 1;
let buttonDividerX = 0;

const STORAGE_KEY = '24game-state';

function loadState() {
    try {
        let s = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!s) {
            return;
        }
        if (typeof s.score == 'number') {
            score = s.score;
        }
        if (s.settings) {
            spawnRandomLocation = !!s.settings.spawnRandomLocation;
            allPossible = !!s.settings.allPossible;
            isConfetti = !!s.settings.isConfetti;
            faceNumbers = !!s.settings.faceNumbers;
            selectAfterOperation = !!s.settings.selectAfterOperation;
            absoluteValue = !!s.settings.absoluteValue;
            if (['any', 'easy', 'medium', 'hard', 'expert'].includes(s.settings.dealDifficulty)) {
                dealDifficulty = s.settings.dealDifficulty;
            }
        }
    } catch (e) {
        // corrupted or unavailable storage: fall back to defaults
    }
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            score: score,
            settings: {
                spawnRandomLocation: spawnRandomLocation,
                allPossible: allPossible,
                isConfetti: isConfetti,
                faceNumbers: faceNumbers,
                selectAfterOperation: selectAfterOperation,
                absoluteValue: absoluteValue,
                dealDifficulty: dealDifficulty,
            },
        }));
    } catch (e) {
        // storage unavailable (private mode etc.) — play on without saving
    }
}

function preload() {
    dealSound = loadSound('sounds/carddeal.mp3');
    partySound = loadSound('sounds/partyhorn.mp3');
    for (let i = 1; i <= 3; i++) {
        cardSounds.push(loadSound('sounds/cardsound' + i + '.mp3'));
    }
    buttonSound = loadSound('sounds/buttonsound.mp3');
    icons = loadFont("fa.otf");
    presets = loadStrings('presets.txt');
}

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.position(0, 0);
    textFont(UI_FONT);
    confettiColor = [color('#ffd166'), color('#4dd8ff'), color('#ff6b6b'), color('#51cf66'), color('#c77dff')];
    loadState();
    initialize();

    newBoard();
    prevBoard = cards;
}

function windowResized() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.position(0, 0);
    initialize();
}

function initialize() {
    buttonPanelH = (width + 0.25 * height) / 15;
    if (ericLink != null) {
        ericLink.remove();
    }
    ericLink = createA('https://github.com/ericx1e', 'made by eric xie ↗', '_blank');
    ericLink.style('font-size', (height / 90 + width / 70) + 'px');
    ericLink.style('font-family', "'Nunito', Helvetica, sans-serif");
    ericLink.style('font-weight', '700');
    ericLink.style('color', 'rgba(255, 255, 255, 0.6)');
    ericLink.style('text-decoration', 'none');
    ericLink.style('background', 'rgba(255, 255, 255, 0.07)');
    ericLink.style('border', '1px solid rgba(255, 255, 255, 0.16)');
    ericLink.style('border-radius', '999px');
    ericLink.style('padding', '0.3em 1em');
    ericLink.style('white-space', 'nowrap');
    ericLink.style('transform', 'translate(-50%, -50%)');
    ericLink.style('transition', 'color 0.15s ease, background 0.15s ease, border-color 0.15s ease');
    ericLink.mouseOver(() => {
        ericLink.style('color', PALETTE.gold);
        ericLink.style('background', 'rgba(255, 209, 102, 0.12)');
        ericLink.style('border-color', 'rgba(255, 209, 102, 0.45)');
    });
    ericLink.mouseOut(() => {
        ericLink.style('color', 'rgba(255, 255, 255, 0.6)');
        ericLink.style('background', 'rgba(255, 255, 255, 0.07)');
        ericLink.style('border-color', 'rgba(255, 255, 255, 0.16)');
    });
    // centered between the tutorial popup's shortcut rows and its footer
    let tutH = height * 0.88;
    let ksTut = (width + height) / 75;
    let shortcutsBottom = height / 2 + tutH / 6.2 + ksTut * 5;
    let footerY = height / 2 + tutH / 2 - tutH / 25;
    ericLink.position(width / 2, shortcutsBottom + (footerY - shortcutsBottom) * 0.42);
    ericLink.hide();

    menuW = (2 * width + 2 * height) / 10;
    menuX = width - menuW * menuT;
    menuY = buttonPanelH;
    menuH = height - buttonPanelH;

    renderBackground();
    initDriftSuits();

    buttons = [];
    let sp = buttonPanelH;
    let groupGap = buttonPanelH * 0.5;
    let startX = width - sp * (buttonIds.length - 0.5) - groupGap;
    for (let i = 0; i < buttonIds.length; i++) {
        let bx = startX + sp * i + (i >= 4 ? groupGap : 0);
        buttons.push(new Button(bx, buttonPanelH / 2, buttonPanelH * 4 / 5, buttonIds[i]));
    }
    buttonDividerX = startX + sp * 3.5 + groupGap / 2;

    lowerButtonScale = height / 20 + width / 100;

    buttons.push(new Button(lowerButtonScale, height - lowerButtonScale, lowerButtonScale, "?"));
    buttons.push(new Button(lowerButtonScale * 2.5, height - lowerButtonScale, lowerButtonScale, "soln"));
    buttons.push(new Button(lowerButtonScale * 4, height - lowerButtonScale, lowerButtonScale, "enter"));
    buttons.push(new Button(lowerButtonScale * 5.5, height - lowerButtonScale, lowerButtonScale, "preset"));

    menuSlidingButton = [];
    for (let i = 0; i < menuButtonIds.length; i++) {
        menuSlidingButton.push(new SlidingButton(i, menuButtonIds[i]));
    }

    for (let i = 0; i < cards.length; i++) {
        cards[i] = new Card(Math.min(cards[i].x, width - cards[i].w), Math.min(cards[i].y, height - cards[i].h), cards[i].n, cards[i].i);
    }

    if (popup) {
        let old = popup;
        popup = new Popup(old.id);
        if (old.id == "enter") {
            popup.values = old.values;
            popup.active = old.active;
        }
    }
}

function renderBackground() {
    bgG = createGraphics(width, height);
    let ctx = bgG.drawingContext;
    let r = Math.max(width, height) * 0.75;

    let g = ctx.createRadialGradient(width / 2, height * 0.4, r / 10, width / 2, height * 0.45, r);
    g.addColorStop(0, '#1f5f47');
    g.addColorStop(0.65, '#12402f');
    g.addColorStop(1, '#0a241a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    let v = ctx.createRadialGradient(width / 2, height / 2, r * 0.45, width / 2, height / 2, r * 1.1);
    v.addColorStop(0, 'rgba(0,0,0,0)');
    v.addColorStop(1, 'rgba(0,0,0,0.45)');
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, width, height);
}

function initDriftSuits() {
    driftSuits = [];
    let glyphs = ['♠', '♥', '♦', '♣'];
    for (let k = 0; k < 14; k++) {
        driftSuits.push({
            x: random(width),
            y: random(height),
            size: random((width + height) / 45, (width + height) / 18),
            v: random(0.08, 0.3),
            phase: random(TWO_PI),
            glyph: glyphs[k % 4],
            rot: random(-0.25, 0.25),
            alpha: random(10, 22),
        });
    }
}

function drawDriftSuits() {
    noStroke();
    textAlign(CENTER, CENTER);
    driftSuits.forEach(d => {
        d.y -= d.v;
        if (d.y < -d.size) {
            d.y = height + d.size;
            d.x = random(width);
        }
        push();
        translate(d.x + 6 * Math.sin(frameCount * 0.008 + d.phase), d.y);
        rotate(d.rot + 0.1 * Math.sin(frameCount * 0.006 + d.phase));
        fill(0, d.alpha);
        textSize(d.size);
        text(d.glyph, 0, 0);
        pop();
    });
}

function draw() {
    image(bgG, 0, 0);
    drawDriftSuits();
    textFont(UI_FONT);

    let flag = false;
    if (!menuOpen) {
        for (let i = cards.length - 1; i >= 0; i--) {
            let card = cards[i];
            if (!flag && card.update()) {
                flag = true;
                cards.splice(i, 1);
                cards.push(card);
            }
        }
    }
    for (let i = 0; i < cards.length; i++) {
        cards[i].show();
    }

    for (let i = floatingTexts.length - 1; i >= 0; i--) {
        floatingTexts[i].show();
        if (floatingTexts[i].life <= 0) {
            floatingTexts.splice(i, 1);
        }
    }

    if (countingDown) {
        cards = [];
        noStroke();
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        fill(255, 200);
        textSize((width + height) / 60);
        text("get ready…", width / 2, height / 2 - (width / 12 + height / 8) * 0.75);
        fill(PALETTE.gold);
        textSize(width / 12 + height / 8);
        let tx = "" + Math.floor((remainingCountdownFrames / 60) * 100) / 100;
        for (let i = 0; i < 4 - tx.length; i++) {
            tx += "0";
        }
        text(tx, width / 2, height / 2);
        textStyle(NORMAL);
        remainingCountdownFrames--;
        if (remainingCountdownFrames <= 0) {
            remainingCountdownFrames = 0;
            countingDown = false;
            remainingTimeFrames = 2 * 60 * 60; //two minutes
            timedModeScore = 0;
            timedMode = true;
            newBoard();
        }
    }

    if (timedMode) {
        let ts = width / 40 + height / 22;
        let seconds = "" + Math.floor((remainingTimeFrames / 60) * 100) / 100;
        let label = Math.floor(seconds / 60) + ":" + (Math.floor(seconds % 60) < 10 ? "0" : "") + Math.floor(seconds % 60);
        textStyle(BOLD);
        textSize(ts);
        let tw = textWidth(label);
        rectMode(CENTER);
        noStroke();
        fill(0, 130);
        rect(width - tw / 2 - ts, height - ts, tw + ts, ts * 1.4, ts);
        fill(remainingTimeFrames < 600 ? color('#ff6b6b') : color(255));
        textAlign(CENTER, CENTER);
        text(label, width - tw / 2 - ts, height - ts);
        textStyle(NORMAL);
        remainingTimeFrames--;
        if (remainingTimeFrames <= 0) {
            remainingTimeFrames = 0;
            timedMode = false;
            newBoard();
        }
    }

    //Top bar
    rectMode(CORNER);
    noStroke();
    fill(7, 20, 15, 235);
    rect(0, 0, width, buttonPanelH);
    fill(255, 255, 255, 18);
    rect(0, buttonPanelH - 1, width, 1);

    // divider between operation and utility button groups
    fill(255, 255, 255, 30);
    rect(buttonDividerX - 1, buttonPanelH * 0.28, 2, buttonPanelH * 0.44, 1);

    // score chip
    scorePop = lerp(scorePop, 1, 0.12);
    let chipH = buttonPanelH * 0.62;
    let displayScore = timedMode ? timedModeScore : score;
    textStyle(BOLD);
    textSize(chipH * 0.55);
    let scoreLabel = '★ ' + displayScore;
    let scoreW = textWidth(scoreLabel);
    push();
    translate(buttonPanelH * 0.4 + (scoreW + chipH) / 2, buttonPanelH / 2);
    scale(scorePop);
    rectMode(CENTER);
    fill(255, 255, 255, 22);
    rect(0, 0, scoreW + chipH, chipH, chipH / 2);
    fill(PALETTE.gold);
    textAlign(CENTER, CENTER);
    text(scoreLabel, 0, 0);
    pop();
    textStyle(NORMAL);

    // difficulty of the current hand, below the score chip
    if (boardRating && !countingDown) {
        let dh = buttonPanelH * 0.44;
        textStyle(BOLD);
        textSize(dh * 0.52);
        let dw = textWidth(boardRating.label) + dh * 1.5;
        rectMode(CENTER);
        noStroke();
        fill(0, 110);
        rect(buttonPanelH * 0.4 + dw / 2, buttonPanelH + dh * 0.85, dw, dh, dh / 2);
        fill(boardRating.color);
        ellipse(buttonPanelH * 0.4 + dh * 0.55, buttonPanelH + dh * 0.85, dh * 0.32);
        fill(255, 215);
        textAlign(LEFT, CENTER);
        text(boardRating.label, buttonPanelH * 0.4 + dh, buttonPanelH + dh * 0.85);
        textStyle(NORMAL);
    }

    let hoveringButton = false;

    buttons.forEach(button => {
        button.show();
        if (!hoveringButton && button.touchingMouse()) {
            hoveringButton = true;
        }
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

    // settings menu
    menuT = lerp(menuT, menuOpen ? 1 : 0, 0.12);
    menuX = width - menuW * menuT;
    menuSlidingButton.forEach(button => {
        button.update();
    });
    if (menuT > 0.005) {
        noStroke();
        rectMode(CORNER);
        fill(0, 0, 0, 110 * menuT);
        rect(0, buttonPanelH, width, height - buttonPanelH);
        fill(9, 24, 18, 246);
        rect(menuX, menuY, menuW + 40, menuH, menuW / 18, 0, 0, menuW / 18);

        fill(PALETTE.gold);
        textStyle(BOLD);
        textAlign(LEFT, CENTER);
        textSize(menuW / 14);
        text('settings', menuX + menuW / 14, menuY + menuW / 9);
        textStyle(NORMAL);

        menuSlidingButton.forEach(button => {
            button.show();
        });

        drawDifficultyPicker();
    }

    if (popup) {
        popup.show();
    }

    // cursor
    let dragging = false;
    let overCard = false;
    if (!popup && !menuOpen) {
        cards.forEach(c => {
            if (c.lifted) {
                dragging = true;
            } else if (c.touchingMouse()) {
                overCard = true;
            }
        });
    }
    if (menuOpen) {
        menuSlidingButton.forEach(b => {
            if (b.touchingMouse()) {
                hoveringButton = true;
            }
        });
        menuDiffChips.forEach(c => {
            if (c.touchingMouse()) {
                hoveringButton = true;
            }
        });
    }
    if (popup) {
        if (popup.closeHover) {
            hoveringButton = true;
        }
        popup.buttons.forEach(b => {
            if (b.touchingMouse()) {
                hoveringButton = true;
            }
        });
        if (popup.filterChips) {
            popup.filterChips.forEach(c => {
                if (c.touchingMouse()) {
                    hoveringButton = true;
                }
            });
        }
    }
    if (dragging) {
        cursor('grabbing');
    } else if (overCard) {
        cursor('grab');
    } else if (hoveringButton) {
        cursor('pointer');
    } else {
        cursor(ARROW);
    }
}

// "Deal difficulty" chip row at the bottom of the settings menu
function drawDifficultyPicker() {
    let pad = menuW / 14;
    let top = menuY + menuW / 4 + 6 * (menuW / 7.5);

    noStroke();
    textFont(UI_FONT);
    textAlign(LEFT, CENTER);
    fill(255, 225);
    textSize(menuW / 23);
    text("Deal difficulty", menuX + pad, top);

    let labels = ['any', 'easy', 'medium', 'hard', 'expert'];
    let ch = menuW / 13;
    let gap = ch * 0.35;
    let x = menuX + pad;
    let y = top + menuW / 10;
    let maxX = menuX + menuW - pad;
    menuDiffChips = [];
    textStyle(BOLD);
    textSize(ch * 0.5);
    labels.forEach(l => {
        let tier = DIFF_TIERS.find(t => t.label == l);
        let cw = textWidth(l) + ch * (tier ? 1.6 : 1.1);
        if (x + cw > maxX) {
            x = menuX + pad;
            y += ch * 1.5;
        }
        let chip = {
            id: l, x: x + cw / 2, y: y, w: cw, h: ch * 1.15,
            touchingMouse: function () {
                return mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2 && mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2;
            }
        };
        menuDiffChips.push(chip);

        let sel = dealDifficulty == l;
        rectMode(CENTER);
        fill(255, 255, 255, sel ? 45 : chip.touchingMouse() ? 30 : 14);
        rect(chip.x, y, cw, ch * 1.15, ch);
        if (tier) {
            fill(tier.color);
            ellipse(x + ch * 0.55, y, ch * 0.32);
        }
        fill(255, sel ? 255 : 160);
        textAlign(CENTER, CENTER);
        text(l, chip.x + (tier ? ch * 0.25 : 0), y);
        x += cw + gap;
    });
    textStyle(NORMAL);
}

function touchStarted() {
    if (menuOpen) {
        if (mouseX < width - menuW) {
            toggleMenu();
        }
        return false;
    }
    if (popup) {
        return false;
    }
    let flag = false;
    for (let i = cards.length - 1; i >= 0; i--) {
        let card = cards[i];
        if (!flag && card.touchingMouse()) {
            flag = true;
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
    if (popup) {
        popup.onClick();
        return;
    }

    buttons.forEach(button => {
        button.update();
    });

    if (menuOpen) {
        menuSlidingButton.forEach(button => {
            button.click();
        });
        menuDiffChips.forEach(c => {
            if (c.touchingMouse() && dealDifficulty != c.id) {
                buttonSound.play();
                dealDifficulty = c.id;
                saveState();
            }
        });
    }

    let flag = false;
    for (let i = cards.length - 1; i >= 0; i--) {
        let card = cards[i];
        if (!flag && card.touchingMouse()) {
            flag = true;
            cards.splice(i, 1);
            cards.push(card);
            playCardSound();
        }
    }

    return false;
}

let leftPressed = false;
let upPressed = false;
let rightPressed = false;
let downPressed = false;

function keyPressed() {
    if (popup) {
        if (popup.id == "enter") {
            if (keyCode === BACKSPACE) {
                popup.press('back');
                return false;
            }
            if (keyCode === ENTER || keyCode === RETURN) {
                popup.press('deal');
                return false;
            }
        }
        return;
    }
    if (keyCode === LEFT_ARROW) {
        leftPressed = true;
        keyTyped();
    }
    if (keyCode === UP_ARROW) {
        upPressed = true;
        keyTyped();
    }
    if (keyCode === RIGHT_ARROW) {
        rightPressed = true;
        keyTyped();
    }
    if (keyCode === DOWN_ARROW) {
        downPressed = true;
        keyTyped();
    }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW) {
        leftPressed = false;
    }
    if (keyCode === UP_ARROW) {
        upPressed = false;
    }
    if (keyCode === RIGHT_ARROW) {
        rightPressed = false;
    }
    if (keyCode === DOWN_ARROW) {
        downPressed = false;
    }
}


function keyTyped() {
    if (popup) {
        if (popup.id == "enter") {
            popup.onKey(key);
        }
        return false;
    }
    if (key == 'n' || key == 'N') {
        newBoard();
    }
    if (cards.length == 1 && cards[0].n > 23.9999 && cards[0].n < 24.0001) {
        return;
    }
    if (key == '1' || key == '2' || key == '3' || key == '4') {
        let flag = false;
        for (let i = cards.length - 1; i >= 0; i--) {
            let card = cards[i];
            if (!flag && card.i == parseInt(key)) {
                flag = true;
                cards.splice(i, 1);
                cards.push(card);
                playCardSound();
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
        if (key == 'a' || key == '+' || key == 'A' || leftPressed) {
            buttonSound.play();
            applyOperation('add');
        }

        if (key == 's' || key == '-' || key == 'S' || upPressed) {
            buttonSound.play();
            applyOperation('sub');
        }

        if (key == 'd' || key == '/' || key == 'D' || downPressed) {
            buttonSound.play();
            applyOperation('div');
        }

        if (key == 'm' || key == '*' || key == 'M' || rightPressed) {
            buttonSound.play();
            applyOperation('mult');
        }
    }

    if (key == 'u' || key == 'U') {
        buttonSound.play();
        cards = [];
        selectedCards = [];
        prevCards.forEach(card => {
            cards.push(card);
        });
    }

    if (key == 'r' || key == 'R') {
        buttonSound.play();
        cards = [];
        selectedCards = [];
        intialCards.forEach(card => {
            cards.push(card);
        });
    }
}

function touchMoved() {
    return false;
}

// Combine the two selected cards with the given operation
function applyOperation(op) {
    if (selectedCards.length != 2) {
        return;
    }

    let a = selectedCards[0];
    let b = selectedCards[1];

    let i = Math.min(a.i, b.i);
    if (i == 3) {
        let hasTwo = false;
        for (let j = 0; j < cards.length; j++) {
            if (cards[j].i == 2) {
                hasTwo = true;
            }
        }
        if (!hasTwo) {
            i = 2;
        }
    }

    let n, sym;
    switch (op) {
        case 'add':
            n = a.n + b.n;
            sym = '+';
            break;
        case 'sub':
            n = absoluteValue ? Math.abs(a.n - b.n) : a.n - b.n;
            sym = '−';
            break;
        case 'mult':
            n = a.n * b.n;
            sym = '×';
            break;
        case 'div':
            if (absoluteValue) {
                n = a.n >= b.n ? Math.abs(a.n / b.n) : Math.abs(b.n / a.n);
            } else {
                n = a.n / b.n;
            }
            sym = '÷';
            break;
    }

    prevCards = [];
    cards.forEach(card => {
        prevCards.push(card);
    });

    newCard = new Card((a.x + b.x) / 2, (a.y + b.y) / 2, n, i);
    cards.push(newCard);
    cards.splice(cards.indexOf(a), 1);
    cards.splice(cards.indexOf(b), 1);
    selectedCards = [];
    if (selectAfterOperation) {
        selectedCards.push(newCard);
    }

    floatingTexts.push(new FloatingText(newCard.x + newCard.w / 2, newCard.y - newCard.h / 8, formatNumber(a.n) + ' ' + sym + ' ' + formatNumber(b.n) + ' = ' + formatNumber(n)));

    if (cards.length == 1 && cards[0].n > 23.9999 && cards[0].n < 24.0001) {
        scorePoint();
    }
}

function playCardSound() {
    cardSounds[Math.floor(random(0, cardSounds.length))].play();
}

function newBoard(input) {
    dealSound.play();
    confetti = [];
    floatingTexts = [];
    prevBoard = [];

    intialCards.forEach(card => {
        prevBoard.push(card);
    });

    cards = [];

    let nums = input || randomHand();
    let h = (width + height) / 10;
    let w = h / 7 * 5;
    for (let i = 0; i < 4; i++) {
        if (spawnRandomLocation) {
            let randX = random(0, width - w);
            let randY = random(buttonPanelH, height - h);
            while (locationTaken(randX, randY)) {
                randX = random(0, width - w);
                randY = random(buttonPanelH, height - h);
            }
            cards.push(new Card(randX, randY, nums[i], i + 1));
        } else {
            cards.push(new Card(width / 8 * i + width / 4 + (width / 8 - w) / 2, height / 2 + buttonPanelH / 2 - h / 2, nums[i], i + 1));
        }
    }

    // staggered deal-in
    cards.forEach((card, k) => {
        card.delay = k * 4;
    });

    let analysis = analyze24(cards.map(card => card.n));
    solutions = analysis.solutions;
    boardRating = analysis.rating;
    console.log(solutions);

    prevCards = [];
    cards.forEach(card => {
        prevCards.push(card);
    });

    intialCards = [];
    cards.forEach(card => {
        intialCards.push(card);
    });

    selectedCards = [];
}


let ratingMemo = {};

function ratedTier(nums) {
    let key = nums.slice().sort((a, b) => a - b).join(',');
    if (!(key in ratingMemo)) {
        let r = rateDifficulty(nums);
        ratingMemo[key] = r ? r.label : null;
    }
    return ratingMemo[key];
}

// random hand respecting the deal-difficulty filter and solvable-boards setting
function randomHand() {
    let nums;
    for (let tries = 0; tries < 5000; tries++) {
        nums = [];
        for (let i = 0; i < 4; i++) {
            nums.push(Math.floor(random(1, 14)));
        }
        if (dealDifficulty != 'any') {
            if (ratedTier(nums) == dealDifficulty) {
                return nums;
            }
        } else if (!allPossible || ratedTier(nums) != null) {
            return nums;
        }
    }
    return nums;
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
    partySound.play();
    scorePop = 1.6;
    if (timedMode) {
        timedModeScore++;
        newBoard();
    } else {
        score++;
        saveState();
        if (isConfetti) {
            for (let i = 0; i < 150; i++) {
                confetti[i] = new Confetti(random(0, width), random(height / 2, height * 2), -height / 7);
            }
        } else {
            newBoard();
        }
    }
}

function toggleMenu() {
    menuOpen = !menuOpen;
}
