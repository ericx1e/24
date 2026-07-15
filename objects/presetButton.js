function PresetButton(x, y, s, nums, rating) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.w = this.s;
    this.h = this.s;
    this.nums = nums;
    this.rating = rating;
    this.hoverT = 0;

    this.show = function () {
        this.hoverT = lerp(this.hoverT, this.touchingMouse() ? 1 : 0, 0.3);

        push();
        translate(this.x, this.y);
        scale(1 + 0.08 * this.hoverT);

        rectMode(CENTER);
        setShadow('rgba(0,0,0,0.4)', this.s / 8 + this.hoverT * this.s / 8, this.s / 30);
        if (this.hoverT > 0.02) {
            stroke(255, 209, 102, 255 * this.hoverT);
            strokeWeight(this.s / 22);
        } else {
            noStroke();
        }
        fill(PALETTE.cardFace);
        rect(0, 0, this.s, this.s, this.s / 7);
        clearShadow();

        // quadrant dividers
        stroke(0, 25);
        strokeWeight(this.s / 50);
        strokeCap(ROUND);
        line(0, -this.s / 2 + this.s / 8, 0, this.s / 2 - this.s / 8);
        line(-this.s / 2 + this.s / 8, 0, this.s / 2 - this.s / 8, 0);

        noStroke();
        fill(PALETTE.suitDark);
        textAlign(CENTER, CENTER);
        textFont(UI_FONT);
        textStyle(BOLD);
        textSize(this.s / 3.4);
        text(this.nums[0], -this.w / 4, -this.h / 4);
        text(this.nums[1], this.w / 4, -this.h / 4);
        text(this.nums[2], -this.w / 4, this.h / 4);
        text(this.nums[3], this.w / 4, this.h / 4);
        textStyle(NORMAL);

        // difficulty dot where the quadrant dividers cross
        if (this.rating) {
            stroke(PALETTE.cardFace);
            strokeWeight(this.s / 40);
            fill(this.rating.color);
            ellipse(0, 0, this.s / 7);
            noStroke();
        }

        pop();
    }

    this.touchingMouse = function () {
        return this.x - this.w / 2 < mouseX && this.x + this.w / 2 > mouseX && this.y - this.h / 2 < mouseY && this.y + this.h / 2 > mouseY;
    }

    this.update = function () {
        if (this.touchingMouse()) {
            newBoard(this.nums);
        }
    }
}
