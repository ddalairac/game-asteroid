import { Asteroid, eAstType } from './asteroid.js';
import { Bullet } from './bullet.js';
import { Explotion } from './explotion.js';
import { Collition } from './collition.js';
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

    public bulletCount: number = 0
    public gameOver: boolean = false
    public collision: Collition = new Collition()
    public ship: Ship | null = new Ship()
    public asteroids: Asteroid[] = []
    public bullets: Bullet[] = []
    public explotions: Explotion[] = []

    private delay: number = Math.round(1000 / 24)
    private nextTime: number = 0

    public starGame() {
        console.log("Game Start")
        this.gameOver = false
        this.bulletCount = 0
        this.ship = new Ship()
        this.asteroids = [new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid()]
        this.bullets = []
        this.explotions = []
        this.collision = new Collition()
        requestAnimationFrame(this.frameLoop);
    }
    public newAsteroidsEval() {
        console.log("asteroid total",this.asteroids.length)
        if (this.bulletCount % 19 == 0) {
            console.log("new asteroid - total",this.asteroids.length)
            this.asteroids.push(new Asteroid())
        }
    }

    private bulletsClean() {
        this.bullets = this.bullets.filter(b => (b.x > 0 && b.x < Render.instance.stageLimitX && b.y > 0 && b.y < Render.instance.stageLimitY));
    }
    private bulletsUpdate() {
        this.bulletsClean()
        this.bullets.forEach(bul => bul.update());
    }
    private asteroidsUpdate() {
        this.asteroids.forEach(ast => ast.update());
    }
    private explotionsUpdate() {
        this.explotions.forEach(exp => exp.update());
    }

    private frameLoop(time: number) {
        let that = Game.instance
        if (time < that.nextTime) { requestAnimationFrame(that.frameLoop); return; }
        that.nextTime = time + that.delay;
        if (Game.instance.ship) Game.instance.ship.update()
        Game.instance.asteroidsUpdate()
        Game.instance.bulletsUpdate()
        Game.instance.collision.eval()
        Game.instance.explotionsUpdate()    

        Render.instance.drawBoard()
        if (Game.instance.gameOver == false) {
            requestAnimationFrame(that.frameLoop);
        }
    }

    public onGameOver() {
        setTimeout(() => {
            console.log("Game Over")
            console.log("puntos: ", (this.explotions.length-1) * 100)
            this.gameOver = true

            // setTimeout(() => {
                this.starGame()
            // }, 1500);
        }, 2000);
    }
}