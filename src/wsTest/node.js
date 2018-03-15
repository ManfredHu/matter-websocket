var Game = require('./game.js');

var WebSocket = require('ws'),
    WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({
        port: 9191, //监听接口
        // verifyClient: socketVerify //可选，验证连接函数
    });

// function socketVerify(info) {
//     console.log(info.origin);
//     console.log(info.req.t);
//     console.log(info.secure);
    // console.log(info.origin);
    // var origin = info.origin.match(/^(:?.+\:\/\/)([^\/]+)/);
    // console.log("连接",origin[2]);
    // return true; //否则拒绝
    //传入的info参数会包括这个连接的很多信息，你可以在此处使用console.log(info)来查看和选择如何验证连接
// }

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

// 初始化
wss.on('connection', function(ws) {
    // 发送消息
    ws.on('message', function(jsonStr,flags) {
        console.log("收到消息：",jsonStr);
        //启动模型
        var game = new Game();
        game.start();
        sendTickData(wss,game); //每一帧发送消息到前端
    });
    // 退出聊天
    ws.on('close', function(close) {
        try{
            wss.broadcast("用户退出");
        }catch(e){
            console.log('close退出页面了');
        }
    });
});

function sendTickData(wss,game){
    setInterval(function(){
        var obj = game.tick();
        var info  = {
            "boxAPosition": {
                "x": obj.boxA["position"].x,
                "y": obj.boxA["position"].y
            },
            "boxBPosition": {
                "x": obj.boxB["position"].x,
                "y": obj.boxB["position"].y
            }
        }
        console.log("node广播消息：",JSON.stringify(info));
        wss.broadcast(JSON.stringify(info));
    },1000/60)
}

console.log("初始化WS服务");