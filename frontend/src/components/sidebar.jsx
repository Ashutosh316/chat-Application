import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './otherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';


const Sidebar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { otherUsers } = useSelector(store => store.user)
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/user/logout');

      navigate("/login")
      toast.success(res.data.message);
      dispatch(setAuthUser(null));


    } catch (error) {
      console.log(error);


    }
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    const userNameFind = otherUsers?.filter((user) => user.fullName.toLowerCase().includes(search.toLocaleLowerCase()));
    if (userNameFind) {
      dispatch(setOtherUsers(userNameFind))
    } else {
      toast.error("user not found!")
    }

  }

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form onSubmit={searchSubmitHandler}>
        <input className='input input-bordered rounded-md'
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}

        />
        <button type='submit' className='btn bg-zinc-700 text-white'>
          <BiSearchAlt2 className='w-4 h-4  outline-none' />
        </button>
      </form>
      <div className="divider"></div>
      <OtherUsers />
      <div className='mt-2'>
        <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
      </div>
    </div>

  )
}

export default Sidebar