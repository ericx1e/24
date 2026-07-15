// Solutions for the current board, via the shared enumerator in
// objects/difficulty.js. The old hand-unrolled version compared floats with
// == and missed solutions like 8/(3-8/3) for 8 8 3 3.
function checkPossible() {
    return analyze24(cards.map(card => card.n)).solutions;
}
