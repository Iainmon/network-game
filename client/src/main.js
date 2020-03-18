import * as Matter from 'matter-js'
import * as THREE from 'three'
import Game from './game'


class ClientController {
    constructor(game){
        this.game = game
    }
}


const gameInstance = new Game();


const looper = setInterval( () => {
    gameInstance.physicsUpdate();
}, 16)
