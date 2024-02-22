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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path:"/product-details/:id",
    element: <ProductDetailPages />
  },
  {
    path: "*",
    element: <ErrorPage />,
  },

]);

function App() {
  return (
    <div className="App">
      {/* <Home />
      <LoginPage />
      <SignupPage /> */}
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
