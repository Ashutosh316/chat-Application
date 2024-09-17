import mongoose from "mongoose";

 const connectDb = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/chatapp')
        console.log("Connected to Database");
        
    } catch (error) {
        
        console.log(error);
        
    }
}

export default connectDb;