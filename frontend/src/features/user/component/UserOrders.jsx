import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";
import { Link } from "react-router-dom";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user1 = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  console.log("user in my order", user1);
  console.log("my orders in order page", orders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user1.id));
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <div className="mx-auto mt-16 max-w-7xl bg-white px-4 py-6 sm:px-6 lg:px-8">
          <div className="border-t  border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-3xl font-bold my-5 tracking-tight text-gray-900">
              order number :- #{order.id}
            </h1>
            <h2 className="text-xl font-medium my-5 tracking-tight text-red-900">
              Order status:- {order.status}
            </h2>

            {/* {cart.length === 0 && <h2>Your Cart is empty</h2>} */}
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.cart.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.title}</a>
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline text-sm font-medium leading-6 text-gray-900 mr-5"
                          >
                            Qty : {product.quantity}
                          </label>
                        </div>
                        <div className="flex"></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${order.totalAmount}</p>
            </div>

            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{order.totalItems} items</p>
            </div>

            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
          </div>

          <div>
            <li
              key={order.user1.id}
              className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
            >
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {order.selectedAddress.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.street}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.pincode}{" "}
                    <span className="mx-3">{order.selectedAddress.city}</span>{" "}
                    <span className="mx-3">{order.selectedAddress.state}</span>
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Phone :- {order.selectedAddress.phone}
                </p>
                <p className="text-sm leading-6 text-gray-900">
                  Email :- {order.selectedAddress.email}
                </p>
              </div>
            </li>
          </div>
        </div>
      ))}
    </div>
  );
}
