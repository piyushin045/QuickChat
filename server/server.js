import express from "express"
import "dotenv/config";
import cors from "cors"
import http from "http"
import {connectDB} from "./lib/db.js"
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import {Server} from "socket.io"
import { Socket } from "dgram";
// create express app and http server

const app = express();
const server = http.createServer(app)

// initialize socket.io server

export const io = new Server(server,{
    cors: {origin: "*"} // will give premission to all the origin 
}) 

// store online users

export const userSocketMap = {}; // {userid: sockedid}

// socket.io connection handler

io.on("connection", (socket)=>{

    const userId = socket.handshake.query.userId

    console.log("user connected", userId)

    if(userId) userSocketMap[userId] = socket.id

    // emit online users to all connected client
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", ()=>{
        console.log("User Disconnected", userId)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})

// middleware setup 
app.use(express.json({limit: "4mb"}));
app.use(cors());


// routes setup
app.use("/api/status", (req,res)=> res.send("server is live"));
app.use("/api/auth", userRouter)
app.use("/api/messages",messageRouter)

// connect to mongodb 
console.log("MONGODB_URI =", process.env.MONGODB_URI); // this is to check wheather the data is comming from .env file or not
await connectDB();





const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log("server is running on PORT:" +PORT))
