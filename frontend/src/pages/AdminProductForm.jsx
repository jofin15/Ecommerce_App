import React from 'react'

// import Navbar from "../"
import Navbar from "../features/navbar/Navbar"
import ProductForm from '../features/admin/component/ProductForm'

function AdminProductForm() {
  return (
    <div>
      <Navbar>
        <ProductForm />
      </Navbar>
    </div>
  )
}

export default AdminProductForm