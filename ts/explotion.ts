import { Asteroid } from './asteroid.js';
import { Bullet } from './bullet.js';
import { Game } from './game.js';
import { Ship } from './ship.js';

export class Explotion {
    constructor(x: number, y: number, size: number) {
        this._x = x
        this._y = y
        this._size = size
    }
        
    private _x: number
    private _y: number
    private _size: number
    
    get x(): number {
        return this._x
    }
    get y(): number {
        return this._y
    }
    get size(): number {
        return this._size
    }

    destroy() {
        
    }
}