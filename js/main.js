"use strict";
var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var x = 0;
function draw() {
    ctx.beginPath();
    ctx.rect(x, 20, 130, 200);
    ctx.stroke();
}
function frameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    if (x > canvas.width)
        x = -130;
    x++;
}
var interval = setInterval(frameLoop, 10);
//# sourceMappingURL=main.js.map