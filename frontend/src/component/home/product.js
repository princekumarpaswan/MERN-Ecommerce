import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
    edit: false,
    color: "#758283",
    activeColor: "white",
    size: window.innerWidth < 600 ? 20 : 25,
    value: "2.5",
    isHalf: true
}


const Products = ({ product }) => {
    return (
        <Link to={product._id}  >
            <div className="w-[350px] bg-[#E8BD0D] duration-100 hover:shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] mx-[50px] mt-[50px] p-[5px] rounded" >
                <img src={product.image[0].url} alt={product.name} />
                <p className="text-[25px] font-[800] p-[5px] ml-[10px]" >{product.name}</p>
                <div className="p-[5px] ml-[10px] mt-[-17px] flex items-center text-center justify-between">
                    <ReactStars {...options} />
                    <span className="mr-[70px]" >(256 Reviews)</span>
                </div>
                <span className="p-[5px] ml-[10px] text-[15px] font-[600] " >{product.price}</span>
            </div>

        </Link>
    )
}

export default Products