import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-material-ui-carousel';
import ReactStars from 'react-rating-stars-component'
// import { Paper, Button } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { getProductDetails } from "../../actions/productAction";

const ProductDetail = () => {
    let { id } = useParams()
    console.log(`prince${id}`);
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails)

    useEffect(() => {

        dispatch(getProductDetails(id))

    }, [dispatch, id])

    const options = {
        edit: false,
        color: "#758283",
        activeColor: "white",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true
    }



    return (
        <Fragment>
            <div className="w-[100vw] max-w-[100%] flex gap-[200px]  box-border  p-[6vmax] " >
                <div className=" lg:w-[29%] ml-[10%] ">
                    <Carousel >
                        {
                            product.image && product.image.map((item, i) => (
                                <img key={item.url} src={item.url} alt={`${i} Slide`} />
                            ))
                        }
                    </Carousel>
                </div>

                <div>

                    <div>
                        <h2 className="text-[35px] font-[800] " >{product.name}</h2>
                        <p>Product #{product._id}</p>
                    </div>
                    <hr className="h-[2px] bg-[#758283] mt-[5px] w-[30rem] " />

                    <div className="flex my-[20px] items-center gap-[10px]" >
                        <ReactStars {...options} />
                        <span>({product.numOfReviews} Reviews)</span>
                    </div>

                    <hr className="h-[2px] bg-[#758283] mt-[5px] w-[30rem] " />

                    <div className="my-[20px] " >
                        <h1 className="text-[30px] font-[800]" ><span className="text-[25px]" >&#8377;</span>{product.price}</h1>

                        <div className="flex items-center gap-[15px]" >
                            <div>
                                <button className="w-[1.5rem] bg-[#758283] text-white font-[900] my-[15px] " >-</button>
                                <input className="w-[3rem] pl-[12px] text-center " value="1" type="number" />
                                <button className="w-[1.5rem] bg-[#758283] text-white font-[900] my-[15px] " >+</button>
                            </div>
                            <button className="bg-[#E8BD0D] w-[8rem] text-white font-[800] h-[25px] rounded-[40px] " >Add to Cart</button>
                        </div>


                        <hr className="h-[2px] bg-[#758283] mt-[10px] w-[30rem] " />

                        <p className="my-[20px]  text-[15px] font-[600] " >Status:
                            <b className={product.Stock < 1 ? "text-[red]" : "text-[green] ml-[5px]"} >
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>

                    <div>
                        Description:<p>{product.description}</p>
                    </div>

                    <button>Submit Review</button>
                </div>

            </div>
        </Fragment>
    )
}

export default ProductDetail