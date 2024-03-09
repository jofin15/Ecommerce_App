import Navbar from "../features/navbar/Navbar";
import React from 'react'
import AdminProductList from "../features/admin/component/AdminProductList";
// import Cart from "../features/cart/Cart";
// import ProductDetail from "./ProductDetailPages"

function AdminHomePage() {
  return (
    <div>
        <Navbar>
            <AdminProductList />
        </Navbar>
      
    </div>
  )
}

export default AdminHomePage