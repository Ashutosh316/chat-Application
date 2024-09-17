import express from "express"
import dotenv from "dotenv"; 
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./db/mongo.js";
import userRoute from "./routes/userRoutes.js";
import messageRoute from "./routes/messageRoute.js"
import { app,server } from "./socket/socket.js";


dotenv.config({});


const PORT =5000;




//const app = express();

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:3000',
    credentials:true
};
app.use(cors(corsOption)); 
connectDb();



//routes

app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);





server.listen(PORT , ()=>{
    console.log(`Server running at port ${PORT}`);
    
})
