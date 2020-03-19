import { Serializer } from '../dependencies/matter-tools';
import { Engine, Render, World, Events, Bodies, Body, Vector } from 'matter-js';

const engine = Engine.create();

const box = Bodies.rectangle(450, 50, 80, 80);
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
World.add(engine.world, [box, ground]);

const s1 = Serializer.create();
const s2 = Serializer.create();
const data = Serializer.serialise(s1, engine.world, 0);

const parsedWorld = s2.parse(data);
engine.world = parsedWorld;

Engine.update(engine);



console.log(data);

