function PresetButton(x, y, s, nums) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.w = this.s;
    this.h = this.s;
    this.nums = nums;

    this.show = function () {
        fill(220);
        stroke(255, 100, 100);
        strokeWeight(this.s / 20);
        rectMode(CENTER);
        rect(this.x, this.y, this.s, this.s, this.s / 7);
        fill(255, 100, 100);
        strokeWeight(this.s / 40);
        strokeCap(SQUARE);
        line(this.x, this.y - this.h / 2, this.x, this.y + this.h / 2);
        line(this.x - this.w / 2, this.y, this.x + this.w / 2, this.y);
        textAlign(CENTER, CENTER);
        textFont('Helvetica');
        noStroke();
        text(nums[0], this.x - this.w / 4, this.y - this.h / 4);
        text(nums[1], this.x + this.w / 4, this.y - this.h / 4);
        text(nums[2], this.x - this.w / 4, this.y + this.h / 4);
        text(nums[3], this.x + this.w / 4, this.y + this.h / 4);
    }

    this.touchingMouse = function () {
        return this.x - this.w / 2 < mouseX && this.x + this.w / 2 > mouseX && this.y - this.h / 2 < mouseY && this.y + this.h / 2 > mouseY;
    }

    this.update = function () {
        if (this.touchingMouse()) {
            newBoard(nums);
        }
    }
}