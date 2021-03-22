import { Asteroid } from './asteroid.js';
import { Bullet } from './bullet.js';
import { Collision } from './collision.js';
import { Render } from './render.js';
import { Ship } from './ship.js';

export class Game {
    constructor() {
        if (Game._instance) {
            throw "Ya existe una instancia de Game";
        }
        Game._instance = this
        this.starGame()
    }
    private static _instance: Game
    public static get instance() {
        return this._instance;
    }

    public ship: Ship | null = new Ship()
    public asteroids: Asteroid[] = []
    public bullets: Bullet[] = []
    public collisions: Collision[] = []
    private nextTime: number = 0
    private delay: number = Math.round(1000 / 24)
    private gameOver: boolean = false

    public starGame() {
        this.gameOver = false
        console.log("Game Start")
        this.ship = new Ship()
        this.asteroids = [new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid()]
        this.bullets = []
        this.collisions = []
        requestAnimationFrame(this.frameLoop);
    }


    public bulletsClean() {
        this.bullets = this.bullets.filter(b => (b.x > 0 && b.x < Render.instance.stageLimitX && b.y > 0 && b.y < Render.instance.stageLimitY));
    }
    public bulletsUpdate() {
        this.bulletsClean()
        this.bullets.forEach(bul => bul.update());
    }
    public asteroidsUpdate() {
        this.asteroids.forEach(ast => ast.update());
    }

    public collitionShip() {
        if (this.ship) {
            let sRadio = this.ship.size
            let sPX = this.ship.x
            let sPY = this.ship.y

            this.asteroids.forEach(ast => {
                let aRadio = ast.size
                let aPX = ast.x
                let aPY = ast.y

                /** Formula for distance between vectors
                 *   ________________________
                 *  √ (x1 - x2)² + (y1 - y2)²     */
                let distanceBetweenVectors = Math.sqrt(Math.pow((sPX - aPX), 2) + Math.pow((sPY - aPY), 2))
                // console.log("distanceBetweenVectors", distanceBetweenVectors, "sr", sRadio, "ar", aRadio, "resta", distanceBetweenVectors - sRadio - aRadio)
                if (distanceBetweenVectors - sRadio - aRadio < 0) {
                    console.log("destroyShip")
                    this.onGameOver()
                    this.collisions.push(new Collision(sPX, sPY, sRadio))
                }
            });
        }
    }
    public collitionBullets() {
        this.asteroids = this.asteroids.filter(ast => {
            let aRadio = ast.size
            let aPX = ast.x
            let aPY = ast.y
            let asteroidExist = true
            this.bullets = this.bullets.filter(b => {
                let bPX = b.x
                let bPY = b.y
                // distance between vectors
                let distanceBetweenVectors = Math.sqrt(Math.pow((bPX - aPX), 2) + Math.pow((bPY - aPY), 2))
                if (distanceBetweenVectors - aRadio < 0) {
                    console.log("destroyAsteroid")
                    this.collisions.push(new Collision(aPX, aPY, aRadio))
                    asteroidExist = false;  // detroy asteroid
                    return false // detroy bullet
                }
                return true
            });
            return asteroidExist
        });
    }
    private frameLoop(time: number) {
        let that = Game.instance
        if (time < that.nextTime) { requestAnimationFrame(that.frameLoop); return; }
        that.nextTime = time + that.delay;
        if (Game.instance.ship) Game.instance.ship.update()
        Game.instance.asteroidsUpdate()
        Game.instance.bulletsUpdate()

        Game.instance.collitionShip()
        Game.instance.collitionBullets()
        Render.instance.drawBoard()
        if (Game.instance.gameOver == false) {
            requestAnimationFrame(that.frameLoop);
        }
    }

    public onGameOver() {
        this.ship = null
        setTimeout(() => {
            console.log("Game Over")
            this.gameOver = true

            setTimeout(() => {
                this.starGame()
            }, 500);
        }, 1);
    }
}