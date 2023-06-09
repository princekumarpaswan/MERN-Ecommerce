import React, { Fragment, useEffect } from "react";
import Footer from "../layout/footer/footer";
import Header from "../layout/header/Header"
import Hero from "./Hero";
import Products from "./product";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useDispatch } from "react-redux"



const product = {
    name: "Blue Tshirt",
    image: [{ url: "https://5.imimg.com/data5/LU/ZG/NZ/SELLER-21546511/men-blank-t-shirt.jpg" }],
    price: "Rs. 3000",
    _id: "Prince"
}


const Home = () => {

    const distpatch = useDispatch();

    useEffect(() => {
        distpatch(getProduct)
    }, [distpatch])

    return (
        <Fragment>
            <MetaData title={"PrestaShop"} />

            <Header />
            <Hero />
            <div className="text-[30px] font-[800] text-center mt-[50px]">
                <h1>Featured Products</h1>
                <hr className="border border-[2px] border-[#E8BD0D] mx-[35%] mt-[15px]" />
            </div>
            <div className=" mx-[50px] w-[100%] flex flex-wrap" id="container">
                <Products product={product} />
                <Products product={product} />
                <Products product={product} />
                <Products product={product} />
                <Products product={product} />
                <Products product={product} />
                <Products product={product} />
                <Products product={product} />
            </div>
            <Footer />
        </Fragment>
    )
}


export default Home