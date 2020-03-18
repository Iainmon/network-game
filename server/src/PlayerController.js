const Matter = require('matter-js')

class PlayerController {
    constructor(socket, world) {
        this.socket = socket
        this.world = world
        this.body = Matter.Bodies.rectangle(50, 50, 100, 100)
    }

    action(data) {
        const decoded = JSON.parse(data)
        
    }

    destroy() {
        this.world.remove(this.body)
    }
    
}

module.exports = PlayerController