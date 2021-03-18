export class Bullet {
    constructor(x, y, angle) {
        this._x = 0;
        this._y = 0;
        this._angle = 0;
        this._constSpeed = 15;
        this._x = x;
        this._y = y;
        this._angle = angle;
    }
    get radian() {
        return this._angle * Math.PI / 180;
    }
    get x() {
        this._x += this.speedX;
        return this._x;
    }
    get y() {
        this._y += this.speedY;
        return this._y;
    }
    get speedX() {
        return Math.cos(this.radian) * this._constSpeed;
    }
    get speedY() {
        return Math.sin(this.radian) * this._constSpeed;
    }
}
//# sourceMappingURL=bullet.js.map