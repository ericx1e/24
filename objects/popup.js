let presetFilter = 'all'; // persists across popup openings for the session

function Popup(id) {
    this.id = id;
    this.w = width * 0.88;
    this.h = height * 0.88;
    this.t = 0;
    this.closeHover = false;

    this.buttons = [];

    if (this.id == "enter") {
        this.values = ['', '', '', ''];
        this.active = 0;
    }

    if (this.id == "preset") {
        this.sets = [];
        for (let i = 0; i < presets.length; i++) {
            let line = presets[i].trim().split(/\s+/);
            let nums = [];
            for (let j = 0; j < 4; j++) {
                nums[j] = parseInt(line[j]);
            }
            if (!isNaN(nums[0]) && !isNaN(nums[1]) && !isNaN(nums[2]) && !isNaN(nums[3])) {
                let rating = rateDifficulty(nums);
                if (rating) {
                    this.sets.push({ nums: nums, rating: rating });
                }
            }
        }
        this.sets.sort((a, b) => a.rating.score - b.rating.score);
        this.filterChips = [];

        this.buildGrid = function () {
            let list = this.sets.filter(s => presetFilter == 'all' || s.rating.label == presetFilter);
            this.buttons = [];

            let contentTop = height / 2 - this.h / 2 + this.h / 4.4;
            let contentBottom = height / 2 + this.h / 2 - this.h / 9;
            let target = (this.w + this.h) / 16;
            let spacing = target / 5;
            let perRow = Math.max(3, Math.floor((this.w - spacing) / (target + spacing)));
            let buttonSize, rowsN, gridH;
            // grow columns until the grid fits the available height
            while (true) {
                buttonSize = (this.w - spacing) / perRow - spacing;
                rowsN = Math.ceil(list.length / perRow);
                gridH = rowsN * (buttonSize + spacing) - spacing;
                if (gridH <= contentBottom - contentTop || perRow > 12) {
                    break;
                }
                perRow++;
            }
            let startY = contentTop + Math.max(0, (contentBottom - contentTop - gridH) / 2) + buttonSize / 2;

            for (let i = 0; i < list.length; i++) {
                let row = Math.floor(i / perRow);
                let inRow = Math.min(perRow, list.length - row * perRow);
                let rowW = inRow * (buttonSize + spacing) - spacing;
                let bx = width / 2 - rowW / 2 + buttonSize / 2 + (i % perRow) * (buttonSize + spacing);
                let by = startY + row * (buttonSize + spacing);
                this.buttons.push(new PresetButton(bx, by, buttonSize, list[i].nums, list[i].rating));
            }
        }

        this.buildGrid();
    }

    this.drawPanel = function () {
        rectMode(CENTER);
        setShadow('rgba(0,0,0,0.55)', 40, 12);
        fill(11, 26, 20, 247);
        stroke(255, 255, 255, 30);
        strokeWeight(1.5);
        rect(width / 2, height / 2, this.w, this.h, Math.min(width, height) / 25);
        clearShadow();
    }

    this.drawTitle = function (txt) {
        noStroke();
        fill(PALETTE.gold);
        textFont(UI_FONT);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        textSize(height / 40 + width / 50);
        text(txt, width / 2, height / 2 - this.h / 2 + this.h / 14);
        textStyle(NORMAL);
    }

    this.drawSubtitle = function (txt) {
        noStroke();
        fill(255, 170);
        textFont(UI_FONT);
        textAlign(CENTER, CENTER);
        textSize(height / 70 + width / 115);
        text(txt, width / 2, height / 2 - this.h / 2 + this.h / 7.5);
    }

    this.drawFooter = function (txt) {
        noStroke();
        fill(255, 120);
        textFont(UI_FONT);
        textAlign(CENTER, CENTER);
        textSize(height / 80 + width / 130);
        text(txt || "click anywhere to close", width / 2, height / 2 + this.h / 2 - this.h / 25);
    }

    this.drawClose = function () {
        let r = Math.min(this.w, this.h) / 24;
        let cx = width / 2 + this.w / 2 - r * 1.7;
        let cy = height / 2 - this.h / 2 + r * 1.7;
        this.closeHover = dist(mouseX, mouseY, cx, cy) < r;
        noStroke();
        fill(255, 255, 255, this.closeHover ? 50 : 20);
        ellipse(cx, cy, r * 2);
        stroke(255, 210);
        strokeWeight(r / 7);
        strokeCap(ROUND);
        let k = r * 0.36;
        line(cx - k, cy - k, cx + k, cy + k);
        line(cx + k, cy - k, cx - k, cy + k);
        noStroke();
    }

    this.drawKeycap = function (cx, cy, k, ks) {
        rectMode(CENTER);
        fill(255, 255, 255, 25);
        stroke(255, 255, 255, 70);
        strokeWeight(1.5);
        rect(cx, cy, ks * 1.2, ks * 1.2, ks * 0.3);
        noStroke();
        fill(255, 235);
        textFont(UI_FONT);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        textSize(ks * 0.55);
        text(k, cx, cy);
        textStyle(NORMAL);
    }

    // keycaps + label, centered on cx
    this.drawShortcut = function (cx, cy, keys, label, ks, labelCol) {
        textFont(UI_FONT);
        textStyle(BOLD);
        textSize(ks * 0.6);
        let lw = textWidth(label);
        textStyle(NORMAL);
        let kw = ks * 1.2;
        let sep = ks * 0.55;
        let total = keys.length * kw + (keys.length - 1) * sep + ks * 0.6 + lw;
        let x = cx - total / 2;
        for (let i = 0; i < keys.length; i++) {
            this.drawKeycap(x + kw / 2, cy, keys[i], ks);
            x += kw;
            if (i < keys.length - 1) {
                noStroke();
                fill(255, 120);
                textAlign(CENTER, CENTER);
                textSize(ks * 0.5);
                text('/', x + sep / 2, cy);
                x += sep;
            }
        }
        x += ks * 0.6;
        noStroke();
        if (labelCol) {
            fill(labelCol);
        } else {
            fill(255, 210);
        }
        textFont(UI_FONT);
        textStyle(BOLD);
        textAlign(LEFT, CENTER);
        textSize(ks * 0.6);
        text(label, x, cy);
        textStyle(NORMAL);
    }

    // display 1/11/12/13 as A/J/Q/K when face cards are enabled
    this.valueLabel = function (v) {
        if (v === '' || v == null) {
            return '';
        }
        let n = parseInt(v);
        if (!faceNumbers) {
            if (n == 1) return 'A';
            if (n == 11) return 'J';
            if (n == 12) return 'Q';
            if (n == 13) return 'K';
        }
        return '' + n;
    }

    this.nextEmpty = function () {
        for (let i = 1; i <= 4; i++) {
            let j = (this.active + i) % 4;
            if (this.values[j] === '') {
                return j;
            }
        }
        return -1;
    }

    // keypad / slot / special-key actions for the "enter" popup
    this.press = function (id) {
        if (id === 'back') {
            buttonSound.play();
            if (this.values[this.active] === '' && this.active > 0) {
                this.active--;
            }
            this.values[this.active] = this.values[this.active].slice(0, -1);
            return;
        }
        if (id === 'deal') {
            if (this.values.every(v => v !== '')) {
                let nums = this.values.map(v => parseInt(v));
                popup = undefined;
                newBoard(nums);
            }
            return;
        }
        if (typeof id === 'string' && id.indexOf('slot') == 0) {
            playCardSound();
            this.active = parseInt(id.slice(4));
            return;
        }
        // keypad value 1-13
        playCardSound();
        this.values[this.active] = '' + id;
        let next = this.nextEmpty();
        if (next != -1) {
            this.active = next;
        }
    }

    // typed input: digits build up the active slot, space moves to the next
    this.onKey = function (k) {
        if (k >= '0' && k <= '9') {
            let v = this.values[this.active];
            if (v.length >= 2) {
                let next = this.nextEmpty();
                if (next == -1) {
                    return;
                }
                this.active = next;
                v = '';
            }
            this.values[this.active] = v + k;
            playCardSound();
            if (this.values[this.active].length >= 2) {
                let next = this.nextEmpty();
                if (next != -1) {
                    this.active = next;
                }
            }
        } else if (k == ' ') {
            this.active = (this.active + 1) % 4;
        }
    }

    this.drawEnter = function () {
        let panelTop = height / 2 - this.h / 2;
        let contentTop = panelTop + this.h / 5.2;
        let contentBottom = panelTop + this.h - this.h / 9;
        let availH = contentBottom - contentTop;
        let availW = this.w * 0.92;

        // 7 keypad columns normally; reflow to 5 bigger keys on narrow screens
        let cols = 7;
        let keyS = Math.min(availW / 8.2, availH / 6.6, (width + height) / 26);
        if (keyS < 46) {
            cols = 5;
            keyS = Math.min(availW / 5.8, availH / 7.8, (width + height) / 20);
        }
        let keyRows = Math.ceil(14 / cols);
        let kgap = keyS * 0.2;
        let sgap = kgap * 1.6;
        let slotW = Math.min(keyS * 1.5, (availW - 3 * sgap) / 4);
        let slotH = slotW * 7 / 5;
        let dealH = keyS * 0.95;
        let g = keyS * 0.55;

        let keypadH = keyRows * keyS + (keyRows - 1) * kgap;
        let totalH = slotH + g + keypadH + g + dealH;
        let y = contentTop + (availH - totalH) / 2;

        this.buttons = [];
        let self = this;
        let hs = function (id, cx, cy, w, h) {
            self.buttons.push({
                id: id, x: cx, y: cy, w: w, h: h,
                touchingMouse: function () {
                    return mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2 && mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2;
                }
            });
        };

        // card slots
        let rowW = 4 * slotW + 3 * sgap;
        let sy = y + slotH / 2;
        textFont(UI_FONT);
        rectMode(CENTER);
        for (let i = 0; i < 4; i++) {
            let sx = width / 2 - rowW / 2 + slotW / 2 + i * (slotW + sgap);
            hs('slot' + i, sx, sy, slotW, slotH);
            let v = this.values[i];
            let isActive = i == this.active;
            if (v === '') {
                noFill();
                stroke(isActive ? color(PALETTE.select) : color(255, 255, 255, 70));
                strokeWeight(isActive ? slotW / 26 : slotW / 40);
                drawingContext.setLineDash([slotW / 8, slotW / 10]);
                rect(sx, sy, slotW, slotH, slotW / 6);
                drawingContext.setLineDash([]);
                if (isActive && frameCount % 60 < 34) {
                    stroke(PALETTE.select);
                    strokeWeight(slotW / 30);
                    line(sx, sy - slotH / 6, sx, sy + slotH / 6);
                }
                noStroke();
            } else {
                if (isActive) {
                    setShadow('rgba(77, 216, 255, 0.8)', slotW / 6, 0);
                    stroke(PALETTE.select);
                    strokeWeight(slotW / 26);
                } else {
                    setShadow('rgba(0,0,0,0.35)', slotW / 8, slotW / 24);
                    stroke(0, 25);
                    strokeWeight(slotW / 90);
                }
                fill(PALETTE.cardFace);
                rect(sx, sy, slotW, slotH, slotW / 6);
                clearShadow();

                let suitIndex = i % 4;
                let suit = ['♠', '♥', '♦', '♣'][suitIndex];
                let suitCol = (suitIndex == 1 || suitIndex == 2) ? PALETTE.suitRed : PALETTE.suitDark;
                noStroke();
                fill(suitCol);
                textAlign(CENTER, CENTER);
                textSize(slotW / 5.5);
                text(suit, sx - slotW / 2 + slotW / 7.5, sy - slotH / 2 + slotW / 7.5);
                push();
                translate(sx, sy);
                rotate(PI);
                text(suit, -slotW / 2 + slotW / 7.5, -slotH / 2 + slotW / 7.5);
                pop();

                let tx = this.valueLabel(v);
                textStyle(BOLD);
                textSize(Math.min(slotW / 2, slotW * 1.6 / Math.max(tx.length, 1)));
                text(tx, sx, sy);
                textStyle(NORMAL);
            }
        }

        // keypad: card values plus backspace
        let ky = y + slotH + g;
        let keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 'back'];
        let rows = [];
        for (let i = 0; i < keys.length; i += cols) {
            rows.push(keys.slice(i, i + cols));
        }
        for (let r = 0; r < rows.length; r++) {
            let n = rows[r].length;
            let kw = n * keyS + (n - 1) * kgap;
            for (let c = 0; c < n; c++) {
                let id = rows[r][c];
                let kx = width / 2 - kw / 2 + keyS / 2 + c * (keyS + kgap);
                let kcy = ky + keyS / 2 + r * (keyS + kgap);
                hs(id, kx, kcy, keyS, keyS);
                let hov = Math.abs(mouseX - kx) < keyS / 2 && Math.abs(mouseY - kcy) < keyS / 2;
                noStroke();
                fill(255, 255, 255, hov ? 55 : 25);
                rect(kx, kcy, keyS, keyS, keyS / 4);
                if (id === 'back') {
                    stroke(255, 220);
                    strokeWeight(keyS / 16);
                    strokeCap(ROUND);
                    strokeJoin(ROUND);
                    noFill();
                    let k = keyS * 0.3;
                    beginShape();
                    vertex(kx - k, kcy);
                    vertex(kx - k * 0.35, kcy - k * 0.62);
                    vertex(kx + k, kcy - k * 0.62);
                    vertex(kx + k, kcy + k * 0.62);
                    vertex(kx - k * 0.35, kcy + k * 0.62);
                    endShape(CLOSE);
                    let bx = kx + k * 0.18;
                    let xk = k * 0.26;
                    line(bx - xk, kcy - xk, bx + xk, kcy + xk);
                    line(bx + xk, kcy - xk, bx - xk, kcy + xk);
                    noStroke();
                } else {
                    fill(255, 235);
                    textStyle(BOLD);
                    textAlign(CENTER, CENTER);
                    textSize(keyS * 0.42);
                    text(this.valueLabel('' + id), kx, kcy);
                    textStyle(NORMAL);
                }
            }
        }

        // deal button
        let ready = this.values.every(v => v !== '');
        let dy = ky + keypadH + g + dealH / 2;
        hs('deal', width / 2, dy, rowW, dealH);
        let dhov = ready && Math.abs(mouseX - width / 2) < rowW / 2 && Math.abs(mouseY - dy) < dealH / 2;
        noStroke();
        if (ready) {
            setShadow('rgba(255, 209, 102, 0.45)', dealH / 3 + (dhov ? dealH / 5 : 0), 0);
            fill(PALETTE.gold);
        } else {
            fill(255, 255, 255, 14);
        }
        rect(width / 2, dy, rowW, dealH, dealH / 2);
        clearShadow();
        fill(ready ? color('#402d00') : color(255, 90));
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        textSize(dealH * 0.48);
        text('deal', width / 2, dy);
        textStyle(NORMAL);
    }

    // difficulty filter row for the preset popup
    this.drawFilterChips = function () {
        let labels = ['all', 'easy', 'medium', 'hard', 'expert'];
        let cy = height / 2 - this.h / 2 + this.h / 5.4;
        let ch = Math.min(this.h / 22, (width + height) / 46);
        let ts = ch * 0.52;
        textFont(UI_FONT);
        textStyle(BOLD);

        // shrink until the row fits the panel
        let widths, total;
        while (true) {
            textSize(ts);
            widths = labels.map(l => textWidth(l) + ch * (l == 'all' ? 1.1 : 1.6));
            total = widths.reduce((a, b) => a + b, 0) + (labels.length - 1) * ch * 0.35;
            if (total <= this.w * 0.94 || ts <= 7) {
                break;
            }
            ts *= 0.94;
        }

        this.filterChips = [];
        let x = width / 2 - total / 2;
        for (let i = 0; i < labels.length; i++) {
            let l = labels[i];
            let cw = widths[i];
            let cx = x + cw / 2;
            let chip = {
                id: l, x: cx, y: cy, w: cw, h: ch * 1.35,
                touchingMouse: function () {
                    return mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2 && mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2;
                }
            };
            this.filterChips.push(chip);

            let sel = presetFilter == l;
            let hov = chip.touchingMouse();
            rectMode(CENTER);
            noStroke();
            fill(255, 255, 255, sel ? 45 : hov ? 30 : 14);
            rect(cx, cy, cw, ch * 1.35, ch);
            let tier = DIFF_TIERS.find(t => t.label == l);
            if (tier) {
                fill(tier.color);
                ellipse(cx - cw / 2 + ch * 0.55, cy, ch * 0.32);
            }
            fill(255, sel ? 255 : 160);
            textAlign(CENTER, CENTER);
            textSize(ts);
            text(l, cx + (tier ? ch * 0.25 : 0), cy);
            x += cw + ch * 0.35;
        }
        textStyle(NORMAL);
    }

    this.show = function () {
        this.t = lerp(this.t, 1, 0.18);
        let ease = easeOutCubic(this.t);

        // scrim
        noStroke();
        rectMode(CORNER);
        fill(0, 0, 0, 150 * ease);
        rect(0, 0, width, height);

        push();
        translate(width / 2, height / 2 + (1 - ease) * 30);
        scale(0.94 + 0.06 * ease);
        translate(-width / 2, -height / 2);

        switch (this.id) {
            case "tutorial": {
                ericLink.show();
                this.drawPanel();
                this.drawTitle("how to play");
                this.drawClose();

                noStroke();
                fill(255, 235);
                textFont(UI_FONT);
                textStyle(BOLD);
                textAlign(CENTER, CENTER);
                let headline = "use all four cards and + − × ÷ to make 24";
                let hts = height / 55 + width / 75;
                textSize(hts);
                if (textWidth(headline) > this.w * 0.94) {
                    hts *= this.w * 0.94 / textWidth(headline);
                    textSize(hts);
                }
                text(headline, width / 2, height / 2 - this.h / 3.4);
                textStyle(NORMAL);

                fill(255, 205);
                let widest = "subtraction and division follow your selection order";
                let bts = height / 65 + width / 105;
                textSize(bts);
                if (textWidth(widest) > this.w * 0.94) {
                    bts *= this.w * 0.94 / textWidth(widest);
                    textSize(bts);
                }
                textLeading(bts * 1.9);
                text("click cards (or press 1–4) to select two of them\nchoose an operation to combine them into one card\nsubtraction and division follow your selection order\nkeep going until only the 24 card remains", width / 2, height / 2 - this.h / 8.5);

                let ks = (width + height) / 75;
                let baseY = height / 2 + this.h / 6.2;

                fill(PALETTE.gold);
                textStyle(BOLD);
                textSize(height / 75 + width / 120);
                text("keyboard shortcuts", width / 2, baseY - ks * 2.4);
                textStyle(NORMAL);

                this.drawShortcut(width / 2 - this.w / 5.5, baseY, ['a', '+'], 'add', ks, PALETTE.add);
                this.drawShortcut(width / 2 + this.w / 5.5, baseY, ['s', '−'], 'subtract', ks, PALETTE.sub);
                this.drawShortcut(width / 2 - this.w / 5.5, baseY + ks * 2.1, ['m', '*'], 'multiply', ks, PALETTE.mult);
                this.drawShortcut(width / 2 + this.w / 5.5, baseY + ks * 2.1, ['d', '/'], 'divide', ks, PALETTE.div);
                this.drawShortcut(width / 2 - this.w / 4.5, baseY + ks * 4.4, ['u'], 'undo', ks);
                this.drawShortcut(width / 2, baseY + ks * 4.4, ['r'], 'reset', ks);
                this.drawShortcut(width / 2 + this.w / 4.5, baseY + ks * 4.4, ['n'], 'new cards', ks);

                this.drawFooter();
                break;
            }
            case "solution": {
                this.drawPanel();
                this.drawTitle("solutions");
                this.drawSubtitle(solutions.length + (solutions.length == 1 ? " way" : " ways") + " to make 24" + (boardRating ? " · " + boardRating.label : ""));
                this.drawClose();

                let strs = [];
                for (let i = 0; i < Math.min(solutions.length, 50); i++) {
                    strs.push(solutions[i]);
                }

                let blockW = this.w * 0.9;
                let blockTop = height / 2 - this.h / 2 + this.h / 4.6;
                let blockH = height / 2 + this.h / 2 - this.h / 10 - blockTop;

                let ts = height / 65 + width / 100;
                while (true) {
                    textFont("monospace");
                    textSize(ts);
                    let chipH = ts * 1.9;
                    let padX = ts * 0.8;
                    let gapX = ts * 0.5;
                    let gapY = ts * 0.6;

                    let rows = [];
                    let row = [];
                    let rw = 0;
                    strs.forEach(s => {
                        let cw = textWidth(s) + padX * 2;
                        if (row.length > 0 && rw + gapX + cw > blockW) {
                            rows.push({ items: row, w: rw });
                            row = [];
                            rw = 0;
                        }
                        row.push({ s: s, w: cw });
                        rw += (row.length > 1 ? gapX : 0) + cw;
                    });
                    if (row.length > 0) {
                        rows.push({ items: row, w: rw });
                    }

                    let totalH = rows.length * chipH + (rows.length - 1) * gapY;
                    if (totalH <= blockH || ts <= 8) {
                        let y = blockTop + Math.max(0, (blockH - totalH) / 2);
                        rectMode(CORNER);
                        rows.forEach(r => {
                            let x = width / 2 - r.w / 2;
                            r.items.forEach(it => {
                                noStroke();
                                fill(255, 255, 255, 16);
                                rect(x, y, it.w, chipH, chipH / 2);
                                fill(255, 220);
                                textAlign(CENTER, CENTER);
                                text(it.s, x + it.w / 2, y + chipH / 2);
                                x += it.w + gapX;
                            });
                            y += chipH + gapY;
                        });
                        break;
                    }
                    ts *= 0.93;
                }

                this.drawFooter();
                break;
            }
            case "enter": {
                this.drawPanel();
                this.drawTitle("enter your own cards");
                this.drawSubtitle("pick a value for each card, then deal");
                this.drawClose();
                this.drawEnter();
                this.drawFooter("click outside to close");
                break;
            }
            case "preset": {
                this.drawPanel();
                this.drawTitle("challenge sets");
                this.drawSubtitle("tap a set to deal it — every one is solvable");
                this.drawClose();
                this.drawFilterChips();
                if (this.buttons.length == 0) {
                    noStroke();
                    fill(255, 130);
                    textFont(UI_FONT);
                    textAlign(CENTER, CENTER);
                    textSize(height / 60 + width / 90);
                    text("no " + presetFilter + " sets yet", width / 2, height / 2);
                }
                this.buttons.forEach(button => {
                    button.show();
                });
                this.drawFooter();
                break;
            }
        }

        pop();
    }

    this.onClick = function () {
        switch (this.id) {
            case "tutorial":
                ericLink.hide();
                popup = undefined;
                break;
            case "solution":
                popup = undefined;
                break;
            case "enter": {
                let inside = Math.abs(mouseX - width / 2) < this.w / 2 && Math.abs(mouseY - height / 2) < this.h / 2;
                if (this.closeHover || !inside) {
                    popup = undefined;
                    break;
                }
                for (let i = 0; i < this.buttons.length; i++) {
                    if (this.buttons[i].touchingMouse()) {
                        this.press(this.buttons[i].id);
                        break;
                    }
                }
                break;
            }
            case "preset": {
                let chip = this.filterChips.find(c => c.touchingMouse());
                if (chip) {
                    buttonSound.play();
                    presetFilter = chip.id;
                    this.buildGrid();
                    break;
                }
                this.buttons.forEach(button => {
                    button.update();
                });
                popup = undefined;
                break;
            }
        }
    }
}
