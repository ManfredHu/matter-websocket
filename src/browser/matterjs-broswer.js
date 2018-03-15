var winWidth = 750;
var winHeight = 1334;

var engine = Matter.Engine.create({
    enableSleeping: true
});
//-----------------------------------------------------------------------------------------
// 创建渲染器
var render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: true,
        showAngleIndicator: true,
        width: winWidth,
        height: winHeight
    }
});

//运行引擎
Matter.Engine.run(engine);
Matter.Render.run(render);
//-----------------------------------------------------------------------------------------
//
// engine.world.gravity.y = 0; //无重力
// engine.world.gravity.x = 0; //无重力

var boxA = Matter.Bodies.circle(400, 200, 80, 80);
var boxB = Matter.Bodies.circle(450, 50, 80, 80);
var ground = Matter.Bodies.rectangle(400, 1200, 810, 60, { isStatic: true });

Matter.World.add(engine.world, [boxA, boxB,ground]);

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

// for (var i = 0; i < 100; i++) {
//     Matter.Events.trigger(engine, 'tick', { timestamp: engine.timing.timestamp });
//     Matter.Engine.update(engine, engine.timing.delta);
//     // Matter.Engine.update(engine, 1000 / 60);
//     Matter.Events.trigger(engine, 'afterTick', { timestamp: engine.timing.timestamp });
// }

function setBallPosition(aPos,bPos){
    boxA.position.x = aPos.x;
    boxA.position.y = aPos.y;
    boxB.position.x = bPos.x;
    boxB.position.y = bPos.y;

}

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