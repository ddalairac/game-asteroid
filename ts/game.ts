import { Asteroid } from './asteroid.js';
import { Bullet } from './bullet.js';
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

    // interval: number | undefined
    public ship: Ship = new Ship()
    public asteroids: Asteroid[] = []
    public bullets: Bullet[] = []
    private nextTime: number = 0
    private delay: number = 1000 / 30

    public starGame() {
        // clearInterval(this.interval)
        // this.interval = setInterval(this.frameLoop, 50);
        this.ship = new Ship()
        this.asteroids = [new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid()]
        this.bullets = []
        requestAnimationFrame(this.frameLoop);
    }
    private frameLoop(time: number) {
        let that = Game.instance
        if (time < that.nextTime) { requestAnimationFrame(that.frameLoop); return; }
        that.nextTime = time + that.delay;
        Render.instance.drawBoard()
        Game.instance.ship.move()
        requestAnimationFrame(that.frameLoop);
    }
}