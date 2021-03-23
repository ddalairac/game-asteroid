
export class Particle {
    constructor(x: number, y: number, size: number, sideCount: number, radian: number | null = null) {
        this._x = x
        this._y = y
        this._size = size / 4
        this._sideCount = sideCount
        this._radian = radian
        if (radian != null) {
            this._speedX = Math.cos(radian) + this.getRandomNum(-0.4, 0.4)
            this._speedY = Math.sin(radian) + this.getRandomNum(-0.4, 0.4)
        } else {
            this._speedX = this.getRandomNum(-this._maxSpeed, this._maxSpeed)
            this._speedY = this.getRandomNum(-this._maxSpeed, this._maxSpeed)
        }
    }

    private _radian: number | null
    private _x: number
    private _y: number
    private _size: number
    private _sideCount: number
    private _speedX: number
    private _speedY: number
    private _maxSpeed: number = 4

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
        if (this._radian != null) {
            this._x -= this._speedX *15 
            this._y -= this._speedY *15 
            this._size -= 1
        } else {
            this._x += this._speedX
            this._y += this._speedY
            this._size -= 0.6
        }
    }

    private getRandomNum(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}