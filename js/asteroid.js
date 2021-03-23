import { Render } from './render.js';
export class Asteroid {
    constructor(x = null, y = null, radian = null, size = eAstType.big) {
        this._speedX = 0;
        this._speedY = 0;
        this._maxSpeed = 3;
        this._x = (x) ? x : this.getRandomNum(0, Render.instance.stageLimitX) * -1;
        this._y = (y) ? y : this.getRandomNum(0, Render.instance.stageLimitY) * -1;
        this.size = size;
        this._speedX = this.getRandomNum(-this._maxSpeed, this._maxSpeed);
        this._speedY = this.getRandomNum(-this._maxSpeed, this._maxSpeed);
    }
    getRandomNum(min, max) {
        return Math.random() * (max - min) + min;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    update() {
        this._x += this._speedX;
        if (this._x > Render.instance.stageLimitX + this.size) {
            this._x = 0 - this.size;
        }
        if (this._x < 0 - this.size) {
            this._x = Render.instance.stageLimitX + this.size;
        }
        this._y += this._speedY;
        if (this._y > Render.instance.stageLimitY + this.size) {
            this._y = 0 - this.size;
        }
        if (this._y < 0 - this.size) {
            this._y = Render.instance.stageLimitY + this.size;
        }
    }
}
export var eAstType;
(function (eAstType) {
    eAstType[eAstType["big"] = 50] = "big";
    eAstType[eAstType["medium"] = 30] = "medium";
    eAstType[eAstType["small"] = 15] = "small";
})(eAstType || (eAstType = {}));
//# sourceMappingURL=asteroid.js.map