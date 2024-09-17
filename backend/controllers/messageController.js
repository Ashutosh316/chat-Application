import mongoose from 'mongoose';
import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";
import {getReceiverSocketId, io} from "../socket/socket.js"


export const sendMessage = async (req,res)=>{
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;

        let gotConversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]},
        });

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        };
        

        await Promise.all([gotConversation.save(), newMessage.save()]);
       
      // SOCKET IO
      const receiverSocketId =  getReceiverSocketId(receiverId)
      if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
     
      return res.status(201).json({
          newMessage
      })
  } catch (error) {
      console.log(error);
  }
}
export const getMessage = async (req, res) => {
    try {
      const receiverId = req.params.id;
      const senderId = req.id;

     
  
      // // Validate senderId and receiverId to ensure they are valid MongoDB ObjectId
      // if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
      //   return res.status(400).json({ message: "Invalid sender or receiver ID." });
      // }
  
      // Find conversation where both users are participants
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
      }).populate("messages");
  
      if (!conversation) {
        return res.status(404).json({ message: "No conversation found between these participants." });
      }
  
      // Return messages in the conversation
      return res.status(200).json(conversation.messages);
    } catch (error) {
      console.log("Error fetching messages:", error);
      return res.status(500).json({ message: "Server error." });
    }
  };