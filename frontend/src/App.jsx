import './App.css';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductDetails from './features/product-list/component/ProductDetails';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import ProductDetailPages from './pages/ProductDetailPages';
import Protected from './features/auth/component/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectUser } from './features/auth/authSice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home />
    </Protected>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <Protected>
        <CartPage />
      </Protected>,
  },
  {
    path: "/checkout",
    element: <Protected>
      <CheckoutPage />
    </Protected>,
  },
  {
    path:"/product-details/:id",
    element: <Protected>
      <ProductDetailPages />
    </Protected>
  },
  {
    path: "*",
    element: <ErrorPage />,
  },

]);

function App() {
  const dispatch=useDispatch()
  const user=useSelector(selectUser)


  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user))
    }
  },[user])
  
  console.log("user:- ",user);

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
