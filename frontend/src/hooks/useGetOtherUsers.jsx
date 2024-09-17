import React, { useEffect } from 'react'
import axios from 'axios'
import {setOtherUsers} from '../redux/userSlice'
import {useDispatch, useSelector} from 'react-redux'

const useGetOtherUsers = () => {

  const dispatch = useDispatch();
  useEffect(()=>{

    const fetchOthersUsers = async ()=>{
   
        try {
          axios.defaults.withCredentials = true;
            const res = await axios.get('http://localhost:5000/api/v1/user/');
           // store

            dispatch(setOtherUsers(res.data));
           
            
        } catch (error) {
            console.log(error);
            
            
        }
    }

    fetchOthersUsers();

  },[])
}

export default useGetOtherUsers