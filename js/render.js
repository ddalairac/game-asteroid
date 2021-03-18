import { Game } from './game.js';
export class Render {
    constructor() {
        if (Render._instance) {
            throw "Ya existe una instancia de Render";
        }
        Render._instance = this;
        this.canvas = document.getElementById("stage");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
    }
    static get instance() {
        return this._instance;
    }
    get stageLimitX() {
        return this.ctx.canvas.width;
    }
    get stageLimitY() {
        return this.ctx.canvas.height;
    }
    drawPolygon(centerX, centerY, rotationDegrees = 45, sideCount = 3, size = 20, strokeWidth = 4, strokeColor = 'purple', fillColor = 'skyblue') {
        let radians = rotationDegrees * Math.PI / 180;
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(radians);
        this.ctx.beginPath();
        this.ctx.moveTo(size * Math.cos(0), size * Math.sin(0));
        for (var i = 1; i <= sideCount; i += 1) {
            this.ctx.lineTo(size * Math.cos(i * 2 * Math.PI / sideCount), size * Math.sin(i * 2 * Math.PI / sideCount));
        }
        this.ctx.closePath();
        this.ctx.fillStyle = fillColor;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = strokeWidth;
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.rotate(-radians);
        this.ctx.translate(-centerX, -centerY);
    }
    drawShip() {
        let ship = Game.instance.ship;
        this.drawPolygon(ship.x, ship.y, ship.angle);
    }
    drawAsteroid() {
        this.drawPolygon(200, 200, 0, 8, 50);
    }
    drawBullet() {
        this.drawPolygon(500, 500, 0, 2, 5);
    }
    drawBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawShip();
        this.drawAsteroid();
        this.drawBullet();
    }
}
//# sourceMappingURL=render.js.map