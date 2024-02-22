import React from 'react'
import ProductDetails from '../features/product-list/component/ProductDetails'
// import Navbar from "../"
import Navbar from "../features/navbar/Navbar"

function ProductDetailPages() {
  return (
    <div>
      <Navbar>
        <ProductDetails />
      </Navbar>
    </div>
  )
}

export default ProductDetailPages