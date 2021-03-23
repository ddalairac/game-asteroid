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
        this.rezize()
        window.onresize = function () {
            Render.instance.rezize()
        }
    }
    rezize() {
        this.ctx.canvas.width = window.innerWidth - 15;
        this.ctx.canvas.height = window.innerHeight - 15;
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
    private drawPolygon_Move(centerX: number, centerY: number, sideCount: number, size: number, strokeWidth: number = 2, strokeColor: string = 'white', fillColor: string = 'transparent') {
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor)
        this.ctx.restore()
    }
    private drawPolygon_MoveAndRotate(radian: number, centerX: number, centerY: number, sideCount: number, size: number, strokeWidth: number = 2, strokeColor: string = 'white', fillColor: string = 'transparent') {
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(radian);
        this.drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor)
        this.ctx.restore()
    }



    hitArea(x: number, y: number, size: number) {
        // this.ctx.beginPath();
        // // this.ctx.rect(x, y, size, size);
        // this.ctx.arc(x, y, size, 0, 2 * Math.PI);
        // this.ctx.fillStyle = "red";
        // this.ctx.fill()
        // this.ctx.closePath();
    }

    private drawShip() {
        if (Game.instance.ship) {
            let ship = Game.instance.ship

            this.hitArea(ship.x, ship.y, ship.size);

            let centerX: number = ship.x
            let centerY: number = ship.y
            let radian: number = ship.radian
            let size: number = ship.size
            let sideCount: number = 3
            let strokeWidth: number = 4
            let strokeColor: string = 'silver'
            let fillColor: string = 'black'
            let fillColorWindow: string = 'cadetblue'

            ship.particles.forEach(part => {
                this.drawPolygon_MoveAndRotate(0, part.x, part.y, part.sideCount, part.size, 1, strokeColor)
            })
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(radian);

            this.drawPolygon(sideCount, size, strokeWidth, strokeColor, fillColor) // triangulo
            // this.drawPolygon( 5, 8, strokeWidth, strokeColor, 'black') // pentagrama
            // this.drawPolygon(2, 8, 2, strokeColor, fillColor) // center line
            this.drawPolygon(2, 11, 2, strokeColor, fillColor) // center line
            this.ctx.restore()

        }
    }
    private drawBullet() {
        let size: number = 5
        let sideCount: number = 2
        let strokeWidth: number = 4
        let strokeColor: string = 'red'
        let fillColor: string = 'red'
        Game.instance.bullets.forEach(bullet => {
            this.drawPolygon_MoveAndRotate(bullet.radian, bullet.x, bullet.y, sideCount, size, strokeWidth, strokeColor, fillColor)
        });
    }
    private drawAsteroid(centerX: number, centerY: number, size: number) {
        let sideCount: number = 8
        // let strokeWidth: number = 4
        // let strokeColor: string = 'darkred'
        // let fillColor: string = 'brown'

        this.hitArea(centerX, centerY, size);
        this.drawPolygon_MoveAndRotate(0, centerX, centerY, sideCount, size, /*strokeWidth , strokeColor, fillColor */)
    }
    private drawAsteroids() {
        Game.instance.asteroids.forEach(asteroid => {
            this.drawAsteroid(asteroid.x, asteroid.y, asteroid.size)
        });
    }
    private drawCollition(centerX: number, centerY: number, sideCount: number, size: number) {
        this.drawPolygon_MoveAndRotate(0, centerX, centerY, sideCount, size, 1, '#222')
    }
    private drawExplotion() {
        Game.instance.explotions.forEach(explotion => {
            this.drawCollition(explotion.x, explotion.y, explotion.sideCount, explotion.size)
            explotion.particles.forEach(part => {
                this.drawPolygon_MoveAndRotate(0, part.x, part.y, part.sideCount, part.size, 1, 'yellow')
            });
        });
    }

    public drawBoard() {
        // borrar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar canvas
        this.drawExplotion()
        this.drawBullet()
        this.drawAsteroids()
        this.drawShip()
    }
}