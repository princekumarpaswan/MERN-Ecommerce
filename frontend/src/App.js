import './App.css';
import { Route, Routes } from "react-router-dom"
import Home from './component/home/Home';
import ProductDetails from "./component/product/ProductDetails"
import Header from './component/layout/header/Header';
import Footer from './component/layout/footer/footer';
import ProductsMain from './component/product/Product';
import Search from "../src/component/product/Search"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path='/products' element={<ProductsMain />} />
        <Route path='/products/:keyword' element={<ProductsMain />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
