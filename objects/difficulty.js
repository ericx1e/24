// Shared 24-solver and difficulty rating.
//
// analyze24(nums) enumerates every way to combine the numbers with + − × ÷ and
// returns { solutions, rating }:
//   solutions — distinct solution strings (minimal parentheses), easiest first
//   rating    — difficulty tier, or null when unsolvable
//
// Solution count alone is a poor difficulty signal — a puzzle is as hard as its
// EASIEST solution path. Every path is scored by how awkward it is for a human
// (fractional intermediates are by far the strongest predictor, then negative
// or large intermediates, then division), and the puzzle's score is the
// cheapest path plus a rarity bump when only a couple of easy solutions exist.

const DIFF_TIERS = [
    { label: 'easy', color: '#51cf66' },
    { label: 'medium', color: '#ffd166' },
    { label: 'hard', color: '#ff6b6b' },
    { label: 'expert', color: '#c77dff' },
];

function analyze24(nums) {
    const EPS = 1e-6;
    let found = new Map(); // canonical form -> { display, cost }

    // wrap children in parens only where precedence requires it
    function show(a, op, b, prec) {
        let l = a.p < prec ? '(' + a.d + ')' : a.d;
        let r = (b.p < prec || (b.p == prec && (op == '-' || op == '/'))) ? '(' + b.d + ')' : b.d;
        return l + op + r;
    }

    function rec(items, flags) {
        if (items.length == 1) {
            let it = items[0];
            if (Math.abs(it.v - 24) < EPS) {
                let cost = (flags.frac ? 4 : 0) + (flags.neg ? 1.5 : 0) + (flags.div ? 0.5 : 0);
                if (flags.maxI > 32) cost += 1;
                if (flags.maxI > 72) cost += 1;
                let prev = found.get(it.s);
                if (!prev || prev.cost > cost) {
                    found.set(it.s, { display: it.d, cost: cost });
                }
            }
            return;
        }
        for (let i = 0; i < items.length; i++) {
            for (let j = i + 1; j < items.length; j++) {
                let a = items[i], b = items[j];
                let rest = items.filter((_, k) => k != i && k != j);
                let combos = [
                    { v: a.v + b.v, s: [a.s, b.s].sort().join('+'), d: show(a, '+', b, 1), p: 1, op: '+' },
                    { v: a.v * b.v, s: [a.s, b.s].sort().join('*'), d: show(a, '*', b, 2), p: 2, op: '*' },
                    { v: a.v - b.v, s: a.s + '-' + b.s, d: show(a, '-', b, 1), p: 1, op: '-' },
                    { v: b.v - a.v, s: b.s + '-' + a.s, d: show(b, '-', a, 1), p: 1, op: '-' },
                ];
                if (Math.abs(b.v) > EPS) {
                    combos.push({ v: a.v / b.v, s: a.s + '/' + b.s, d: show(a, '/', b, 2), p: 2, op: '/' });
                }
                if (Math.abs(a.v) > EPS) {
                    combos.push({ v: b.v / a.v, s: b.s + '/' + a.s, d: show(b, '/', a, 2), p: 2, op: '/' });
                }
                combos.forEach(c => {
                    rec(rest.concat([{ v: c.v, s: '(' + c.s + ')', d: c.d, p: c.p }]), {
                        frac: flags.frac || Math.abs(c.v - Math.round(c.v)) > EPS,
                        neg: flags.neg || c.v < -EPS,
                        maxI: Math.max(flags.maxI, Math.abs(c.v)),
                        div: flags.div || c.op == '/',
                    });
                });
            }
        }
    }

    rec(nums.map(n => ({ v: n, s: '' + n, d: '' + n, p: 3 })), { frac: false, neg: false, maxI: 0, div: false });

    let all = Array.from(found.values()).sort((x, y) => x.cost - y.cost || x.display.length - y.display.length);
    let solutions = all.map(f => f.display);

    if (all.length == 0) {
        return { solutions: solutions, rating: null };
    }

    let minCost = all[0].cost;

    // rarity: how many distinct solutions are in the easiest class — one lone
    // clean path is much harder to spot than eight of them
    let nBest = 0;
    all.forEach(f => {
        if (f.cost <= minCost + 0.5) {
            nBest++;
        }
    });
    let rarity = Math.max(0, 1.8 - 0.9 * Math.log2(nBest + 1));
    let score = minCost + rarity;

    // calibrated over all 1820 hands: ~74% easy, 14% medium, 11% hard, 1% expert
    // (expert = every solution passes through a fractional intermediate)
    let tier = score >= 4 ? 3 : score >= 1.2 ? 2 : score >= 0.7 ? 1 : 0;
    let rating = { tier: tier, label: DIFF_TIERS[tier].label, color: DIFF_TIERS[tier].color, score: score };
    return { solutions: solutions, rating: rating };
}

function rateDifficulty(nums) {
    return analyze24(nums).rating;
}
