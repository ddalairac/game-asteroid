import { Game } from './game.js';
export class EventHandler {
    constructor() {
        document.addEventListener('keydown', this.keydownEventHandler);
        document.addEventListener('keyup', this.keyupEventHandler);
    }
    keydownEventHandler(e) {
        switch (e.code) {
            case eKey.Left:
                Game.instance.ship.keyLeftPress = true;
                break;
            case eKey.Right:
                Game.instance.ship.keyRightPress = true;
                break;
            case eKey.Up:
                Game.instance.ship.keyUpPress = true;
                break;
            case eKey.Down:
                Game.instance.ship.keyDownPress = true;
                break;
            case eKey.Space:
                EventHandler.shootEvent();
                break;
            case eKey.KeyP:
                EventHandler.pauseEvent();
                break;
        }
    }
    keyupEventHandler(e) {
        switch (e.code) {
            case eKey.Left:
                Game.instance.ship.keyLeftPress = false;
                break;
            case eKey.Right:
                Game.instance.ship.keyRightPress = false;
                break;
            case eKey.Up:
                Game.instance.ship.keyUpPress = false;
                break;
            case eKey.Down:
                Game.instance.ship.keyDownPress = false;
                break;
        }
    }
    static shootEvent() {
        Game.instance.ship.shut();
    }
    static pauseEvent() {
        console.log("Pause event");
    }
}
export var eKey;
(function (eKey) {
    eKey["Down"] = "ArrowDown";
    eKey["Up"] = "ArrowUp";
    eKey["Right"] = "ArrowRight";
    eKey["Left"] = "ArrowLeft";
    eKey["Space"] = "Space";
    eKey["KeyP"] = "KeyP";
})(eKey || (eKey = {}));
//# sourceMappingURL=event-handler.js.map