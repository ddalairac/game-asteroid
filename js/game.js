import { Asteroid } from './asteroid.js';
import { Collition } from './collition.js';
import { Render } from './render.js';
import { Ship } from './ship.js';
export class Game {
    constructor() {
        this.bulletCount = 0;
        this.gameOver = false;
        this.collision = new Collition();
        this.ship = new Ship();
        this.asteroids = [];
        this.bullets = [];
        this.explotions = [];
        this.delay = Math.round(1000 / 24);
        this.nextTime = 0;
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
        console.log("Game Start");
        this.gameOver = false;
        this.bulletCount = 0;
        this.ship = new Ship();
        this.asteroids = [new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid()];
        this.bullets = [];
        this.explotions = [];
        this.collision = new Collition();
        requestAnimationFrame(this.frameLoop);
    }
    newAsteroidsEval() {
        console.log("asteroid total", this.asteroids.length);
        if (this.bulletCount % 19 == 0) {
            console.log("new asteroid - total", this.asteroids.length);
            this.asteroids.push(new Asteroid());
        }
    }
    bulletsClean() {
        this.bullets = this.bullets.filter(b => (b.x > 0 && b.x < Render.instance.stageLimitX && b.y > 0 && b.y < Render.instance.stageLimitY));
    }
    bulletsUpdate() {
        this.bulletsClean();
        this.bullets.forEach(bul => bul.update());
    }
    asteroidsUpdate() {
        this.asteroids.forEach(ast => ast.update());
    }
    explotionsUpdate() {
        this.explotions.forEach(exp => exp.update());
    }
    frameLoop(time) {
        let that = Game.instance;
        if (time < that.nextTime) {
            requestAnimationFrame(that.frameLoop);
            return;
        }
        that.nextTime = time + that.delay;
        if (Game.instance.ship)
            Game.instance.ship.update();
        Game.instance.asteroidsUpdate();
        Game.instance.bulletsUpdate();
        Game.instance.collision.eval();
        Game.instance.explotionsUpdate();
        Render.instance.drawBoard();
        if (Game.instance.gameOver == false) {
            requestAnimationFrame(that.frameLoop);
        }
    }
    onGameOver() {
        setTimeout(() => {
            console.log("Game Over");
            console.log("puntos: ", (this.explotions.length - 1) * 100);
            this.gameOver = true;
            this.starGame();
        }, 2000);
    }
}
//# sourceMappingURL=game.js.map