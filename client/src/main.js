import * as Matter from 'matter-js'
import * as THREE from 'three'
import Game from './game'
import Communicator from './communicator'


class ClientController {
    constructor(game){
        this.game = game
    }
}

const keys = {}

const endpoint = 'localhost'
const port = 9001
this.communicator = new Communicator(endpoint, port)
this.communicator.onRecieve( (message) => {
    this.game = JSON.parse(message)
})

document.body.addEventListener('keydown', (event) => {
    this.keys[event.keyCode] = true;
    this.communicator.send(this.keys)
});
document.body.addEventListener('keyup', (event) => {
    delete this.keys[event.keyCode];
    this.communicator.send(this.keys)
});


const looper = setInterval( () => {

    
}, 16)
