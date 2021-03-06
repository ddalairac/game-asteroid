import { Game } from './game.js';
export class Render {
    constructor() {
        if (Render._instance) {
            throw "Ya existe una instancia de Render";
        }
        Render._instance = this;
        this.canvas = document.getElementById("stage");
        this.ctx = this.canvas.getContext("2d");
        this.rezize();
        window.onresize = function () {
            Render.instance.rezize();
        };
    }
    rezize() {
        this.ctx.canvas.width = window.innerWidth - 15;
        this.ctx.canvas.height = window.innerHeight - 15;
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
    drawPolygonAndMove(radian, centerX, centerY, sideCount, size, strokeWidth = 2, strokeColor = 'white', fillColor = 'transparent') {
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(radian);
        this.drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor);
        this.ctx.restore();
    }
    hitArea(x, y, size) {
    }
    drawShip() {
        if (Game.instance.ship) {
            let ship = Game.instance.ship;
            this.hitArea(ship.x, ship.y, ship.size);
            let centerX = ship.x;
            let centerY = ship.y;
            let radian = ship.radian;
            let size = ship.size;
            let sideCount = 3;
            let strokeWidth = 4;
            let strokeColor = 'silver';
            let fillColor = 'black';
            let fillColorWindow = 'cadetblue';
            ship.particles.forEach(part => {
                this.drawPolygonAndMove(0, part.x, part.y, part.sideCount, part.size, 1, strokeColor);
            });
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(radian);
            this.drawPolygon(sideCount, size, strokeWidth, strokeColor, 'black');
            this.drawPolygon(5, 12, strokeWidth, strokeColor, 'black');
            this.drawPolygon(2, 12, 2, strokeColor, fillColor);
            this.ctx.restore();
        }
    }
    drawBullet() {
        let size = 5;
        let sideCount = 2;
        let strokeWidth = 4;
        let strokeColor = 'red';
        let fillColor = 'red';
        Game.instance.bullets.forEach(bullet => {
            this.drawPolygonAndMove(bullet.radian, bullet.x, bullet.y, sideCount, size, strokeWidth, strokeColor, fillColor);
        });
    }
    drawAsteroid(centerX, centerY, size) {
        let sideCount = 8;
        this.hitArea(centerX, centerY, size);
        this.drawPolygonAndMove(0, centerX, centerY, sideCount, size);
    }
    drawAsteroids() {
        Game.instance.asteroids.forEach(asteroid => {
            this.drawAsteroid(asteroid.x, asteroid.y, asteroid.size);
        });
    }
    drawCollition(centerX, centerY, sideCount, size) {
        this.drawPolygonAndMove(0, centerX, centerY, sideCount, size, 1, '#222');
    }
    drawExplotion() {
        Game.instance.explotions.forEach(explotion => {
            this.drawCollition(explotion.x, explotion.y, explotion.sideCount, explotion.size);
            explotion.particles.forEach(part => {
                this.drawPolygonAndMove(0, part.x, part.y, part.sideCount, part.size, 1, 'yellow');
            });
        });
    }
    drawBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawExplotion();
        this.drawBullet();
        this.drawAsteroids();
        this.drawShip();
    }
}
//# sourceMappingURL=render.js.map