
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserInfo,
  updateUserAsync,
} from "../userSlice";

import { useForm } from "react-hook-form";

export default function UserProfile() {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false); // New state variable for showing/hiding the new address form

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  const user1 = useSelector(selectUserInfo);
  console.log("user in my order", user1);

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user1, addresses: [...user1.addresses] }; //for shallow copy
    newUser.addresses.splice(index, 1, addressUpdate); 
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...user1, addresses: [...user1.addresses] }; //for shallow copy
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleAddress = (e) => {
    console.log("user selected this address", user1.addresses[e.target.value]);
    setSelectedAddress(user1.addresses[e.target.value]);
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = user1.addresses[index];
    if (address) {
      setValue("name", address.name);
      setValue("email", address.email);
      setValue("city", address.city);
      setValue("state", address.state);
      setValue("pinCode", address.pinCode);
      setValue("phone", address.phone);
      setValue("street", address.street);
    }
  };

  const handleNewAddressSubmit = (data) => {
    // Handle submission of new address form data here
    console.log("New address data:", data);
    const newUser = { ...user1, addresses: [...user1.addresses, data] };
    dispatch(updateUserAsync(newUser));
    setShowNewAddressForm(false); // Hide the new address form after submission
  };

  return (
    <div>
      <div className="mx-auto mt-16 max-w-7xl bg-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="border-t  border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-3xl font-bold my-5 tracking-tight text-gray-900">
            Name: <span>{user1.name ? user1.name : "Guest"}</span>
          </h1>
          <h2 className="text-xl font-medium my-5 tracking-tight text-red-900">
            Email Address:- {user1.email}
          </h2>
          {user1.role ==="admin" && (<h3 className="text-xl font-medium my-5 tracking-tight text-red-900">
            Role:- {user1.role}
          </h3>)}
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <p className="mt-0.5 text-sm text-gray-500">Your Addresses</p>
          {user1.addresses.map((address, index) => (
            <div key={index}>
              {selectedEditIndex !== index ? (
                <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
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
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => handleEditForm(index)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={(e) => handleRemove(e, index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  key={index}
                  className="bg-white px-5 py-3"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    console.log("updated data:- ", data);
                    handleEdit(data, index);
                    reset();
                  })}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12 pt-2">
                      <h2 className=" font-semibold leading-7 text-xl text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "name is required",
                              })}
                              id="first-name"
                              autoComplete="given-name"
                              defaultValue={address.name}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "email is required",
                                pattern: {
                                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                  message: "email not valid",
                                },
                              })}
                              type="email"
                              autoComplete="email"
                              defaultValue={address.email}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone Number
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "Phone Number is required",
                              })}
                              type="tel"
                              autoComplete="phone"
                              defaultValue={address.phone}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", {
                                required: "street is required",
                              })}
                              id="street-address"
                              autoComplete="street-address"
                              defaultValue={address.street}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "City is required",
                              })}
                              id="city"
                              autoComplete="address-level2"
                              defaultValue={address.city}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "State is required",
                              })}
                              id="region"
                              autoComplete="address-level1"
                              defaultValue={address.state}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="postal-code"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pincode", {
                                required: "Pincode is required",
                              })}
                              id="postal-code"
                              autoComplete="postal-code"
                              defaultValue={address.pincode}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                              type="button"
                              className="text-sm font-semibold leading-6 text-gray-900"
                              onClick={() => setSelectedEditIndex(-1)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Edit Address
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          ))}
          {/* New address form */}
          {showNewAddressForm && (
            <form
              className="bg-white px-5 py-3"
              noValidate
              onSubmit={handleSubmit(handleNewAddressSubmit)}
              
            >
              {/* Form fields go here */}
              <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12 pt-2">
                      <h2 className=" font-semibold leading-7 text-xl text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "name is required",
                              })}
                              id="first-name"
                              autoComplete="given-name"
                              // defaultValue={address.name}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "email is required",
                                pattern: {
                                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                  message: "email not valid",
                                },
                              })}
                              type="email"
                              autoComplete="email"
                              // defaultValue={address.email}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone Number
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "Phone Number is required",
                              })}
                              type="tel"
                              autoComplete="phone"
                              // defaultValue={address.phone}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", {
                                required: "street is required",
                              })}
                              id="street-address"
                              autoComplete="street-address"
                              // defaultValue={address.street}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "City is required",
                              })}
                              id="city"
                              autoComplete="address-level2"
                              // defaultValue={address.city}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "State is required",
                              })}
                              id="region"
                              autoComplete="address-level1"
                              // defaultValue={address.state}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="postal-code"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pincode", {
                                required: "Pincode is required",
                              })}
                              id="postal-code"
                              autoComplete="postal-code"
                              // defaultValue={address.pincode}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>




              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => setShowNewAddressForm(false)} // Hide the new address form when Cancel is clicked
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}
          {/* Button to add new address */}
          {!showNewAddressForm && (
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
              onClick={() => setShowNewAddressForm(true)} // Show the new address form when Add New Address is clicked
            >
              Add New Address
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
