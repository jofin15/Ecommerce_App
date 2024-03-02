import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { signOutAsync } from '../authSice'
import { Navigate } from 'react-router-dom'

function Logout() {
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(signOutAsync())
    },[])

  return (
    <Navigate to="/login" replace={true}>
    </Navigate>
  )
}

export default Logout