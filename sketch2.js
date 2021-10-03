

let cards = [];
let prevCards = [];
let selectedCards = [];
let intialCards = [];
let score = 0;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.position(0, 0);

    // cards = [new Card(100, 100, 7),new Card(100, 100, 7),new Card(100, 100, 4),new Card(100, 100, 4)]

    // for(let n = 0; n < 4; n++) {
    //     for(let i = 1; i <= 13; i++) {
    //         cards.push(new Card(random(0, width-50), random(0, height-50), i));
    //     }
    // }

}


function draw() {
    background(51);

    textSize(30);
    fill(255);
    noStroke();
    textAlign(LEFT, TOP)
    text("score: " + score, 100, 50);
    text("fps: " + Math.floor(frameRate()), 100, 100);

    let flag = false;
    for(let i = cards.length-1; i >= 0; i--) {
        let card = cards[i];
        if(!flag && card.update()) {
            flag = true;
            cards.splice(i, 1);
            cards.push(card);
            // cards.splice(0, 0, card);
        }
    }
    for(let i = 0; i < cards.length; i++) {
        let card = cards[i];
        card.show();
    }
    noCursor();
    if(mouseIsPressed) {
        stroke(255, 50, 50);
        strokeWeight(15);
    } else {
        stroke(255, 0, 0);
        strokeWeight(10);
    }
    line(mouseX, mouseY, pmouseX, pmouseY);
}

function keyTyped() {
    if(key == ' ') {
        let flag = false;
        for(let i = cards.length-1; i >= 0; i--) {
            let card = cards[i];
            if(!flag && card.touchingMouse()) {
                flag = true;
                // card.selected = !card.selected;
                cards.splice(i, 1);
                cards.push(card);
                if(selectedCards.includes(card)) {
                    selectedCards.splice(selectedCards.indexOf(card), 1);
                } else {
                    selectedCards.push(card);
                    if(selectedCards.length > 2) {
                        selectedCards.splice(0, 1);
                    }

                }
            }
        }
    }

    if(key == 'n') {
        newBoard();
        checkPossible();
    }

    if(selectedCards.length == 2) {
        if(key == 'a') {
            prevCards = [];
            cards.forEach(card => {
                prevCards.push(card);
            });
            cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n + selectedCards[1].n));
            cards.splice(cards.indexOf(selectedCards[0]), 1);
            cards.splice(cards.indexOf(selectedCards[1]), 1);
            selectedCards = [];
        }
        
        if(key == 's') {
            prevCards = [];
            cards.forEach(card => {
                prevCards.push(card);
            });
            cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n - selectedCards[1].n));
            cards.splice(cards.indexOf(selectedCards[0]), 1);
            cards.splice(cards.indexOf(selectedCards[1]), 1);
            selectedCards = [];
        }

        if(key == 'd') {
            prevCards = [];
            cards.forEach(card => {
                prevCards.push(card);
            });
            cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n / selectedCards[1].n));
            cards.splice(cards.indexOf(selectedCards[0]), 1);
            cards.splice(cards.indexOf(selectedCards[1]), 1);
            selectedCards = [];
        }

        if(key == 'm') {
            prevCards = [];
            cards.forEach(card => {
                prevCards.push(card);
            });
            cards.push(new Card(selectedCards[1].x, selectedCards[1].y, selectedCards[0].n * selectedCards[1].n));
            cards.splice(cards.indexOf(selectedCards[0]), 1);
            cards.splice(cards.indexOf(selectedCards[1]), 1);
            selectedCards = [];
        }

        if(cards.length == 1) {
            if(cards[0].n == 24) {
                score++;
                newBoard();
            }
        }
    }

    if(key == 'u') {
        cards = [];
        prevCards.forEach(card => {
            cards.push(card);
        });
    }

    if(key == 'r') {
        cards = [];
        intialCards.forEach(card => {
            cards.push(card);
        });
    }
}

function newBoard() {
    cards = [];
    for(let i = 0; i < 4; i++) {
        cards.push(new Card(random(0, width-125), random(0, height-175), Math.floor(random(1, 14))));
    }

    prevCards = [];
    cards.forEach(card => {
        prevCards.push(card);
    });

    intialCards = [];
    cards.forEach(card => {
        intialCards.push(card);
    });
}

function checkPossible() {
    permutations = permutator(cards);
    // operations = permutator([0,1,2,3]);
    permutations.forEach(p => {
        result = 0;
        result += p[0].n;
        console.log(p[0].n, p[1].n, p[2].n, p[3].n);
        for (let i = 0; i < 1; i++) {
            switch(i) {
                case 0:
                    result += p[1].n;
                    //break;
                case 1:
                    result -= p[1].n;
                    //break;
                case 2:
                    result *= p[1].n;
                    //break;
                case 3:
                    result /= p[1].n;
                    //break;
            }
            for (let j = 0; j < 1; j++) {
                switch(j) {
                    case 0:
                        result += p[2].n;
                        //break;
                    case 1:
                        result -= p[2].n;
                        //break;
                    case 2:
                        result *= p[2].n;
                        //break;
                    case 3:
                        result /= p[2].n;
                        //break;
                }
                for (let k = 0; k < 1; k++) {
                    switch(k) {
                        case 0:
                            result += p[3].n;
                            //break;
                        case 1:
                            result -= p[3].n;
                            //break;
                        case 2:
                            result *= p[3].n;
                            //break;
                        case 3:
                            result /= p[3].n;
                            //break;
                    }
                    // if(result > 10) {
                    //     console.log(result);
                    // }
                }
            }
        }
    });
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

function Card(x, y, n) {
    this.x = x; 
    this.y = y;
    this.w = 125;
    this.h = 175;
    this.n = n;
    this.lifted = false;
    this.selected = false;

    this.show = function() {
        // noStroke();
        let tx;
        switch(this.n) {
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
            default:
                tx = Math.round(n * 100) / 100;
                break;
        }

        this.selected = selectedCards.includes(this);

        if(this.lifted) {
            noStroke();
            fill(17, 100);
            rect(this.x, this.y, this.w, this.h, 20);
            if(this.selected) {
                strokeWeight(5);
                stroke(255, 50, 50); 
            } else {
                strokeWeight(2);
                stroke(17); 
            }
            fill(255);
            rect(this.x+5, this.y-3, this.w, this.h, 20);
            fill(255, 100, 100);
            noStroke();
            textSize(this.w/2);
            textAlign(CENTER, CENTER)
            text(tx, this.x+5+this.w/2, this.y-3+this.h/2);

            if(this.selected) {
                noStroke();
                fill(255, 50, 50);
                textSize(20);
                text(selectedCards.indexOf(this)+1, this.x + 5 + 20, this.y - 3 + 20);
            }
        } else {
            if(this.selected) {
                strokeWeight(5);
                stroke(255, 50, 50); 
            } else {
                strokeWeight(2);
                stroke(17); 
            }
            fill(255);
            rect(this.x, this.y, this.w, this.h, 20);
            fill(255, 100, 100);
            noStroke();
            textSize(this.w/2);
            textAlign(CENTER, CENTER)
            text(tx, this.x+this.w/2, this.y+this.h/2);

            if(this.selected) {
                noStroke();
                fill(255, 50, 50);
                textSize(20);
                text(selectedCards.indexOf(this)+1, this.x + 20, this.y + 20);
            }
        }

    }

    this.update = function() {
        if(this.lifted) {
            this.x += mouseX-pmouseX;
            this.y += mouseY-pmouseY;
        }
        this.lifted = mouseIsPressed && this.touchingMouse();

        // if(this.lifted) {
        //     this.x += mouseX-pmouseX;
        //     this.y += mouseY-pmouseY;
        // }
        return this.lifted; //So you can only life one card at a time
    }

    this.touchingMouse = function() {
        return this.x < mouseX && this.x + this.w > mouseX && this.y < mouseY && this.y + this.h > mouseY;
    }
}