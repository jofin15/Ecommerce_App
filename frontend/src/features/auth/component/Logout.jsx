import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, signOutAsync } from '../authSice'
import { Navigate } from 'react-router-dom'


function Logout() {
    const dispatch=useDispatch()
const user=useSelector(selectUser)

    useEffect(()=>{
        dispatch(signOutAsync())
    },[])

  return (<>
    {!user && 
      <Navigate to="/login" replace={true}>
      </Navigate>}
      </>
  );
}

export default Logout