import React, { useEffect } from 'react'
import { useSelector , useDispatch} from 'react-redux'
import axios from "axios";
 import { setMessages } from '../redux/messageSlice';


const useGetMessages = () => {
    const {selectedUser}= useSelector(store=>store.user);
    const dispatch = useDispatch();
    useEffect(()=>{
       
        const fetchMessages = async()=>{
            try {
 
                const res = await axios.get(`http://localhost:5000/api/v1/message/receive/${selectedUser?._id}`,{withCredentials:true})
                dispatch(setMessages(res.data))
                console.log("hghghgg" , res.data);
                
            } catch (error) {

              console.log("error fetching messages" ,error);
              dispatch(setMessages([]));
                
            }
        }
        fetchMessages();
    }, [selectedUser?._id,setMessages]);
  
}

export default useGetMessages