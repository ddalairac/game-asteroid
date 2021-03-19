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

    private drawPolygon(sideCount: number, size: number, strokeWidth: number, strokeColor: string, fillColor: string) {

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
    private drawPolygon_Move(centerX: number, centerY: number, sideCount: number, size: number, strokeWidth: number, strokeColor: string, fillColor: string) {
        this.ctx.translate(centerX, centerY);
        this.drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor)
        this.ctx.translate(-centerX, -centerY);
    }
    private drawPolygon_MoveAndRotate(radian: number, centerX: number, centerY: number, sideCount: number, size: number, strokeWidth: number, strokeColor: string, fillColor: string) {
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(radian);
        this.drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor)
        this.ctx.rotate(-radian);
        this.ctx.translate(-centerX, -centerY);
    }




    private drawShip() {
        let ship = Game.instance.ship

        let centerX: number = ship.x
        let centerY: number = ship.y
        let radian: number = ship.radian
        let size: number = 20
        let sideCount: number = 3
        let strokeWidth: number = 4
        let strokeColor: string = 'silver'
        let fillColor: string = 'whitesmoke'
        let fillColorWindow: string = 'cadetblue'
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(radian);

        this.drawPolygon( 5, 16, strokeWidth, strokeColor, fillColor)
        this.drawPolygon( sideCount, size, strokeWidth, strokeColor, fillColor)
        this.drawPolygon( 2, 16, 2, strokeColor, fillColor)
        // this.drawPolygon( 2, 3, 15, fillColorWindow, fillColor)
        // this.drawPolygon_MoveAndRotate(ship.radian, ship.x, ship.y, sideCount, size, strokeWidth, strokeColor, fillColor)

        this.ctx.rotate(-radian);
        this.ctx.translate(-centerX, -centerY);
    }
    private drawBullet() {
        let size: number = 5
        let sideCount: number = 2
        let strokeWidth: number = 4
        // let strokeColor: string = 'chartreuse'
        let strokeColor: string = 'red'
        let fillColor: string = 'red'
        Game.instance.bullets.forEach(bullet => {
            this.drawPolygon_MoveAndRotate(bullet.radian, bullet.x, bullet.y, sideCount, size, strokeWidth, strokeColor, fillColor)
        });
    }
    private drawAsteroid(centerX: number, centerY: number, size: number) {
        let sideCount: number = 8
        let strokeWidth: number = 4
        let strokeColor: string = 'darkred'
        let fillColor: string = 'brown'

        this.drawPolygon_Move(centerX, centerY, sideCount, size, strokeWidth, strokeColor, fillColor)
    }
    private drawAsteroids() {
        Game.instance.asteroids.forEach(asteroid => {
            this.drawAsteroid(asteroid.x, asteroid.y, asteroid.size)
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