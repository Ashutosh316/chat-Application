import './App.css';
import {createBrowserRouter, RouterProvider, useSearchParams} from "react-router-dom";
import Homepage from './components/homepage';
import SignUp from './components/signUp';
import Login from './components/login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {io} from 'socket.io-client'
import { setOnlineUsers } from './redux/userSlice';
import { setSocket } from './redux/socketSlice';




const router = createBrowserRouter([
  
    {
      path:"/",
      element:<Homepage/>
    },
    {
      path:"/register",
      element:<SignUp/>
    },
    {
      path:"/login",
      element:<Login/>
    },
  
  
])





function App() {

  const {authUser}=useSelector(store=>store.user)
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      const socket = io('http://localhost:5000',{
        query:{
          userId:authUser._id
        }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });

      return () => socket.close();

    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser])
  return (
    <div className="p-4 h-screen flex items-center justify-center">
    <RouterProvider router={router}/>
     
    </div>
  );
}

export default App;
