import {Engine, Render, World, Events, Bodies, Body, Vector} from 'matter-js'
import * as THREE from 'three'

Body.getUpVector = function (body) {
    return {
        x: Math.cos(body.angle - (Math.PI/2)), 
        y: Math.sin(body.angle - (Math.PI/2))
    };
}

Body.getRightVector = function (body) {
    return {
        x: Math.cos(body.angle), 
        y: Math.sin(body.angle)
    };
}


export default class Game {

    constructor(){
        //looks for key presses and logs them
        this.keys = {};

        document.body.addEventListener('keydown', (event) => {
            this.keys[event.keyCode] = true;
        });
        document.body.addEventListener('keyup', (event) => {
            this.keys[event.keyCode] = false;
        });

        //sets up matter js
        this.engine = Engine.create();
        this.render = Render.create({
            element: document.body,
            engine: this.engine
        });

        this.player = Bodies.trapezoid(400, 200, 40, 40, 1);
        this.box = Bodies.rectangle(450, 50, 80, 80);
        this.ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
        World.add(this.engine.world, [this.player, this.box, this.ground]);

        Render.run(this.render);
    }

    physicsUpdate(){
        //jump
        if (this.keys[38]) {
            this.player.force = Vector.mult(Body.getUpVector(this.player), 0.005);
        }
        //spin left and right
        if (this.keys[37] && this.player.angularVelocity > -0.2) {
                this.player.torque = -0.03;
        } else {
            if (this.keys[39] && this.player.angularVelocity < 0.2) {
                this.player.torque = 0.03;
            }
        }
        Engine.update(this.engine);
    }
}