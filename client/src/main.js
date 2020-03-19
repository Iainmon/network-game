import { Engine, Render, World, Events, Bodies, Body, Vector } from 'matter-js'
import * as THREE from 'three'
import Communicator from './communicator'
import Game from './Game.client.js'


const gameInstance = new Game()
const render = Render.create({
    element: document.body,
    engine: gameInstance.engine
});


let keys = {}

const endpoint = '192.168.1.167'
const port = 3000
const communicator = new Communicator(endpoint, port)
communicator.onRecieve( (message) => {
    // console.log(message.data)
    const packet = JSON.parse(message.data)
    gameInstance.loadFromPacket(packet)
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