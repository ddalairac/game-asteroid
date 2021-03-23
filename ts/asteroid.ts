import { Game } from './game.js'
import { Render } from './render.js'

export class Asteroid {
    constructor(x: number | null = null, y: number | null = null, radian: number | null = null, size: eAstType = eAstType.big) {
        this._x = (x) ? x : this.getRandomNum(0, Render.instance.stageLimitX) * -1
        this._y = (y) ? y : this.getRandomNum(0, Render.instance.stageLimitY) * -1
        this.size = size

        this._speedX = this.getRandomNum(-this._maxSpeed, this._maxSpeed)
        this._speedY = this.getRandomNum(-this._maxSpeed, this._maxSpeed)

        // if (radian) console.log("radian", radian)
        // this._speedX = (radian)
        //     ? Math.cos(radian) 
        //     : this.getRandomNum(-3, 3)
        // this._speedY = (radian)
        //     ? Math.sin(radian) 
        //     : this.getRandomNum(-3, 3)

        // this._speedY = 0
        // this._speedY = 0
    }
    public size: eAstType
    private _x: number
    private _y: number
    private _speedX: number = 0
    private _speedY: number = 0
    private _maxSpeed: number = 3

    private getRandomNum(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    get x(): number {

        return this._x
    }
    get y(): number {
        return this._y
    }
    update() {
        // X
        this._x += this._speedX
        if (this._x > Render.instance.stageLimitX + this.size) {
            this._x = 0 - this.size
        }
        if (this._x < 0 - this.size) {
            this._x = Render.instance.stageLimitX + this.size
        }
        // Y
        this._y += this._speedY
        if (this._y > Render.instance.stageLimitY + this.size) {
            this._y = 0 - this.size
        }
        if (this._y < 0 - this.size) {
            this._y = Render.instance.stageLimitY + this.size
        }
    }
}
export enum eAstType {
    big = 50,
    medium = 30,
    small = 15,
}