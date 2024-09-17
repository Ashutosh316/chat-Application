import React from 'react'
import OtherUser from './otherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';

const OtherUsers = () => {
  //my cutom cook
  useGetOtherUsers();
  const {otherUsers}= useSelector(Store=>Store.user)
  if(!OtherUsers) return; // early return in react
  return (
   <div className='overflow-auto flex-1'>
   {
    otherUsers?.map((user)=>{
      return(
        <OtherUser key={user._id} user={user}/>
      )
    })
   }
    
   </div>
  )
}

export default OtherUsers