import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './component/home/Home';
import ProductDetails from "./component/product/ProductDetails"
import Header from './component/layout/header/Header';
import Footer from './component/layout/footer/footer';
import ProductsMain from './component/product/Product';
import Search from "../src/component/product/Search";
import LoginSignUp from './component/user/LoginSignUp';
import store from "./store";
import axios from 'axios';
// import { loadUser, clearError } from './actions/userAction';
import { loadUser } from './actions/userAction';
import { useEffect, useState } from 'react';
import UserOptions from "./component/layout/header/UserOption.js";
import { useSelector } from 'react-redux';
import Profile from "./component/user/Profile.js";
import UpdateProfile from "./component/user/UpdateProfile.js";
import UpdatePassword from "./component/user/UpdatePassword";
import ForgotPassword from "./component/user/ForgotPassword.js";
import ResetPassword from "./component/admin/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js"
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList"
import ProcessOrder from './component/admin/ProcessOrder';
import UsersList from './component/admin/UsersList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReviews from './component/admin/ProductReviews';
import AboutUS from './component/layout/AboutUs';
import Contact from './component/layout/ContactUS';
import NotFound from './component/layout/NotFound';


const App = () => {

  const { isAuthenticated, user } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/prince/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
    store.dispatch(loadUser());
    // store.dispatch()

  }, [])

  window.addEventListener("contextmenu", (e) => { e.preventDefault() })


  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        {stripeApiKey && (isAuthenticated && <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)} ><Payment user={user} /></Elements>} />
        )}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path='/products' element={<ProductsMain />} />
        <Route path='/products/:keyword' element={<ProductsMain />} />
        <Route path="/search" element={<Search />} />
        {isAuthenticated && <Route path="/account" element={<Profile user={user} />} />}
        {isAuthenticated && <Route path="/me/update" element={<UpdateProfile user={user} />} />}
        {isAuthenticated && <Route path='/password/update' element={<UpdatePassword user={user} />} />}
        {isAuthenticated && <Route path='/shipping' element={<Shipping user={user} />} />}
        {isAuthenticated && <Route path='/success' element={<OrderSuccess user={user} />} />}
        {isAuthenticated && <Route path='/order/confirm' element={<ConfirmOrder user={user} />} />}
        {isAuthenticated && <Route path='/orders' element={<MyOrders user={user} />} />}
        {isAuthenticated && <Route path='/order/:id' element={<OrderDetails user={user} />} />}
        {isAuthenticated && <Route path="/admin/dashboard" element={<Dashboard user={user} />} />}
        {isAuthenticated && <Route path="/admin/products" element={<ProductList user={user} />} />}
        {isAuthenticated && <Route path="/admin/product" element={<NewProduct user={user} />} />}
        {isAuthenticated && <Route path="/admin/product/:id" element={<UpdateProduct user={user} />} />}
        {isAuthenticated && <Route path="/admin/orders" element={<OrderList user={user} />} />}
        {isAuthenticated && <Route path="/admin/order/:id" element={<ProcessOrder user={user} />} />}
        {isAuthenticated && <Route path="/admin/users" element={<UsersList user={user} />} />}
        {isAuthenticated && <Route path="/admin/users/:id" element={<UpdateUser user={user} />} />}
        {isAuthenticated && <Route path="/admin/reviews" element={<ProductReviews user={user} />} />}
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/about' element={<AboutUS />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
