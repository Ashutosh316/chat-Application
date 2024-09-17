import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"

const SignUp = () => {
    const [user , setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    
      })
      const navigate = useNavigate();

    const changeHandler = (e)=>{
        setUser({...user,[e.target.name]:e.target.value})
      }

      const onSubmitHandler = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/v1/user/register', user,{
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials:true
            })
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
                
            }
            
        } catch (error) {
            console.log(error);
            
        }

      }
  return (
    <div className=''>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>

        <h1 className='text-3xl font-bold text-center'>
        Signup
        </h1>
        <form onSubmit={onSubmitHandler} action=''>

            <div>
                <label className='label p-2'></label>
                <span className='text-base label-text'>Full Name</span>
                <input
                className='w-full input input-bordered h-10'
                type="text"
                placeholder='Full Name'
                name='fullName'
                onChange={changeHandler}
                value={user.fullName}
                
                />
            </div>

            <div>
                <label className='label p-2'></label>
                <span className='text-base label-text'>Username</span>
                <input
                className='w-full input input-bordered h-10'
                type="text"
                name='username'
                placeholder='Username'
                onChange={changeHandler}
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
                name='password'
                onChange={changeHandler}
                value={user.password}
                
                />
            </div>

            <div>
                <label className='label p-2'></label>
                <span className='text-base label-text'>Confirm Password</span>
                <input
                className='w-full input input-bordered h-10'
                type="password"
                placeholder='Confirm Password'
                name='confirmPassword'
                onChange={changeHandler}
                value={user.confirmPassword}
                
                />
            </div>
          
          
          <div className='flex items-center my-4'>
          <div className='flex items-center'>
                <p>Male</p>
            <input 
            type="radio"
            name='gender'
            checked={user.gender ==="male"} 
            className="radio mx-2"
            value="male"
            onChange={changeHandler}
            />
            </div>

            <div className='flex items-center'>
                <p>female</p>
            <input type="radio" 
            name='gender'
            value="female"
          className="radio mx-2"
            checked={user.gender ==="female"} 
            onChange={changeHandler}
            />
            </div>
          </div>
           
            <p className='text-center my-2'>Already have an account? <Link to="/login"> login </Link></p>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Singup</button>
          </div>
        </form>
        </div>
       
       
        
    </div>
  )
}

export default SignUp