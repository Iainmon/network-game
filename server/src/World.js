const Matter = require('matter-js')

class World {

    constructor() {
        this.engine = Matter.Engine.create()
        this.bodies = []
    }

    // Adds body to world and to list
    add(body) {
        this.bodies.push(body)
        Matter.World.add(this.engine.world, body)
    }

    // Removes body from world and from list
    remove(body) {
        const index = this.bodies.indexOf(body)
        if (index > -1) {
            this.bodies.splice(index, 1)
            Matter.World.remove(this.engine.world, body)
        }
    }

    update() {
        Matter.Engine.update(this.engine)
    }

    // Returns a list of objects. One for each body in the world, containing pos and vel
    states() {
        // const bodies = []
        // for (const body of this.bodies) {
        //     const properties = {
        //         position: body.position,
        //         velocity: body.velocity
        //     }
        //     bodies.push(properties)
        // }

        // return bodies

        return this.engine.world
    }
}
module.exports = World