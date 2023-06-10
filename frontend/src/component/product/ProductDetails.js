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
            <div className="w-[100vw] max-w-[100%] flex  box-border  p-[6vmax] " >
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
                        <h2>{product.name}</h2>
                        <p>Product #{product._id}</p>
                    </div>

                    <div>
                        <ReactStars {...options} />
                        <span>({product.numOfReviews} Reviews)</span>
                    </div>

                    <div>
                        <h1>&#8377;{product.price}</h1>

                        <div>
                            <div>
                                <button>-</button>
                                <input value="1" type="number" />
                                <button>+</button>
                            </div>
                            <button>Add to Cart</button>
                        </div>

                        <p>Status:
                            <b className={product.Stock < 1 ? "text-[red]" : "text-[green]"} >
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