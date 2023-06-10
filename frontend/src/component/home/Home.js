import React, { Fragment, useEffect } from "react";
import Hero from "./Hero";
import Products from "./product";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux"
import Loader from "../loader/loadre";
import { useAlert } from "react-alert";





const Home = () => {

    const alert = useAlert()

    const distpatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(state => state.products)

    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        distpatch(getProduct())
    }, [distpatch, error, alert])

    return (
        <>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={"PrestaShop"} />

                <Hero />
                <div className="text-[30px] font-[800] overflow-hidden text-center mt-[50px]">
                    <h1>Featured Products</h1>
                    <hr className="border border-[2px] border-[#E8BD0D] mx-[35%] mt-[15px]" />
                </div>
                <div className=" lg:mx-[50px] mx-auto w-[100%] h-[100%] pb-[50px] overflow-hidden flex flex-wrap" id="container">

                    {
                        products && products.map((product) => (
                            <Products product={product} />
                        ))
                    }

                </div>
            </Fragment>}
        </>
    )
}


export default Home