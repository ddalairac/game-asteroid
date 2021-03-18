import { Render } from './render.js'

export class Ship {
    constructor() {
        this._x = Render.instance.stageLimitX / 2
        this._y = Render.instance.stageLimitY / 2
    }
    private _x: number
    private _y: number
    private _speedX: number = 0
    private _speedY: number = 0
    private _angle: number = 0

    private maxSpeed: number = 30
    public keyLeftPress: boolean = false
    public keyRightPress: boolean = false
    public keyUpPress: boolean = false
    public keyDownPress: boolean = false

    public get angle(): number {
        return this._angle
    }
    public set angle(value: number) {
        this._angle = value
        if (this._angle > 360) {
            this._angle -= 360
        }
        if (this._angle < 0) {
            this._angle += 360
        }
        // console.log("angle",this.angle)
    }

    get x(): number {
        this._x += this._speedX
        if (this._x > Render.instance.stageLimitX) {
            this._x = 0
        }
        if (this._x < 0) {
            this._x = Render.instance.stageLimitX
        }
        return this._x
    }
    get y(): number {
        this._y += this._speedY
        if (this._y > Render.instance.stageLimitY) {
            this._y = 0
        }
        if (this._y < 0) {
            this._y = Render.instance.stageLimitY
        }
        return this._y
    }
    set speedX(value: number) {

        this._speedX = value
        if (this._speedX > this.maxSpeed) {
            this._speedX = this.maxSpeed
        }
        if (this._speedX < -this.maxSpeed) {
            this._speedX = -this.maxSpeed
        }
        // console.log("this._speedX", this._speedX, value)
    }
    set speedY(value: number) {
        this._speedY = value
        if (this._speedY > this.maxSpeed) {
            this._speedY = this.maxSpeed
        }
        if (this._speedY < -this.maxSpeed) {
            this._speedY = -this.maxSpeed
        }

    }
    get speedX(): number {
        return this._speedX
    }
    get speedY(): number {
        return this._speedY
    }
    get radian():number{
        return this.angle * Math.PI / 180;
    }
    public move() {
        if (this.keyLeftPress) {
            this.angle -= 6
        }
        if (this.keyRightPress) {
            this.angle += 6
        }
        if (this.keyUpPress) {
            
            this.speedX += Math.cos(this.radian)
            this.speedY += Math.sin(this.radian)
            // console.log("speed", { speedX: this.speedX, speedY: this.speedY, cos: Math.cos(this.radian), sin: Math.sin(this.radian) })
        }
        if (this.keyDownPress) {
            let radians = this.angle * Math.PI / 180;
            this.speedX -= Math.cos(this.radian)
            this.speedY -= Math.sin(this.radian)
            // console.log("speed", { speedX: this.speedX, speedY: this.speedY, cos: Math.cos(radians), sin: Math.sin(radians) })
        }

    }
}