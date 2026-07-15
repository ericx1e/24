function Card(x, y, n, i) {
    this.x = x;
    this.y = y;
    this.h = (width + height) / 10;
    this.w = this.h / 7 * 5;
    this.n = n;
    this.i = i;
    this.lifted = false;
    this.selected = false;

    this.delay = 0; // frames to wait before dealing in
    this.age = 0;
    this.hoverT = 0;
    this.tilt = 0;

    let suitIndex = (((i - 1) % 4) + 4) % 4;
    this.suit = ['♠', '♥', '♦', '♣'][suitIndex];
    this.isRed = suitIndex == 1 || suitIndex == 2;

    this.show = function () {
        if (this.delay > 0) {
            this.delay--;
            return;
        }
        this.age++;

        let tx = formatNumber(this.n);
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

        this.selected = selectedCards.includes(this);
        let isWin = cards.length == 1 && cards[0].n > 23.9999 && cards[0].n < 24.0001;
        if (isWin) {
            this.selected = false;
            this.lifted = false;
        }

        let hovering = !this.lifted && !popup && !menuOpen && this.touchingMouse();
        this.hoverT = lerp(this.hoverT, hovering && !mouseIsPressed ? 1 : 0, 0.25);
        if (this.lifted) {
            this.tilt = lerp(this.tilt, constrain((mouseX - pmouseX) * 0.006, -0.15, 0.15), 0.3);
        } else {
            this.tilt = lerp(this.tilt, 0, 0.15);
        }

        let dealT = easeOutBack(Math.min(this.age / 18, 1));
        let sc = dealT * (1 + 0.03 * this.hoverT + (this.lifted ? 0.05 : 0));
        if (isWin) {
            sc *= 1 + 0.02 * Math.sin(frameCount * 0.12);
        }
        let lift = -this.h * (0.015 * this.hoverT + (this.lifted ? 0.03 : 0));

        push();
        translate(this.x + this.w / 2, this.y + this.h / 2 + lift);
        rotate(this.tilt);
        scale(sc);
        rectMode(CENTER);
        textFont(UI_FONT);

        // card body
        if (isWin) {
            let pulse = 0.6 + 0.4 * Math.sin(frameCount * 0.12);
            setShadow('rgba(255, 209, 102, ' + (0.5 + 0.35 * pulse) + ')', this.w / 4 + this.w / 8 * pulse, 0);
            stroke(PALETTE.gold);
            strokeWeight(this.w / 30);
        } else if (this.selected) {
            setShadow('rgba(77, 216, 255, 0.8)', this.w / 6, 0);
            stroke(PALETTE.select);
            strokeWeight(this.w / 26);
        } else {
            setShadow('rgba(0, 0, 0, 0.35)', this.w / 8 + (this.hoverT + (this.lifted ? 1 : 0)) * this.w / 12, this.w / 24);
            stroke(0, 25);
            strokeWeight(this.w / 90);
        }
        fill(PALETTE.cardFace);
        rect(0, 0, this.w, this.h, this.w / 6);
        clearShadow();

        // corner suit pips
        let suitCol = this.isRed ? PALETTE.suitRed : PALETTE.suitDark;
        noStroke();
        fill(suitCol);
        textAlign(CENTER, CENTER);
        textSize(this.w / 5.5);
        text(this.suit, -this.w / 2 + this.w / 7.5, -this.h / 2 + this.w / 7.5);
        push();
        rotate(PI);
        text(this.suit, -this.w / 2 + this.w / 7.5, -this.h / 2 + this.w / 7.5);
        pop();

        // center value — non-integers render as a stacked fraction
        textStyle(BOLD);
        fill(isWin ? PALETTE.goldDeep : suitCol);
        if (tx.indexOf('/') != -1) {
            let nu = tx.slice(0, tx.indexOf('/'));
            let de = tx.slice(tx.indexOf('/') + 1);
            let fs = Math.min(this.w / 2.8, this.w * 1.3 / Math.max(nu.length, de.length));
            textSize(fs);
            text(nu, 0, -fs * 0.62);
            text(de, 0, fs * 0.62);
            let bw = Math.max(textWidth(nu), textWidth(de)) + fs * 0.35;
            stroke(isWin ? PALETTE.goldDeep : suitCol);
            strokeWeight(this.w / 45);
            strokeCap(ROUND);
            line(-bw / 2, 0, bw / 2, 0);
            noStroke();
        } else {
            textSize(Math.min(this.w / 2, this.w * 1.6 / Math.max(tx.length, 1)));
            text(tx, 0, 0);
        }
        textStyle(NORMAL);

        // keyboard index
        fill(0, 60);
        textSize(this.w / 6.5);
        text(this.i, this.w / 2 - this.w / 7.5, -this.h / 2 + this.w / 7.5);

        // selection order badge
        if (this.selected) {
            fill(PALETTE.select);
            ellipse(-this.w / 2 + this.w / 7.5, this.h / 2 - this.w / 7.5, this.w / 4.5);
            fill(255);
            textStyle(BOLD);
            textSize(this.w / 7);
            text(selectedCards.indexOf(this) + 1, -this.w / 2 + this.w / 7.5, this.h / 2 - this.w / 7.5);
            textStyle(NORMAL);
        }

        pop();
    }

    this.update = function () {
        if (popup) {
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

        return this.lifted; //So you can only lift one card at a time
    }

    this.touchingMouse = function () {
        return this.x < mouseX && this.x + this.w > mouseX && this.y < mouseY && this.y + this.h > mouseY;
    }
}
