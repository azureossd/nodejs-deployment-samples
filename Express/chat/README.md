# Creating a Chat application using Socket.IO and Express

## Requirements
1. [Node.js/npm](https://nodejs.org/en/download/)
2. [Visual Code](https://code.visualstudio.com/download)

## Understanding Socket.IO
- Review the Official Documentation: https://socket.io/docs/v4

## Package.json and installing express
1. Create a server folder with **`mkdir server`** and cd into that folder. 
1. Type **`npm init`** to create a `package.json` file for your project.
2. You can press enter to go through the different items, you can change the entrypoint from `index.js` to `server.js`.
3. Then run the following commands 
    ```
    npm install express socket.io --save
    ```

##  Server instance implementation
1. Open a new terminal and cd into your project and type **`code .`** to open the current directory in Visual Code.
2. In Visual Code, right click on left panel and select `New File`, change the name of the file to `server.js`.
3. You need to create a http server and pass Express app, add the following code inside `server.js` file: 
    ```
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 3000;
    var server = require('http').createServer(app);

    ```
4. Then create the socket.io server, passing some options as cors and Http Methods allowed:
    ```
    var io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    ```
5. Implement connection event, this event is fired upon a new connection. 
```
    io.on('connection', (socket) => {
        // ...
    });
```

6. Inside the connection event, you can add information to know if a client has connected and disconnected, like getting the socket.id and time.
    ```
    io.on('connection', (socket) => {

        var time = new Date().toISOString();
        console.log(`+ Client connected      |   Client Id: ${socket.id} |   DateTime: ${time}`);


        socket.on('disconnect', reason => {
            var time = new Date().toISOString();
            console.log(`- Client disconnected   |   Client Id: ${socket.id} |   DateTime: ${time}`);
        });

    });
    ```
7. Then you can implement two events, one when a client joins a room, and another event when the user sends a message to the room. These two events should be inside connection event.

    ```
        socket.on('join_room', (data) =>{
            socket.join(data);
            console.log(`User joined room: ${data}`);
        });

        socket.on('send_message', (data) =>{
            console.log(data);
            socket.to(data.room).emit("receive_message", data.content);
        });
    ```
8. Finally add the server object needs to listen into a port.
    ```
    server.listen(port, () => {
        console.log(`Socket.IO server listening at http://localhost:${port}`)
    });
    ```
9. Final structure of `server.js`:
    ```
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 3000;

    var server = require('http').createServer(app);
    var io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {

        var time = new Date().toISOString();
        console.log(`+ Client connected      |   Client Id: ${socket.id} |   DateTime: ${time}`);
    
        socket.on('join_room', (data) =>{
            socket.join(data);
            console.log(`User joined room: ${data}`);
        });

        socket.on('send_message', (data) =>{
            console.log(data);
            socket.to(data.room).emit("receive_message", data.content);
        });

        socket.on('disconnect', reason => {
            var time = new Date().toISOString();
            console.log(`- Client disconnected   |   Client Id: ${socket.id} |   DateTime: ${time}`);
        });

    });

    server.listen(port, () => {
        console.log(`Socket.IO server listening at http://localhost:${port}`)
    });
    ```
10. Run the application with **`node server.js`** or **`nodemon server.js`**`.
11. Then you are ready to implement a socket.io client to consume this server.