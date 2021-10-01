
var rover;


function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    canvas.position(0, 0);

    rover = createRoverCam();
    rover.usePointerLock();
}

function draw() {
    background(51);
    // translate(0, 0, -100);
    fill(255, 0, 0);
    noStroke();
    let n = 50;
    for (let i = 0; i < n; i++) {
        push();
        rotateZ(PI/2);
        rotateY(2*PI/n * i);
        rectMode(CENTER)
        rect(0, 0, 100, 2); 
        pop();
    }
    // box(50);
    // orbitControl();
    lights();
}

