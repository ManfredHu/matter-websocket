# matter-websocket
In many cases, we need to run a game in the background and then synchronize the data of each frame to the client.
This is an example of using metadatajs as the physics engine running in the node and then synchronizing data to the web front end via websocket.

在很多情况下，我们需要在后台运行游戏，然后将每帧的数据同步到客户端。
这是一个使用[Matter.js](http://brm.io/matter-js/)作为在后台运行的物理引擎，然后通过websocket将数据同步到web前端的例子。

![Demo](http://www.manfredhu.com/images/node-matterjs.gif)

# Introduce
`src/broswer` folder running visual examples, and `src/wstest` running data synchronization examples.

`src/broswer`文件夹运行的是可视化的例子，不涉及node部分，`src/wstest`文件夹运行的是node后台同步物理引擎数据到前端页面的例子。

![node console](http://www.manfredhu.com/images/node-matterjs-console.jpg)
![Chrome Websocket receive data](http://www.manfredhu.com/images/node-matter-chrome.png)
# Install

should install `ws` module:

```
npm install
```

Then start websocket server.
It will connect to the local websocket server and then accept the websocket server broadcast message

```
cd ./src/wsTest
node node.js
```

then open the `wsTest/index.html` page.



