import React, { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { resetCartAsync } from '../features/cart/cartSlice'
import { selectUser } from '../features/auth/authSice'
import { resetOrder, selectCurrentOrder } from '../features/order/orderSlice'


function OrderSuccessPage() {
  const params=useParams()
  const dispatch =useDispatch() 
  const user = useSelector(selectUser);
  const user1 = user[0]


  useEffect(()=>{
  console.log("order user 1 id",user1.id);
    dispatch(resetCartAsync(user1.id))
    dispatch(resetOrder())
  },[dispatch,user])
  const currentOrder=useSelector(selectCurrentOrder)
  console.log("current Order in orederpage",currentOrder);

  return (
  <>
    {!params.id && <Navigate to="/" replace={true}></Navigate>}
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="max-w-lg text-center">
        <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color-round/3/15-512.png" alt="404 Illustration" className="mt-8  max-w-xs mx-auto h-14 w-14" />
        <h1 className="text-4xl font-bold text-gray-800 mt-4">Order Successfully Placed</h1>
        <p className="text-gray-600 mt-4">Order Number #{params?.id}</p>
        <p className="text-gray-600">.You can check your order in My Account  My Orders</p>
        <Link to="/" className="mt-12 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out">
        Go Home 
        </Link>
      
    </div>
  </div>
  </>
  )
}

export default OrderSuccessPage