import { Render } from './render.js';
import { Ship } from './ship.js';
export class Game {
    constructor() {
        this.ship = new Ship();
        this.delay = 1000 / 30;
        if (Game._instance) {
            throw "Ya existe una instancia de Game";
        }
        Game._instance = this;
        this.nextTime = 0;
        this.starGame();
    }
    static get instance() {
        return this._instance;
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
    starGame() {
        requestAnimationFrame(this.frameLoop);
    }
}
//# sourceMappingURL=game.js.map