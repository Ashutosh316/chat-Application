import React, { useEffect } from 'react'
import SendInput from './sendMessage'
import Messages from './messages'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'

const MessageControoler = () => {
  const {selectedUser , authUser , onlineUsers} = useSelector(store=>store.user)
  const isOnline = onlineUsers?.includes(setSelectedUser._id);
  const dispatch = useDispatch();


   // this whole function is for jab mene for ex ek user ki id select ki 
   //thi or use message kia uske baad jab mene logout kia or jisko message kia tha
   // us id se login kia to jiska message aaya uski dp me mere dp show ho rhi thi for ex 
   // if i login as anu so dusre user ki dp show honi chaihye thu but show ho rhi thi mere (Anu) id ki dp message me so hua ye tha ki 
   // selected user logout k aane k baad null nhi hua tha so hume selected user null krna hai
  useEffect(()=>{
    return ()=> dispatch(setSelectedUser(null));

  },[])     
  return (
    <>

    {
      selectedUser !==null ?(
        <div className='md:min-w-[550px] flex flex-col'>
        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-4 mb-2'>
          <div>
            <div className={`avatar ${isOnline? 'online': ''} `}></div>
            <div className='w-10 rounded-full'>
              <img src={selectedUser?.profilePhoto} alt="user-profile" />
            </div>
          </div>
  
          <div className='flex flex-col flex-1'>
            <div className='flex justify-between gap-2'>
              <p>{selectedUser?.fullName}</p>
            </div>
          </div>
        </div>
        {/* <div className='divider my-0 py-0 h-1'></div> */}
       <Messages/>
        <SendInput/>
      </div>
      ) : (
        <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
          <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName}</h1>
          <h1 className='text-2xl text-white' >Lets start the conversation</h1>
        </div>
      )
    }
    
    </>
   
    
  )
}

export default MessageControoler