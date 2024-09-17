import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [user , setUser] = useState({
  
    username: "",
    password: "",
    

  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/v1/user/login', user,{
          headers:{
              'Content-Type': 'application/json'
          },
          withCredentials:true
      })
      console.log(res);
          navigate("/");
          dispatch(setAuthUser(res.data)); 
      
  } catch (error) {
    toast.error(error.response.data.message);
      console.log(error);
      
  }

  }
  return (
    <div className=''>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>

        <h1 className='text-3xl font-bold text-center'>
        Login
        </h1>
        <form onSubmit={onSubmitHandler}>

            <div>
                <label className='label p-2'></label>
                <span className='text-base label-text'>Username</span>
                <input
                className='w-full input input-bordered h-10'
                type="text"
                placeholder='Username'
                onChange={changeHandler}
                name='username'
                value={user.username}
                
                />
            </div>

            <div>
                <label className='label p-2'></label>
                <span className='text-base label-text'>Password</span>
                <input
                className='w-full input input-bordered h-10'
                type="password"
                placeholder='Password'
                onChange={changeHandler}
                value={user.password}
                name='password'
                
                />
            </div>

           
            <p className='text-center my-2'>Don't have an account? <Link to="/login"> Signup </Link></p>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Singup</button>
          </div>
        </form>
        </div>
       
       
        
    </div>
  )
}

export default Login