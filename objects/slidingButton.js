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
        case "autoselect":
            this.toggle = selectAfterOperation;
            break;
        case "absolutevalue":
            this.toggle = absoluteValue;
            break;
    }

    this.show = function () {
        let tx = "";
        textAlign(RIGHT, CENTER);
        textFont('Helvetica');
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
            case "autoselect":
                tx = "Select card after operation";
                break;
            case "absolutevalue":
                tx = "Absolute value (sub/div)";
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

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(this.h / 3);
        text(this.toggle ? "ON" : "OFF", this.buttonX, this.y);

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
            case "autoselect":
                selectAfterOperation = this.toggle;
                break;
            case "absolutevalue":
                absoluteValue = this.toggle;
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