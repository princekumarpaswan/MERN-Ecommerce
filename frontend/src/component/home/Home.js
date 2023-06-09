import React from "react";
import Footer from "../layout/footer/footer";
import Header from "../layout/header/Header"
import Hero from "./Hero";
import Products from "./product";

const product = {
    name: "Blue Tshirt",
    image: [{ url: "https://5.imimg.com/data5/LU/ZG/NZ/SELLER-21546511/men-blank-t-shirt.jpg" }],
    price: "Rs. 3000",
    _id: "Prince"
}


const Home = () => {
    return (
        <>
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
        </>
    )
}


export default Home