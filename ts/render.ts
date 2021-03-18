import { Game } from './game.js';


export class Render {
    constructor() {
        if (Render._instance) {
            throw "Ya existe una instancia de Render";
        }
        Render._instance = this
        this.canvas = document.getElementById("stage") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        // set Canvas Size
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
    }

    private ctx: CanvasRenderingContext2D
    private canvas: HTMLCanvasElement

    private static _instance: Render
    public static get instance() {
        return this._instance;
    }
    get stageLimitX() {
        return this.ctx.canvas.width
    }
    get stageLimitY() {
        return this.ctx.canvas.height
    }

    drawPolygon(centerX: number, centerY: number, radian: number, sideCount: number = 3, size: number = 20,
        strokeWidth: number = 4, strokeColor: string = 'purple', fillColor: string = 'skyblue') {

        // let radian = angle * Math.PI / 180;

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


    private drawShip() {
        let ship = Game.instance.ship
        this.drawPolygon(ship.x, ship.y, ship.radian)
    }
    private drawAsteroids() {
        Game.instance.asteroids.forEach(asteroid => {
            this.drawAsteroid(asteroid.x, asteroid.y, asteroid.size)
        });
    }
    private drawAsteroid(centerX: number, centerY: number, size: number) {
        let sideCount: number = 8
        let strokeWidth: number = 4
        let strokeColor: string = 'purple'
        let fillColor: string = 'skyblue'

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
    private drawBullet() {
        Game.instance.bullets.forEach(bullet => {
            this.drawPolygon(bullet.x, bullet.y, bullet.radian, 2, 5)
        });
    }

    public drawBoard() {
        // borrar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar canvas
        this.drawBullet()
        this.drawShip()
        this.drawAsteroids()
    }
}