import { Asteroid, eAstType } from './asteroid.js';
import { Bullet } from './bullet.js';
import { Explotion } from './explotion.js';
import { Game } from './game.js';
import { Ship } from './ship.js';

export class Collition {
    constructor() { }

    eval() {
        this.collitionShip()
        this.collitionBullets()
    }
    // //private count: number = 0
    private collitionShip() {
        let ship: Ship | null = Game.instance.ship
        if (ship) {
            let sRadio = ship.size
            let sPX = ship.x
            let sPY = ship.y

            Game.instance.asteroids.forEach(ast => {
                let aRadio = ast.size
                let aPX = ast.x
                let aPY = ast.y

                /** Formula for distance between vectors
                 *   ________________________
                 *  √ (x1 - x2)² + (y1 - y2)²     */
                let distanceBetweenVectors = Math.sqrt(Math.pow((sPX - aPX), 2) + Math.pow((sPY - aPY), 2))
                if (distanceBetweenVectors - sRadio - aRadio < 0) {
                    this.destroyShip()
                    Game.instance.onGameOver()
                }
            });
        }
    }
    private collitionBullets() {
        let newAsteroids: Asteroid[] = []
        let asteroids = Game.instance.asteroids
        asteroids = asteroids.filter(ast => {
            let aRadio = ast.size
            let aPX = ast.x
            let aPY = ast.y
            let asteroidExist = true
            Game.instance.bullets = Game.instance.bullets.filter(b => {
                let bPX = b.x
                let bPY = b.y
                // distance between vectors
                let distanceBetweenVectors = Math.sqrt(Math.pow((bPX - aPX), 2) + Math.pow((bPY - aPY), 2))
                if (distanceBetweenVectors - aRadio < 0) {
                    this.destroyAsteroid(ast, newAsteroids, b.radian)
                    asteroidExist = false;  // detroy asteroid
                    return false // detroy bullet
                }
                return true
            });
            return asteroidExist
        });
        Game.instance.asteroids = [...asteroids, ...newAsteroids]
    }
    public destroyShip() {
        // console.log("destroyShip")
        let ship: Ship | null = Game.instance.ship
        if (ship) {
            Game.instance.explotions.push(new Explotion(ship.x, ship.y, ship.size, 3))
        }
        Game.instance.ship = null
    }
    private destroyAsteroid(ast: Asteroid, newAsteroids: Asteroid[], radian: number): Asteroid[] {
        // console.log("destroyAsteroid")
        // // // console.log("this.count", this.count)
        // // if (this.count > 6) {
        // //     this.count = 0
        // //     newAsteroids.push(new Asteroid())
        // // }
        // // this.count++
        Game.instance.explotions.push(new Explotion(ast.x, ast.y, ast.size, 6))
        if (ast.size == eAstType.big) {
            newAsteroids.push(
                new Asteroid(ast.x, ast.y, radian - 0.5, eAstType.medium),
                new Asteroid(ast.x, ast.y, radian + 0.5, eAstType.medium)
            )
        }
        if (ast.size == eAstType.medium) {
            newAsteroids.push(
                new Asteroid(ast.x, ast.y, radian - 0.5, eAstType.small),
                new Asteroid(ast.x, ast.y, radian, eAstType.small),
                new Asteroid(ast.x, ast.y, radian + 0.5, eAstType.small)
            )
        }
        return newAsteroids
    }
}