const express = require("express");     // Importing express module
const http = require("http");           //Importing http
const app = express();                  // creating an express app object
const server = http.createServer(app);
const socket = require("socket.io");    //Importing socket.io
const io = socket(server);              //Creating instance of io by calling socket passing the newly created server


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



server.listen(8000, () => console.log('server is running on port 8000'));