import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";
import { selectUser } from "../../auth/authSice";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const user1 = user[0];
  console.log("user in my order", user1);

  const handleEdit=(e,index)=>{

  }

  const handleRemove=(e,index)=>{
      
  }



  return (
    <div>
        <div className="mx-auto mt-16 max-w-7xl bg-white px-4 py-6 sm:px-6 lg:px-8">
          <div className="border-t  border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-3xl font-bold my-5 tracking-tight text-gray-900">
              Name:  <span>{user1.name ? user1.name: "Guest"}</span>
            </h1>
            <h2 className="text-xl font-medium my-5 tracking-tight text-red-900">
              Email Address:- {user1.email}
            </h2>            
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <p className="mt-0.5 text-sm text-gray-500">Your Addresses</p>
              {user1.addresses.map((address,index)=>(
                  <div
                  className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                >
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.pincode}{" "}
                        <span className="mx-3">{address.city}</span>{" "}
                        <span className="mx-3">{address.state}</span>
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone :- {address.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      Email :- {address.email}
                    </p>
                  </div>

                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <button 
                      type="button" 
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                       onClick={(e)=>handleEdit(e,index)}
                      >
                        Edit
                      </button>

                      <button 
                      type="button" 
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={(e)=>handleRemove(e,index)}
                      >
                        Remove
                      </button>
                  </div>


                </div>
              ))}
            </div>
          </div> 
        </div>
     
   
  );
}
