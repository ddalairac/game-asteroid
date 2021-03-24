import { Game } from './game.js';
export class EventHandler {
    constructor() {
        document.addEventListener('keydown', this.keydownEventHandler);
        document.addEventListener('keyup', this.keyupEventHandler);
        this.start = document.getElementById('newBTN');
        if (this.start)
            this.start.addEventListener('click', Game.instance.starGame);
    }
    keydownEventHandler(e) {
        switch (e.code) {
            case eKey.Left:
                if (Game.instance.ship)
                    Game.instance.ship.keyLeftPress = true;
                break;
            case eKey.Right:
                if (Game.instance.ship)
                    Game.instance.ship.keyRightPress = true;
                break;
            case eKey.Up:
                if (Game.instance.ship)
                    Game.instance.ship.keyUpPress = true;
                break;
            case eKey.Down:
                if (Game.instance.ship)
                    Game.instance.ship.keyDownPress = true;
                break;
            case eKey.Space:
                EventHandler.shootEvent();
                break;
            case eKey.KeyP:
                EventHandler.pauseEvent();
                break;
            case eKey.Enter:
                EventHandler.startEndGameEvent();
                break;
        }
    }
    keyupEventHandler(e) {
        if (Game.instance.ship) {
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
    }
    static shootEvent() {
        if (Game.instance.ship) {
            Game.instance.ship.shut();
        }
    }
    static pauseEvent() {
    }
    static startEndGameEvent() {
        if (Game.instance.gameOver) {
            Game.instance.starGame();
        }
        else {
            if (Game.instance.ship) {
                Game.instance.collision.destroyShip();
                Game.instance.onGameOver();
            }
        }
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
    eKey["Enter"] = "Enter";
})(eKey || (eKey = {}));
//# sourceMappingURL=event-handler.js.map