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
