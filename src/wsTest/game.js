var Matter = require('../../lib/matter.js');

var winWidth = 750;
var winHeight = 1334;


function Game(){
    this.engine = null;
}

Game.prototype.start = function () {
    console.log("启动模型");
    var engine = Matter.Engine.create({
        enableSleeping: true
    });
    Matter.Engine.run(engine);
    var boxA = Matter.Bodies.circle(400, 200, 80, 80);
    this.boxA = boxA;
    var boxB = Matter.Bodies.circle(450, 50, 80, 80);
    this.boxB = boxB;
    var ground = Matter.Bodies.rectangle(400, 1200, 810, 60, { isStatic: true });

    Matter.World.add(engine.world, [boxA, boxB, ground]);

    console.log("engine.timing.timestamp:",engine.timing.timestamp)
    console.log("engine.timing.delta:",engine.timing.delta)

    if(engine){
        engine.world.bounds.max.x = winWidth;
        engine.world.bounds.max.y = winHeight;
        engine.world.bounds.min.x = 0;
        engine.world.bounds.min.y = 0;
    }

    // 墙壁
    const width = winWidth;
    const height = winHeight;
    let wallOpt = {
        isStatic: true,
        restitution: 0.4 //弹性，两个物体碰撞动能损失为最高的那个
    };
    let offset = 50;
    Matter.World.add(engine.world, [
        Matter.Bodies.rectangle(width / 2, -offset, width + 0.5, 100.5, wallOpt),
        Matter.Bodies.rectangle(width / 2, height + offset, width + 0.5, 100.5, wallOpt),
        Matter.Bodies.rectangle(-offset, height / 2, 100.5, height + 0.5, wallOpt),
        Matter.Bodies.rectangle(width + offset, height / 2, 100.5, height + 0.5, wallOpt)
    ]);

    Matter.Events.on(engine, 'afterUpdate', function(event) {
        var bodies = Matter.Composite.allBodies(engine.world);
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];
            if (body.label !== "Rectangle Body" && body.isSleeping & body.position.y > 400) {
                // var forceMagnitude = 0.05 * body.mass;
                Matter.Body.applyForce(body, body.position, {
                    x: Matter.Common.choose([1, -1]),
                    y: Matter.Common.choose([1, -1])
                });
            }
        }
    })

    this.engine = engine;
    return engine;
}

Game.prototype.tick = function () {
    Matter.Events.trigger(this.engine, 'tick', { timestamp: this.engine.timing.timestamp });
    Matter.Engine.update(this.engine /*this.engine.timing.delta*/);
    Matter.Events.trigger(this.engine, 'afterTick', { timestamp: this.engine.timing.timestamp });
    return {
        boxA:this.boxA,
        boxB:this.boxB
    }
}

module.exports = Game;