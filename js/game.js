import { Asteroid } from './asteroid.js';
import { Render } from './render.js';
import { Ship } from './ship.js';
export class Game {
    constructor() {
        this.ship = new Ship();
        this.asteroids = [];
        this.bullets = [];
        this.nextTime = 0;
        this.delay = 1000 / 30;
        if (Game._instance) {
            throw "Ya existe una instancia de Game";
        }
        Game._instance = this;
        this.starGame();
    }
    static get instance() {
        return this._instance;
    }
    starGame() {
        this.ship = new Ship();
        this.asteroids = [new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid()];
        this.bullets = [];
        requestAnimationFrame(this.frameLoop);
    }
    frameLoop(time) {
        let that = Game.instance;
        if (time < that.nextTime) {
            requestAnimationFrame(that.frameLoop);
            return;
        }
        that.nextTime = time + that.delay;
        Render.instance.drawBoard();
        Game.instance.ship.move();
        requestAnimationFrame(that.frameLoop);
    }
}
//# sourceMappingURL=game.js.map