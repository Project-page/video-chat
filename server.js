require("dotenv").config();
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require("constants");
const express = require("express");     // Importing express module
const http = require("http");           //Importing http
const app = express();                  // creating an express app object
const server = http.createServer(app);
const socket = require("socket.io");    //Importing socket.io
const io = socket(server);              //Creating instance of io by calling socket passing the newly created server
const path = require("path");

const rooms = {};

io.on("connection", socket => {
    socket.on("join room", roomID => {
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined",socket.id);
        }
    });

    socket.on("offer",payload => {              //an event called 'offer' is created
        io.to(payload.target).emit("offer",payload);
    });

    socket.on("answer",payload => {     
        io.to(payload.target).emit("answer",payload);
    });

    socket.on("ice-candidate", incoming => {          
        io.to(incoming.target).emit("ice-candidate",incoming.candidate);
    });
});

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, './client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
}


const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`server is running on port ${port}`));