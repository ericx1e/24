function SlidingButton(index, id) {
    this.id = id;
    this.index = index;
    this.toggle = false;
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;

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
        case "autoselect":
            this.toggle = selectAfterOperation;
            break;
        case "absolutevalue":
            this.toggle = absoluteValue;
            break;
    }
    this.t = this.toggle ? 1 : 0;

    this.label = {
        randomloc: "Random card locations",
        allpossible: "Only solvable boards",
        confetti: "Confetti",
        facenumbers: "Face cards as numbers",
        autoselect: "Select result after op",
        absolutevalue: "Absolute value (sub/div)",
    }[id];

    this.sync = function () {
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
            case "autoselect":
                selectAfterOperation = this.toggle;
                break;
            case "absolutevalue":
                absoluteValue = this.toggle;
        }
    }

    this.update = function () {
        this.w = menuW / 6;
        this.h = this.w / 2;
        let pad = menuW / 14;
        this.x = menuX + menuW - pad - this.w / 2;
        this.y = menuY + menuW / 4 + this.index * (menuW / 7.5);
        this.t = lerp(this.t, this.toggle ? 1 : 0, 0.2);
        this.sync();
    }

    this.show = function () {
        let pad = menuW / 14;

        textFont(UI_FONT);
        textAlign(LEFT, CENTER);
        noStroke();
        fill(255, 225);
        textSize(this.h / 1.9);
        text(this.label, menuX + pad, this.y);

        // track
        rectMode(CENTER);
        let off = color(255, 255, 255, 45);
        let on = color(81, 207, 102);
        fill(lerpColor(off, on, this.t));
        rect(this.x, this.y, this.w, this.h, this.h / 2);

        // knob
        let knobX = this.x - this.w / 2 + this.h / 2 + this.t * (this.w - this.h);
        setShadow('rgba(0,0,0,0.35)', this.h / 5, this.h / 12);
        fill(255);
        ellipse(knobX, this.y, this.h * 0.8);
        clearShadow();
    }

    this.click = function () {
        if (this.touchingMouse()) {
            buttonSound.play();
            this.toggle = !this.toggle;
            this.sync();
            saveState();
        }
    }

    this.touchingMouse = function () {
        return this.x - this.w / 2 < mouseX && this.x + this.w / 2 > mouseX && this.y - this.h / 2 < mouseY && this.y + this.h / 2 > mouseY;
    }
}
