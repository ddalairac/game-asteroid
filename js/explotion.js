import { Particle } from './particle.js';
export class Explotion {
    constructor(x, y, size, sideCount) {
        this.particles = [];
        this._x = x;
        this._y = y;
        this._size = size;
        this._sideCount = sideCount;
        this.explode();
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
        this.particles = this.particles.filter((part) => {
            part.update();
            return part.size > 0;
        });
    }
    explode() {
        this.particles = [
            new Particle(this.x, this.y, this.size * 1.5, 5),
            new Particle(this.x, this.y, this.size * 1.5, 5),
            new Particle(this.x, this.y, this.size * 1.5, 5),
            new Particle(this.x, this.y, this.size * 1.5, 5),
            new Particle(this.x, this.y, this.size * 1.5, 5),
            new Particle(this.x, this.y, this.size * 1.5, 5)
        ];
    }
}
//# sourceMappingURL=explotion.js.map