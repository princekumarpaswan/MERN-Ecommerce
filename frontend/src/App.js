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
import { loadUser } from './actions/userAction';
import { useEffect } from 'react';
import UserOptions from "./component/layout/header/UserOption.js";
import { useSelector } from 'react-redux';
import Profile from "./component/user/Profile.js";
import UpdateProfile from "./component/user/UpdateProfile.js";
import UpdatePassword from "./component/user/UpdatePassword";
import ForgotPassword from "./component/user/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";



function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)


  useEffect(() => {
    store.dispatch(loadUser());
  }, [])


  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path='/products' element={<ProductsMain />} />
        <Route path='/products/:keyword' element={<ProductsMain />} />
        <Route path="/search" element={<Search />} />
        {isAuthenticated && <Route path="/account" element={<Profile user={user} />} />}
        {isAuthenticated && <Route path="/me/update" element={<UpdateProfile user={user} />} />}
        {isAuthenticated && <Route path='/password/update' element={<UpdatePassword user={user} />} />}
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path='/login' element={<LoginSignUp />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
