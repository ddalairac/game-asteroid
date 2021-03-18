import { Render } from './render.js';
import { Ship } from './ship.js';

export class Game {
    constructor() {
        if (Game._instance) {
            throw "Ya existe una instancia de Game";
        }
        Game._instance = this
        this.nextTime = 0
        this.starGame()
    }
    private static _instance: Game
    public static get instance() {
        return this._instance;
    }
    interval: number | undefined
    ship: Ship = new Ship()

    nextTime:number ;
    delay:number = 1000 / 30 ;
    private frameLoop(time:number) {
        let that = Game.instance
        if (time < that.nextTime) { requestAnimationFrame(that.frameLoop); return; }
        that.nextTime = time + that.delay;
        Render.instance.drawBoard()
        Game.instance.ship.move()
        requestAnimationFrame(that.frameLoop);
    }

    public starGame() {
        // clearInterval(this.interval)
        // this.interval = setInterval(this.frameLoop, 50);
        requestAnimationFrame(this.frameLoop);
    }
    

}