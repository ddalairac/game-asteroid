export class Particle {
    constructor(x, y, size, sideCount, radian = null) {
        this._maxSpeed = 4;
        this._x = x;
        this._y = y;
        this._size = size / 4;
        this._sideCount = sideCount;
        this._radian = radian;
        if (radian != null) {
            this._speedX = Math.cos(radian) + this.getRandomNum(-0.4, 0.4);
            this._speedY = Math.sin(radian) + this.getRandomNum(-0.4, 0.4);
        }
        else {
            this._speedX = this.getRandomNum(-this._maxSpeed, this._maxSpeed);
            this._speedY = this.getRandomNum(-this._maxSpeed, this._maxSpeed);
        }
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get size() {
        return this._size;
    }
    get sideCount() {
        return this._sideCount;
    }
    update() {
        if (this._radian != null) {
            this._x -= this._speedX * 15;
            this._y -= this._speedY * 15;
            this._size -= 1;
        }
        else {
            this._x += this._speedX;
            this._y += this._speedY;
            this._size -= 0.6;
        }
    }
    getRandomNum(min, max) {
        return Math.random() * (max - min) + min;
    }
}
//# sourceMappingURL=particle.js.map