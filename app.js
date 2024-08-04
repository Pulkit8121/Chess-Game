const express=require('express');
const socketio=require('socket.io');
const http=require('http');
const {Chess}= require('chess.js');
const path=require('path');

const app=express();

const server=http.createServer(app);
const io=socketio(server);

const chess=new Chess();
let players={};
let  currentPlayer="W";

const dirpath=path.join(__dirname,'public');
app.use(express.static(dirpath));

app.set("view engine","ejs");

app.get("/",(req,resp)=>{
    resp.render("index",{title:"Chess Game"});
});

io.on("connection",(uniquesocket)=>{
    console.log("connection established");
})

if(!players.white){
    players.white=uniquesocket.id;
    uniquesocket.emit("playerRole","W");
}

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});