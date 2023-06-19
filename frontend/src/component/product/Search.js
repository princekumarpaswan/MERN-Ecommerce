import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Search = () => {
    const navigator = useNavigate()

    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigator(`/products/${keyword}`)

        } else {
            navigator(`/products`)
        }
    }


    return (
        <>
            <div className="mt-[18%] text-center items-center mb-[260px]  " >
                <form className="  " onSubmit={searchSubmitHandler} >
                    <input className="h-[50px] px-[20px] rounded w-[35%] " type="text" placeholder="Search......" onChange={(e) => setKeyword(e.target.value)} />
                    <input className="h-[50px] px-[20px] w-[150px] rounded cursor-pointer font-[900] text-white bg-[#E8BD0D] text-[15px] " type="submit" value="Search" />
                </form>
            </div>
        </>
    )
}


export default Search