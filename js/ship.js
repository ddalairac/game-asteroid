import { Bullet } from './bullet.js';
import { Game } from './game.js';
import { Particle } from './particle.js';
import { Render } from './render.js';
export class Ship {
    constructor() {
        this.size = 20;
        this.keyLeftPress = false;
        this.keyRightPress = false;
        this.keyUpPress = false;
        this.keyDownPress = false;
        this._speedX = 0;
        this._speedY = 0;
        this._angle = 0;
        this._maxSpeed = 15;
        this.particles = [];
        this._x = Render.instance.stageLimitX / 2;
        this._y = Render.instance.stageLimitY / 2;
    }
    shut() {
        Game.instance.bullets.push(new Bullet(this.x, this.y, this._angle));
        Game.instance.bulletCount++;
        Game.instance.newAsteroidsEval();
    }
    update() {
        this._x += this._speedX;
        if (this._x > Render.instance.stageLimitX) {
            this._x = 0;
        }
        if (this._x < 0) {
            this._x = Render.instance.stageLimitX;
        }
        this._y += this._speedY;
        if (this._y > Render.instance.stageLimitY) {
            this._y = 0;
        }
        if (this._y < 0) {
            this._y = Render.instance.stageLimitY;
        }
        if (this.keyLeftPress) {
            this.angle -= 15;
        }
        if (this.keyRightPress) {
            this.angle += 15;
        }
        if (this.keyUpPress) {
            this.speedX += Math.cos(this.radian) / 2;
            this.speedY += Math.sin(this.radian) / 2;
            this.particles.push(new Particle(this.x, this.y, this.size, 5, this.radian), new Particle(this.x, this.y, this.size, 5, this.radian), new Particle(this.x, this.y, this.size, 5, this.radian));
        }
        if (this.keyDownPress) {
            this.speedX -= Math.cos(this.radian) / 2;
            this.speedY -= Math.sin(this.radian) / 2;
            let revertRadian = ((this.angle - 180) * Math.PI / 180);
            this.particles.push(new Particle(this.x, this.y, this.size, 5, revertRadian), new Particle(this.x, this.y, this.size, 5, revertRadian), new Particle(this.x, this.y, this.size, 5, revertRadian));
        }
        this.particles = this.particles.filter((part) => {
            part.update();
            return part.size > 0;
        });
    }
    get angle() {
        return this._angle;
    }
    set angle(value) {
        this._angle = value;
        if (this._angle > 360) {
            this._angle -= 360;
        }
        if (this._angle < 0) {
            this._angle += 360;
        }
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get radian() {
        return this.angle * Math.PI / 180;
    }
    set speedX(value) {
        this._speedX = value;
        if (this._speedX > this._maxSpeed) {
            this._speedX = this._maxSpeed;
        }
        if (this._speedX < -this._maxSpeed) {
            this._speedX = -this._maxSpeed;
        }
    }
    set speedY(value) {
        this._speedY = value;
        if (this._speedY > this._maxSpeed) {
            this._speedY = this._maxSpeed;
        }
        if (this._speedY < -this._maxSpeed) {
            this._speedY = -this._maxSpeed;
        }
    }
    get speedX() {
        return this._speedX;
    }
    get speedY() {
        return this._speedY;
    }
}
//# sourceMappingURL=ship.js.map