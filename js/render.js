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
    drawPolygon(centerX, centerY, radian, sideCount = 3, size = 20, strokeWidth = 4, strokeColor = 'purple', fillColor = 'skyblue') {
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(radian);
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
        this.ctx.rotate(-radian);
        this.ctx.translate(-centerX, -centerY);
    }
    drawShip() {
        let ship = Game.instance.ship;
        this.drawPolygon(ship.x, ship.y, ship.radian);
    }
    drawAsteroids() {
        Game.instance.asteroids.forEach(asteroid => {
            this.drawAsteroid(asteroid.x, asteroid.y, asteroid.size);
        });
    }
    drawAsteroid(centerX, centerY, size) {
        let sideCount = 8;
        let strokeWidth = 4;
        let strokeColor = 'purple';
        let fillColor = 'skyblue';
        this.ctx.translate(centerX, centerY);
        this.ctx.beginPath();
        this.ctx.moveTo(size * Math.cos(0), size * Math.sin(0));
        for (var i = 1; i <= sideCount; i += 1) {
            this.ctx.lineTo(size * Math.cos(i * 2 * Math.PI / sideCount), size * Math.sin(i * 2 * Math.PI / sideCount));
        }
        this.ctx.fillStyle = fillColor;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = strokeWidth;
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.translate(-centerX, -centerY);
    }
    drawBullet() {
        Game.instance.bullets.forEach(bullet => {
            this.drawPolygon(bullet.x, bullet.y, bullet.radian, 2, 5);
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