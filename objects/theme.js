// Shared visual theme + drawing helpers

const UI_FONT = 'Nunito';

const PALETTE = {
    gold: '#ffd166',
    goldDeep: '#e6a817',
    select: '#4dd8ff',
    cardFace: '#fdfaf2',
    suitRed: '#d64545',
    suitDark: '#2f3140',
    add: '#ff6b6b',
    sub: '#5c9dff',
    mult: '#51cf66',
    div: '#c77dff',
};

function setShadow(col, blur, oy) {
    drawingContext.shadowColor = col;
    drawingContext.shadowBlur = blur;
    drawingContext.shadowOffsetY = oy || 0;
}

function clearShadow() {
    drawingContext.shadowColor = 'rgba(0,0,0,0)';
    drawingContext.shadowBlur = 0;
    drawingContext.shadowOffsetY = 0;
}

function easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// recover the exact rational behind a float via continued fractions
// (every reachable card value is a ratio of small integers)
function toFraction(x) {
    if (!isFinite(x)) {
        return null;
    }
    let neg = x < 0;
    x = Math.abs(x);
    let h1 = 1, h0 = 0, k1 = 0, k0 = 1, b = x;
    for (let i = 0; i < 30; i++) {
        let a = Math.floor(b);
        let h2 = a * h1 + h0, k2 = a * k1 + k0;
        if (k2 > 100000) {
            break;
        }
        h0 = h1; h1 = h2; k0 = k1; k1 = k2;
        if (Math.abs(x - h1 / k1) < 1e-9 || b - a < 1e-12) {
            break;
        }
        b = 1 / (b - a);
    }
    if (Math.abs(x - h1 / k1) > 1e-9) {
        return null;
    }
    return [neg ? -h1 : h1, k1];
}

function formatNumber(x) {
    if (Math.abs(x - Math.round(x)) < 1e-9) {
        return '' + Math.round(x);
    }
    let f = toFraction(x);
    if (f) {
        return f[0] + '/' + f[1];
    }
    return '' + Math.round(x * 100) / 100;
}

// Small rising equation label shown after each operation
function FloatingText(x, y, txt) {
    this.x = x;
    this.y = y;
    this.txt = txt;
    this.life = 70;

    this.show = function () {
        this.y -= (width + height) / 2800;
        this.life--;
        let a = Math.min(1, this.life / 30);
        noStroke();
        textFont(UI_FONT);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        textSize((width + height) / 75);
        setShadow('rgba(0,0,0,0.5)', 6, 2);
        fill(255, 255, 255, 235 * a);
        text(this.txt, this.x, this.y);
        clearShadow();
        textStyle(NORMAL);
    }
}
