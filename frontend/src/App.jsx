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
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrders from './features/user/component/UserOrders';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfile from './features/user/component/UserProfile';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/component/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/component/ProtectedAdmin';
import AdminHomePage from './pages/AdminHomePage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import ProductForm from './features/admin/component/ProductForm';
import AdminProductForm from './pages/AdminProductForm';
import AdminOrderPage from './pages/AdminOrderPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home />
    </Protected>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin>
      <AdminHomePage />
    </ProtectedAdmin>,
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
    path:"/admin/product-details/:id",
    element: <ProtectedAdmin>
      <AdminProductDetailPage />
    </ProtectedAdmin>
  },
  {
    path:"/admin/product-form",
    element: <ProtectedAdmin>
      <AdminProductForm />
    </ProtectedAdmin>
  },
  {
    path:"/admin/product-form/edit/:id",
    element: <ProtectedAdmin>
      <AdminProductForm />
    </ProtectedAdmin>
  },
  {
    path:"/order-success/:id",
    element: 
      <OrderSuccessPage />
  },
  {
    path:"/admin/orders",
    element: 
    <ProtectedAdmin>
        <AdminOrderPage />
    </ProtectedAdmin>
  },
  {
    path:"/orders",
    element: 
      <UserOrdersPage />
  },
  {
    path:"/profile",
    element: 
      <UserProfilePage />
  },
  {
    path:"/logout",
    element: 
      <Logout />
  },
  {
    path:"/forgot-password",
    element: 
      <ForgotPasswordPage />
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
      dispatch(fetchLoggedInUserAsync(user))
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
