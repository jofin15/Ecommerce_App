import Navbar from "../features/navbar/Navbar";
import React from 'react'
import ProductList from "../features/product-list/component/ProductList";
// import Cart from "../features/cart/Cart";
// import ProductDetail from "./ProductDetailPages"

function Home() {
  return (
    <div>
        <Navbar>
            <ProductList />
        </Navbar>
      
    </div>
  )
}

export default Home