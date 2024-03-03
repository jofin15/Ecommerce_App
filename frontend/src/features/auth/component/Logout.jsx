import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOutAsync } from '../authSice'
import { Navigate } from 'react-router-dom'
import { selectUserInfo } from '../../user/userSlice'

function Logout() {
    const dispatch=useDispatch()
const user=useSelector(selectUserInfo)

    useEffect(()=>{
        dispatch(signOutAsync())
    },[])

  return (<>
    {user && 
      <Navigate to="/login" replace={true}>
      </Navigate>}
      </>
  );
}

export default Logout