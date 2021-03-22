import { Game } from './game.js';

export class EventHandler {
    constructor() {
        document.addEventListener('keydown', this.keydownEventHandler)
        document.addEventListener('keyup', this.keyupEventHandler)
    }

    private keydownEventHandler(e: KeyboardEvent) {
        // console.log("keydown", e)
        if (Game.instance.ship) {
            switch (e.code) {
                case eKey.Left:
                    Game.instance.ship.keyLeftPress = true
                    break;
                case eKey.Right:
                    Game.instance.ship.keyRightPress = true
                    break;
                case eKey.Up:
                    Game.instance.ship.keyUpPress = true
                    break;
                case eKey.Down:
                    Game.instance.ship.keyDownPress = true
                    break;
                case eKey.Space:
                    EventHandler.shootEvent();
                    break;
                case eKey.KeyP:
                    EventHandler.pauseEvent();
                    break;
            }
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
        console.log("Pause event")
    }
}

export enum eKey {
    Down = "ArrowDown",
    Up = "ArrowUp",
    Right = "ArrowRight",
    Left = "ArrowLeft",
    Space = "Space",
    KeyP = "KeyP"
}
