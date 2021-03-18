import { Render } from './render.js'

export class Asteroid {
    constructor() {
        this.size = this.getRandomNum(2,5) *10
        this._x = this.getRandomNum(0,Render.instance.stageLimitX)
        this._y = this.getRandomNum(0,Render.instance.stageLimitY)
        this._speedX = this.getRandomNum(-this._maxSpeed,this._maxSpeed)
        this._speedY = this.getRandomNum(-this._maxSpeed,this._maxSpeed)
        // console.log("asteroid", this)
    }
    public size: number 
    private _x: number
    private _y: number
    private _speedX: number = 0
    private _speedY: number = 0
    private _maxSpeed: number = 10

    private getRandomNum(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    get x(): number {
        this._x += this._speedX
        if (this._x > Render.instance.stageLimitX + this.size) {
            this._x = 0 - this.size
        }
        if (this._x < 0 - this.size) {
            this._x = Render.instance.stageLimitX+ this.size
        }
        return this._x
    }
    get y(): number {
        this._y += this._speedY
        if (this._y > Render.instance.stageLimitY+ this.size) {
            this._y = 0 - this.size
        }
        if (this._y < 0 - this.size) {
            this._y = Render.instance.stageLimitY+ this.size
        }
        return this._y
    }
}