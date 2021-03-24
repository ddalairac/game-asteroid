import { Asteroid } from './asteroid.js';
import { Collition } from './collition.js';
import { Render } from './render.js';
import { Ship } from './ship.js';
export class Game {
    constructor() {
        this.interval4NewAst = 0;
        this.timeStart = Date.now();
        this.gameOver = false;
        this.bulletCount = 0;
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
        Game.instance.modalHide();
        Game.instance.timeStart = Date.now();
        Game.instance.gameOver = false;
        Game.instance.bulletCount = 0;
        Game.instance.collision = new Collition();
        Game.instance.ship = new Ship();
        Game.instance.asteroids = [new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid()];
        Game.instance.bullets = [];
        Game.instance.explotions = [];
        Game.instance.time4aNewAsteroid();
        window.requestAnimationFrame(Game.instance.frameLoop);
    }
    newAsteroidsEval() {
        if (this.bulletCount % 30 == 0) {
            this.asteroids.push(new Asteroid());
        }
    }
    frameLoop(time) {
        if (time < Game.instance.nextTime) {
            window.requestAnimationFrame(Game.instance.frameLoop);
            return;
        }
        Game.instance.nextTime = time + Game.instance.delay;
        if (Game.instance.ship)
            Game.instance.ship.update();
        Game.instance.asteroidsUpdate();
        Game.instance.bulletsUpdate();
        Game.instance.collision.eval();
        Game.instance.explotionsUpdate();
        Render.instance.drawBoard();
        if (Game.instance.gameOver == false) {
            requestAnimationFrame(Game.instance.frameLoop);
        }
    }
    onGameOver() {
        setTimeout(() => {
            this.gameOver = true;
            clearInterval(this.interval4NewAst);
            this.modalShow();
        }, 2000);
    }
    modalHide() {
        let modalElm = document.getElementById('modal');
        if (modalElm)
            modalElm.classList.add('hidden');
    }
    modalShow() {
        let timeEnd = Date.now();
        let timeElapsed = timeEnd - this.timeStart;
        let asteroidsDestroy = this.explotions.length - 1;
        let scoreElm = document.getElementById('score');
        let modalElm = document.getElementById('modal');
        let bulletsElm = document.getElementById('bullets');
        let asteroidsElm = document.getElementById('asteroids');
        let asteroids2Elm = document.getElementById('asteroids2');
        let timeElm = document.getElementById('time');
        let score = ((asteroidsDestroy * 1.3 - this.bulletCount) + (timeElapsed / 1000)) * 3 - this.asteroids.length;
        score = (score < 0) ? 0 : score;
        if (modalElm)
            modalElm.classList.remove('hidden');
        if (scoreElm)
            scoreElm.innerText = "" + score.toFixed(0);
        if (bulletsElm)
            bulletsElm.innerText = "" + this.bulletCount;
        if (asteroidsElm)
            asteroidsElm.innerText = "" + asteroidsDestroy;
        if (asteroids2Elm)
            asteroids2Elm.innerText = "" + (this.asteroids.length);
        let DateTime = new Date(timeElapsed);
        let hour = (DateTime.getUTCHours().toString().length < 2) ? "0" + DateTime.getUTCHours().toString() : DateTime.getUTCHours().toString();
        let minutes = (DateTime.getUTCMinutes().toString().length < 2) ? "0" + DateTime.getUTCMinutes().toString() : DateTime.getUTCMinutes().toString();
        let seconds = (DateTime.getUTCSeconds().toString().length < 2) ? "0" + DateTime.getUTCSeconds().toString() : DateTime.getUTCSeconds().toString();
        if (timeElm)
            timeElm.innerText = hour + ":" + minutes + ":" + seconds;
    }
    time4aNewAsteroid() {
        this.interval4NewAst = setInterval(() => {
            this.asteroids.push(new Asteroid());
        }, 5000);
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
}
//# sourceMappingURL=game.js.map