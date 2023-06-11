import React from "react";
import ReactStars from "react-rating-stars-component"
import profile from "./image/Profile.png"

const ReviewCard = (review) => {


    const options = {
        edit: false,
        color: "#758283",
        activeColor: "white",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true
    }


    return (
        <>
            <div className="bg-[#CAD5E2] mx-[200px] overflow-auto mt-[15px] mb-[70px] p-[20px] text-center " >
                <h1 className="text-[35px]  pt-[30px] font-[800]  " >Reviews</h1>
                <hr className="w-48 h-1 mx-auto  bg-black  border-0 rounded " />
                <div className="items-center ml-[10px] py-[20px] w-[20%] bg-[#E5D68A] border-[black] border-[1px]  rounded mt-[25px]  " >
                    <img className="w-[100px] mx-auto " src={profile} alt="User" />
                    <div className="text-center mx-auto" >
                        <p>{review.name}</p>
                        <div className="ml-[5.5rem]" ><ReactStars  {...options} /></div>
                        <span>{review.comment}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewCard;