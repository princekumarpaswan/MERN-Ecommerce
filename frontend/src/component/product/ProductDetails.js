import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-material-ui-carousel';
import ReactStars from 'react-rating-stars-component'
import { useSelector, useDispatch } from "react-redux"
import { clearError, getProductDetails } from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import Loader from "../loader/loadre";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetail = () => {
    let { id } = useParams()
    const dispatch = useDispatch();

    const alert = useAlert();


    const { product, loading, error } = useSelector((state) => state.productDetails)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        dispatch(getProductDetails(id))

    }, [dispatch, id, error, alert])

    const options = {
        edit: false,
        color: "#758283",
        activeColor: "white",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true
    }

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };


    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        console.log(id);
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    };



    return (
        <>
            {
                loading ? <Loader /> : (< >
                    <div className="w-[100vw]  max-w-[100%] flex gap-[200px]  box-border  p-[6vmax] " >
                        <div className=" lg:w-[29%] ml-[10%] ">
                            <Carousel >
                                {
                                    product.image && product.image.map((item, i) => (
                                        <img key={item.url} src={item.url} alt={`${i} Slide`} />
                                    ))
                                }
                            </Carousel>
                        </div>

                        <div className="border-[2px] p-[30px] border-[#E8BD0D] " >

                            <div>
                                <h2 className="text-[35px] font-[800] " >{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>
                            <hr className="h-[2px] bg-[#E8BD0D] mt-[5px] w-[30rem] " />

                            <div className="flex my-[20px] items-center gap-[10px]" >
                                <ReactStars {...options} />
                                <span>({product.numOfReviews} Reviews)</span>
                            </div>

                            <hr className="h-[2px] bg-[#E8BD0D] mt-[5px] w-[30rem] " />

                            <div className="my-[20px] " >
                                <h1 className="text-[30px] font-[800]" ><span className="text-[25px]" >&#8377;</span>{product.price}</h1>

                                <div className="flex items-center gap-[15px]" >
                                    <div>
                                        <button className="w-[1.5rem] bg-[#758283] text-white font-[900] my-[15px] " onClick={decreaseQuantity} >-</button>
                                        <input readOnly className="w-[3rem] pl-[12px] text-center " value={quantity} type="number" />
                                        <button className="w-[1.5rem] bg-[#758283] text-white font-[900] my-[15px] " onClick={increaseQuantity} >+</button>
                                    </div>
                                    <button className="bg-[#E8BD0D] w-[8rem] text-white font-[800] h-[35px] rounded-[40px] " onClick={addToCartHandler} >Add to Cart</button>
                                </div>


                                <hr className="h-[2px] bg-[#E8BD0D] mt-[10px] w-[30rem] " />

                                <p className="my-[20px]  text-[15px] font-[600] " >Status:
                                    <b className={product.Stock < 1 ? "text-[red]" : "text-[green] ml-[5px]"} >
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <hr className="h-[2px] bg-[#E8BD0D] mt-[10px] w-[30rem] " />

                            <div className="text-[20px] my-[20px] font-[800]" >
                                Description:<p className="text-[15px] font-[100]" >{product.description}</p>
                            </div>

                            <button className="bg-[#E8BD0D] w-[8rem] text-white font-[800] h-[45px] rounded-[40px] " >Submit Review</button>
                        </div>

                    </div>

                    {
                        product.reviews && product.reviews[0] ? (
                            <div>
                                {
                                    product.reviews && product.reviews.map((review) => (
                                        <ReviewCard review={review} />
                                    ))
                                }
                            </div>
                        ) : (<div>
                            <div className="bg-[#CAD5E2] mx-[200px] overflow-auto mt-[15px] mb-[70px] p-[20px] text-center " >
                                <h1 className="text-[35px]  pt-[30px] font-[800]  " >Reviews</h1>
                                <hr className="w-48 h-1 mx-auto  bg-black  border-0 rounded " />
                                <h2 className="text-[20px] mt-[20px] font-800" >No Reviews Yet</h2>

                            </div>
                        </div>)
                    }

                </>)
            }
        </>
    )
}

export default ProductDetail