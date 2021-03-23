import { parseJsonText } from '../node_modules/typescript/lib/typescript.js';
import { Asteroid } from './asteroid.js';
import { Bullet } from './bullet.js';
import { Game } from './game.js';
import { Particle } from './particle.js';
import { Ship } from './ship.js';

export class Explotion {
    constructor(x: number, y: number, size: number, sideCount: number) {
        this._x = x
        this._y = y
        this._size = size
        this._sideCount = sideCount
        this.explode()
    }

    private _x: number
    private _y: number
    private _size: number
    private _sideCount: number
    public particles: Particle[] = []

    get x(): number {
        return this._x
    }
    get y(): number {
        return this._y
    }
    get size(): number {
        return this._size
    }
    get sideCount(): number {
        return this._sideCount
    }

    update() {
        // console.log("particle update")
        this.particles = this.particles.filter((part) => {
            part.update()
            return part.size > 0
        })
    }

    private explode() {
        // console.log("explode")
        this.particles = [
            new Particle(this.x, this.y, this.size *1.5, 5),
            new Particle(this.x, this.y, this.size *1.5, 5),
            new Particle(this.x, this.y, this.size *1.5, 5),
            new Particle(this.x, this.y, this.size *1.5, 5),
            new Particle(this.x, this.y, this.size *1.5, 5),
            new Particle(this.x, this.y, this.size *1.5, 5)
        ]
    }
}