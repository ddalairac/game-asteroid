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
    drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor) {
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
    }
    drawPolygon_Move(centerX, centerY, sideCount, size, strokeWidth, strokeColor, fillColor) {
        this.ctx.translate(centerX, centerY);
        this.drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor);
        this.ctx.translate(-centerX, -centerY);
    }
    drawPolygon_MoveAndRotate(radian, centerX, centerY, sideCount, size, strokeWidth, strokeColor, fillColor) {
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(radian);
        this.drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor);
        this.ctx.rotate(-radian);
        this.ctx.translate(-centerX, -centerY);
    }
    drawShip() {
        let ship = Game.instance.ship;
        let centerX = ship.x;
        let centerY = ship.y;
        let radian = ship.radian;
        let size = 20;
        let sideCount = 3;
        let strokeWidth = 4;
        let strokeColor = 'silver';
        let fillColor = 'whitesmoke';
        let fillColorWindow = 'cadetblue';
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(radian);
        this.drawPolygon(5, 16, strokeWidth, strokeColor, fillColor);
        this.drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor);
        this.drawPolygon(2, 16, 2, strokeColor, fillColor);
        this.ctx.rotate(-radian);
        this.ctx.translate(-centerX, -centerY);
    }
    drawBullet() {
        let size = 5;
        let sideCount = 2;
        let strokeWidth = 4;
        let strokeColor = 'red';
        let fillColor = 'red';
        Game.instance.bullets.forEach(bullet => {
            this.drawPolygon_MoveAndRotate(bullet.radian, bullet.x, bullet.y, sideCount, size, strokeWidth, strokeColor, fillColor);
        });
    }
    drawAsteroid(centerX, centerY, size) {
        let sideCount = 8;
        let strokeWidth = 4;
        let strokeColor = 'darkred';
        let fillColor = 'brown';
        this.drawPolygon_Move(centerX, centerY, sideCount, size, strokeWidth, strokeColor, fillColor);
    }
    drawAsteroids() {
        Game.instance.asteroids.forEach(asteroid => {
            this.drawAsteroid(asteroid.x, asteroid.y, asteroid.size);
        });
    }
    drawBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBullet();
        this.drawShip();
        this.drawAsteroids();
    }
}
//# sourceMappingURL=render.js.map