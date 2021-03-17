

var canvas: HTMLCanvasElement = document.getElementById("stage") as HTMLCanvasElement;
var ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

// Full screen
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;


// Dibujar elemento
var x:number = 0
function draw() {
    ctx.beginPath();
    ctx.rect(x, 20, 130, 200);
    ctx.stroke();
}

// Dibujar frame
function frameLoop() {
    // borrar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dibujar canvas
    draw()
    if (x > canvas.width) x = -130
    x++
}

var interval = setInterval(frameLoop, 10);

