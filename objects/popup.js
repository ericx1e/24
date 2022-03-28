function Popup(id) {
    this.id = id;
    this.w = width * 9.5 / 10;
    this.h = height * 9.5 / 10;

    this.buttons = [];

    if (this.id == "preset") {
        // let buttonsPerRow = parseInt((this.w + this.h) / 200);
        let buttonsPerRow = 10 + parseInt(1000 / height);
        let spacing = this.w / 50;
        let buttonSize = (this.w - spacing) / buttonsPerRow - spacing;

        for (let i = 0; i < presets.length; i++) {
            let line = presets[i].split(" ");
            let nums = [];
            for (let j = 0; j < 4; j++) {
                nums[j] = parseInt(line[j])
            }
            let startingX = width / 2 - this.w / 2 + spacing + buttonSize / 2;
            let startingY = height / 2 - this.h / 2 + spacing + buttonSize / 2 + this.h / 11;

            this.buttons.push(new PresetButton(startingX + (i % buttonsPerRow) * (buttonSize + spacing), startingY + parseInt(i / buttonsPerRow) * (buttonSize + spacing), buttonSize, nums));
        }
    }

    this.show = function () {
        switch (this.id) {
            case "tutorial":
                ericLink.show();
                rectMode(CENTER);
                noStroke();
                fill(0, 200);
                rect(width / 2, height / 2, this.w, this.h, width * 9 / 200);
                fill(255);
                textAlign(CENTER, TOP);
                textSize(height / 80 + width / 30);
                textFont("Monospace");
                textWrap(WORD);
                text("welcome to 24 the game!", width / 2, height / 2 - height * 9.5 / 22, width * 9.5 / 11);
                textSize(height / 60 + width / 90);
                text("\n\n\nthe objective of the game is to use all the cards to create 24\nyou must use all four cards and only be left with the 24 card\nclick on cards or use ('1', '2', '3', '4') keys to select them\nonce you have two cards selected, choose an operation to combine them\naddition-('a','+','left')\tmultiplication-('m','*','right')\nsubtraction-('s','-','up')\tdivision-('d','/','down')\nundo-('u')\treset-('r')\tnext-('n')\n\n\n(click anywhere to close)", width / 2, height / 2 - height * 9.5 / 22, width * 9.5 / 11);
                textFont('Helvetica');
                break;
            case "solution":
                rectMode(CENTER);
                noStroke();
                fill(0, 200);
                rect(width / 2, height / 2, this.w, this.h, width * 9 / 200);
                fill(255);
                textAlign(CENTER, TOP);
                textSize(width / 20);
                textFont("Monospace");
                let done = false;
                txt = "";
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 10; j++) {
                        if (10 * i + j >= solutions.length) {
                            done = true;
                            break;
                        }
                        txt += solutions[10 * i + j] + ' ';
                    }
                    if (done) {
                        break;
                    }
                }
                textSize(height / 60 + width / 90);
                text("solutions\n\n" + txt + "\n\n\n(click anywhere to close)", width / 2, height / 2 - height * 9.5 / 22, width * 9.5 / 11);
                textFont('Helvetica');
                break;
            case "preset":
                rectMode(CENTER);
                noStroke();
                fill(0, 200);
                rect(width / 2, height / 2, this.w, this.h, width * 9 / 200);
                fill(255);
                textAlign(CENTER, TOP);
                textSize(height / 60 + width / 90);
                textFont("Monospace");
                textWrap(WORD);
                text("challenging sets", width / 2, height / 2 - height * 9.5 / 22, width * 9.5 / 11);
                this.buttons.forEach(button => {
                    button.show();
                });
                break;
        }
    }

    this.onClick = function () {
        switch (this.id) {
            case "tutorial":
                ericLink.hide();
                popup = undefined;
                break;
            case "solution":
                popup = undefined;
            case "preset":
                this.buttons.forEach(button => {
                    button.update();
                });
                popup = undefined;
        }
    }
}