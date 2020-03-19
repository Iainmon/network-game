import { Engine, Render, World, Events, Bodies, Body, Vector } from 'matter-js'

// Body.getUpVector = function (body) {
//     return {
//         x: Math.cos(body.angle - (Math.PI / 2)),
//         y: Math.sin(body.angle - (Math.PI / 2))
//     };
// }

// Body.getRightVector = function (body) {
//     return {
//         x: Math.cos(body.angle),
//         y: Math.sin(body.angle)
//     };
// }

export type IKeyDictionary = any;
export interface IVector2 { x: number, y: number };



function getUpVector(body: Body): IVector2 {
    return {
        x: Math.cos(body.angle - (Math.PI / 2.0)),
        y: Math.sin(body.angle - (Math.PI / 2.0))
    } as IVector2;
}

function getRightVector(body: Body): IVector2 {
    return {
        x: Math.cos(body.angle),
        y: Math.sin(body.angle)
    } as IVector2;
}

export class Player {

    private world: World;

    private keys: IKeyDictionary = {}; // This is a simple dictionary

    public body: Body;

    constructor(spawnPos: IVector2, world: World) {
        this.world = world;

        this.body = Bodies.trapezoid(spawnPos.x, spawnPos.y, 40, 40, 1);
        World.add(world, this.body);
        Events.on(world, 'beforeUpdate', this.update);
    }

    public update() {
        this.movement();
    }

    public movement() {
        //reset position
        if (this.keys[40]) {
            this.body.position = { x: 200, y: 200 };
        }
        //jump
        if (this.keys[38]) {
            this.body.force = Vector.mult(getUpVector(this.body), 0.005);
        }
        //spin left and right
        if (this.keys[37] && this.body.angularVelocity > -0.2) {
            this.body.torque = -0.03;
        } else {
            if (this.keys[39] && this.body.angularVelocity < 0.2) {
                this.body.torque = 0.03;
            }
        }
    }

    public setKeys(newKeys: IKeyDictionary) {
        this.keys = newKeys;
        console.log(this.keys)
    }

    public onMessage(data: IKeyDictionary) {
        this.setKeys(data)
    }
}


export default class Game {

    public engine: Engine;

    private box: Body;
    private ground: Body;

    constructor() {
        // Game States
        this.engine = Engine.create();

        this.box = Bodies.rectangle(450, 50, 80, 80);
        this.ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
        World.add(this.engine.world, [this.box, this.ground]);
    }

    public loadFromPacket(packet: any) {
        this.engine.world = packet as World;
    }

    public compressToPacket(): Body[] {
        return this.engine.world.bodies
    }

    public onNewConnection(): Player {
        const newPlayer = new Player({ x: 200, y: 200 }, this.engine.world);
        return newPlayer;
    }

    public onEndConnection(player: Player) {
        World.remove(this.engine.world, player.body);
    }

    public update() {
        // console.log(this.engine.world.bodies);
        Engine.update(this.engine);
    }
}