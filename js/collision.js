import { Asteroid, eAstType } from './asteroid.js';
import { Explotion } from './explotion.js';
import { Game } from './game.js';
export class Collition {
    constructor() { }
    eval() {
        this.collitionShip();
        this.collitionBullets();
    }
    collitionShip() {
        let ship = Game.instance.ship;
        if (ship) {
            let sRadio = ship.size;
            let sPX = ship.x;
            let sPY = ship.y;
            Game.instance.asteroids.forEach(ast => {
                let aRadio = ast.size;
                let aPX = ast.x;
                let aPY = ast.y;
                let distanceBetweenVectors = Math.sqrt(Math.pow((sPX - aPX), 2) + Math.pow((sPY - aPY), 2));
                if (distanceBetweenVectors - sRadio - aRadio < 0) {
                    this.destroyShip();
                    Game.instance.onGameOver();
                }
            });
        }
    }
    collitionBullets() {
        let newAsteroids = [];
        let asteroids = Game.instance.asteroids;
        let bullets = Game.instance.bullets;
        asteroids = asteroids.filter(ast => {
            let aRadio = ast.size;
            let aPX = ast.x;
            let aPY = ast.y;
            let asteroidExist = true;
            bullets = bullets.filter(b => {
                let bPX = b.x;
                let bPY = b.y;
                let distanceBetweenVectors = Math.sqrt(Math.pow((bPX - aPX), 2) + Math.pow((bPY - aPY), 2));
                if (distanceBetweenVectors - aRadio < 0) {
                    this.destroyAsteroid(ast, newAsteroids);
                    asteroidExist = false;
                    return false;
                }
                return true;
            });
            return asteroidExist;
        });
        Game.instance.asteroids = [...asteroids, ...newAsteroids];
    }
    destroyShip() {
        let ship = Game.instance.ship;
        if (ship) {
            Game.instance.explotions.push(new Explotion(ship.x, ship.y, ship.size));
        }
        Game.instance.ship = null;
    }
    destroyAsteroid(ast, newAsteroids) {
        Game.instance.explotions.push(new Explotion(ast.x, ast.y, ast.size));
        if (ast.size == eAstType.big) {
            newAsteroids.push(new Asteroid(ast.x, ast.y, eAstType.medium), new Asteroid(ast.x, ast.y, eAstType.medium));
        }
        if (ast.size == eAstType.medium) {
            newAsteroids.push(new Asteroid(ast.x, ast.y, eAstType.small), new Asteroid(ast.x, ast.y, eAstType.small), new Asteroid(ast.x, ast.y, eAstType.small));
        }
        return newAsteroids;
    }
}
//# sourceMappingURL=collision.js.map