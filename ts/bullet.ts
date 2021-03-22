import { Render } from './render.js'

export class Bullet {
    constructor(x: number, y: number, angle: number) {
        this._x = x
        this._y = y
        this._angle = angle
    }
    private _x: number = 0
    private _y: number = 0
    private _angle: number = 0
    private _constSpeed: number = 25

    get radian(): number {
        return this._angle * Math.PI / 180;
    }
    get x(): number {
        return this._x
    }
    get y(): number {
        return this._y
    }
    // get angle(): number {
    //     return this._angle 
    // }
    private get speedX(): number {
        return Math.cos(this.radian) * this._constSpeed
    }
    private get speedY(): number {
        return  Math.sin(this.radian) * this._constSpeed
    }
    update(){
        this._x += this.speedX 
        this._y += this.speedY
    }
}