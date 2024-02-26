import {configureStore} from "@reduxjs/toolkit"
import productReducer from "../features/product-list/productSlice"
import authReducer from "../features/auth/authSice"
import cartReducer from "../features/cart/cartSlice"

export const store=configureStore({
    reducer:{
        product:productReducer,
        auth:authReducer,
        cart:cartReducer
    }
})
