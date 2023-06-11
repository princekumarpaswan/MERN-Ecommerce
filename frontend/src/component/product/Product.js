import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../loader/loadre";
import Products from "../home/product";
import { useParams } from "react-router-dom";

const ProductsMain = () => {

    const dispatch = useDispatch();

    const { products, error, loading, productsCount } = useSelector(state => state.products)

    const { keyword } = useParams()




    useEffect(() => {

        dispatch(getProduct(keyword))

    }, [dispatch, keyword])

    return (
        <>
            {
                loading ? <Loader />
                    : <div className=" mb-[100px] " >
                        <div className="text-[30px] mx-auto font-[800] overflow-hidden text-center mt-[50px]">
                            <h2>Products</h2>
                            <hr className="border border-[2px] border-[#E8BD0D] mx-[35%] mt-[15px]" />
                        </div>
                        <div className="flex lg:ml-[-100px] flex-wrap justify-center" >

                            {
                                products && products.map((product) => (
                                    <Products key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default ProductsMain