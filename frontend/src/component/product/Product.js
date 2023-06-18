import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../loader/loadre";
import Products from "../home/product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./ProductStyle.css";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "SmartPhones"
]


const ProductsMain = () => {

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)

    const { products, error, loading, productsCount, resultPerPage, filterProducts } = useSelector(state => state.products)

    const alert = useAlert()

    const { keyword } = useParams()

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);

    }


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        dispatch(getProduct(keyword, currentPage, price, category, ratings))

    }, [dispatch, keyword, currentPage, price, category, ratings, error, alert])

    return (
        <>
            {
                loading ? <Loader />
                    : <div className=" mb-[100px] " >
                        <div className="text-[30px] mx-auto font-[800] overflow-hidden text-center mt-[50px]">
                            <MetaData title="Products --PrestaShop" />
                            <h2>Products</h2>
                            <hr className="border border-[2px] border-[#E8BD0D] mx-[35%] mt-[15px]" />
                        </div>
                        <div className="flex min-h-[30vh] flex-wrap w-[auto] lg:ml-[6%] justify-center" >

                            {
                                products && products.map((product) => (
                                    <Products key={product._id} product={product} />
                                ))
                            }
                        </div>

                        <div className="filterBox w-[10vmax] bg-yellow-400 p-[20px] pt-[80px] absolute top-[83px] h-[100vh] ">
                            <Typography>Price</Typography>
                            <Slider value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={25000}
                            />

                            <Typography >Categories</Typography>
                            <ul className="categorBox">
                                {
                                    categories.map((category) => (
                                        <li
                                            className="category-link text-black font-[600] cursor-pointer transition-[all 0.5s] hover:text-[#E8BD0D] "
                                            key={category}
                                            onClick={() => setCategory(category)}
                                        >
                                            {category}
                                        </li>
                                    ))
                                }
                            </ul>

                            <fieldset>
                                <Typography component="legend" >Rating Above</Typography>
                                <Slider value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating)
                                    }}
                                    aria-labelledby="continous-slider"
                                    min={0}
                                    max={5}
                                    valueLabelDisplay="auto"
                                />
                            </fieldset>


                        </div>



                        <div className="flex justify-center m-[6vmax]" >
                            <Pagination className="flex" activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive" />
                        </div>

                    </div>
            }
        </>
    )
}

export default ProductsMain