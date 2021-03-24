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

    public interval4NewAst: number = 0
    public timeStart: number = Date.now()
    // public timeEnd: Date = new Date()
    public gameOver: boolean = false
    public bulletCount: number = 0
    public collision: Collition = new Collition()
    public ship: Ship | null = new Ship()
    public asteroids: Asteroid[] = []
    public bullets: Bullet[] = []
    public explotions: Explotion[] = []

    private delay: number = Math.round(1000 / 24)
    private nextTime: number = 0

    public starGame() {
        // console.log("Game Start");
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
        (window as any).requestAnimationFrame(Game.instance.frameLoop);
    }
    public newAsteroidsEval() {
        // console.log("asteroid total",this.asteroids.length) 
        if (this.bulletCount % 30 == 0) {
            // console.log("new asteroid - total",this.asteroids.length)
            this.asteroids.push(new Asteroid())
        }
    }

    private frameLoop(time: number) {
        if (time < Game.instance.nextTime) {
            (window as any).requestAnimationFrame(Game.instance.frameLoop);
            return;
        }
        Game.instance.nextTime = time + Game.instance.delay;
        if (Game.instance.ship) Game.instance.ship.update()
        Game.instance.asteroidsUpdate()
        Game.instance.bulletsUpdate()
        Game.instance.collision.eval()
        Game.instance.explotionsUpdate()

        Render.instance.drawBoard()
        if (Game.instance.gameOver == false) {
            requestAnimationFrame(Game.instance.frameLoop);
        }
    }
    public onGameOver() {
        setTimeout(() => {
            // console.log("Game Over")
            this.gameOver = true
            clearInterval(this.interval4NewAst)
            this.modalShow()
        }, 2000);
    }
    public modalHide() {
        let modalElm: HTMLElement = document.getElementById('modal') as HTMLElement
        if (modalElm) modalElm.classList.add('hidden')
    }
    public modalShow() {
        let timeEnd: number = Date.now();
        let timeElapsed: number = timeEnd - this.timeStart;
        let asteroidsDestroy = this.explotions.length - 1;

        let scoreElm: HTMLElement = document.getElementById('score') as HTMLElement;
        let modalElm: HTMLElement = document.getElementById('modal') as HTMLElement;
        let bulletsElm: HTMLElement = document.getElementById('bullets') as HTMLElement;
        let asteroidsElm: HTMLElement = document.getElementById('asteroids') as HTMLElement;
        let asteroids2Elm: HTMLElement = document.getElementById('asteroids2') as HTMLElement;
        let timeElm: HTMLElement = document.getElementById('time') as HTMLElement;

        let score: number = ((asteroidsDestroy * 1.3 - this.bulletCount) + (timeElapsed / 1000)) * 3 - this.asteroids.length;
        score = (score < 0) ? 0 : score;

        if (modalElm) modalElm.classList.remove('hidden');
        if (scoreElm) scoreElm.innerText = "" + score.toFixed(0);
        if (bulletsElm) bulletsElm.innerText = "" + this.bulletCount;
        if (asteroidsElm) asteroidsElm.innerText = "" + asteroidsDestroy;
        if (asteroids2Elm) asteroids2Elm.innerText = "" + (this.asteroids.length);

        let DateTime = new Date(timeElapsed);
        let hour: string = (DateTime.getUTCHours().toString().length < 2) ? "0" + DateTime.getUTCHours().toString() : DateTime.getUTCHours().toString()
        let minutes: string = (DateTime.getUTCMinutes().toString().length < 2) ? "0" + DateTime.getUTCMinutes().toString() : DateTime.getUTCMinutes().toString()
        let seconds: string = (DateTime.getUTCSeconds().toString().length < 2) ? "0" + DateTime.getUTCSeconds().toString() : DateTime.getUTCSeconds().toString()
        if (timeElm) timeElm.innerText = hour + ":" + minutes + ":" + seconds;
    }
    private time4aNewAsteroid() {
        this.interval4NewAst = setInterval(() => {
            this.asteroids.push(new Asteroid())
            // console.log("Asteroids", this.asteroids)
        }, 5000)
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

}