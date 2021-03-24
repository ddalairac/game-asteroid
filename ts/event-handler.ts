import { Game } from './game.js';

export class EventHandler {
    constructor() {
        document.addEventListener('keydown', this.keydownEventHandler)
        document.addEventListener('keyup', this.keyupEventHandler)
        this.start = document.getElementById('newBTN')
        if (this.start) this.start.addEventListener('click', Game.instance.starGame)
    }

    start: HTMLElement | null
    private keydownEventHandler(e: KeyboardEvent) {
        // console.log("keydown", e)
        switch (e.code) {
            case eKey.Left:
                if (Game.instance.ship) Game.instance.ship.keyLeftPress = true
                break;
            case eKey.Right:
                if (Game.instance.ship) Game.instance.ship.keyRightPress = true
                break;
            case eKey.Up:
                if (Game.instance.ship) Game.instance.ship.keyUpPress = true
                break;
            case eKey.Down:
                if (Game.instance.ship) Game.instance.ship.keyDownPress = true
                break;
            case eKey.Space:
                EventHandler.shootEvent();
                break;
            case eKey.KeyP:
                EventHandler.pauseEvent();
                break;
            case eKey.Enter:
                EventHandler.startEndGameEvent()
                break;
        }
    }

    private keyupEventHandler(e: KeyboardEvent) {
        // console.log("keyup", e)
        if (Game.instance.ship) {
            switch (e.code) {
                case eKey.Left:
                    Game.instance.ship.keyLeftPress = false
                    break;
                case eKey.Right:
                    Game.instance.ship.keyRightPress = false
                    break;
                case eKey.Up:
                    Game.instance.ship.keyUpPress = false
                    break;
                case eKey.Down:
                    Game.instance.ship.keyDownPress = false
                    break;
            }
        }
    }

    private static shootEvent() {
        // console.log("Shot event")
        if (Game.instance.ship) {
            Game.instance.ship.shut()
        }
    }
    private static pauseEvent() {
        // console.log("Pause event")
    }
    private static startEndGameEvent() {
        // console.log("Enter Event")
        if (Game.instance.gameOver) {
            // console.log("start Game Event")
            Game.instance.starGame()
        } else {
            if (Game.instance.ship) {
                Game.instance.collision.destroyShip()
                Game.instance.onGameOver()
                // console.log("End Game Event")
            }
        }
    }
}

export enum eKey {
    Down = "ArrowDown",
    Up = "ArrowUp",
    Right = "ArrowRight",
    Left = "ArrowLeft",
    Space = "Space",
    KeyP = "KeyP",
    Enter = "Enter"
}
