import * as Matter from 'matter-js'
import * as THREE from 'three'
import Communicator from './communicator'



const keys = {}

const endpoint = 'localhost'
const port = 3000
const communicator = new Communicator(endpoint, port)
communicator.onRecieve( (message) => {
    // this.game = JSON.parse(message)
})

document.body.addEventListener('keydown', (event) => {
    keys[event.keyCode] = true;
    communicator.send(keys)
});

document.body.addEventListener('keyup', (event) => {
    delete keys[event.keyCode];
    communicator.send(keys)
});


const looper = setInterval( () => {

    
}, 16)
