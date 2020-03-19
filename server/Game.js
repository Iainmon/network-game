const { Engine, Render, World, Events, Bodies, Body, Vector } = require('matter-js')

Body.getUpVector = function (body) {
    return {
        x: Math.cos(body.angle - (Math.PI / 2)),
        y: Math.sin(body.angle - (Math.PI / 2))
    };
}

Body.getRightVector = function (body) {
    return {
        x: Math.cos(body.angle),
        y: Math.sin(body.angle)
    };
}


class Player {
    constructor(spawnPos, world){
        this.world = world;

        this.keys = {};

        this.body = Bodies.trapezoid(spawnPos.x, spawnPos.y, 40, 40, 1);
        World.add(world, this.body);
        Events.on(world, 'beforeUpdate', this.update);
    }

    update(){
        this.movement();
    }

    movement(){
        //reset position
        if (this.keys[40]) {
            this.body.position = {x: 200, y: 200};
        }
        //jump
        if (this.keys[38]) {
            this.body.force = Vector.mult(Body.getUpVector(this.body), 0.005);
        }
        //spin left and right
        if (this.keys[37] && this.body.angularVelocity > -0.2) {
            this.body.torque = -0.03;
        } else {
            if (this.keys[39] && tthis.body.angularVelocity < 0.2) {
                this.body.torque = 0.03;
            }
        }
    }

    setKeys(newKeys){
        this.keys = newKeys;
        console.log(this.keys)
    }

    onMessage(data){

    }
}


module.exports = class Game {

    constructor() {
        // Game States
        this.engine = Engine.create();

        this.box = Bodies.rectangle(450, 50, 80, 80);
        this.ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
        World.add(this.engine.world, [this.box, this.ground]);
    }

    loadFromPacket(packet){
        this.engine.world = packet;
    }

    compressToPacket(){
        return this.engine.world.bodies
    }

    onNewConnection(){
        const newPlayer = new Player({x: 200, y: 200}, this.engine.world);
        return newPlayer;
    }

    onEndConnection(player){
        World.remove(this.engine.world, player.body);
    }

    update() {
        // console.log(this.engine.world.bodies);
        Engine.update(this.engine);
    }
}