import './App.css';
import { Route, Routes } from "react-router-dom"
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
import UserOptions from "./component/layout/header/UserOption.js"
import { useSelector } from 'react-redux';

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
        <Route path='/login' element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
