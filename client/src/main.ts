import { Engine, Render, World, Events, Bodies, Body, Vector } from 'matter-js'
import Communicator from './communicator'
import Game from '../../lib/Game'


const gameInstance = new Game()
const render = Render.create({
    element: document.body,
    engine: gameInstance.engine
});


let keys = {}

const endpoint = 'game.grape-juice.org'
const port = 19132
const communicator = new Communicator(endpoint, port)
communicator.onRecieve( (message) => {
    // console.log(message.data)
    gameInstance.load(message.data)
})

document.body.addEventListener('keydown', (event) => {
    keys[event.keyCode] = true;
    communicator.send(keys)
});

document.body.addEventListener('keyup', (event) => {
    delete keys[event.keyCode];
    communicator.send(keys)
});


//const looper = setInterval( () => {
//}, 16)


Render.run(render);