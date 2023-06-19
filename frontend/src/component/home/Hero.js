import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";
import "swiper/css/autoplay"
import { Pagination, Autoplay } from "swiper";
import HeroCard from "./HeroCards";
import hero1 from "./image/hero1.jpg"
import hero2 from "./image/hero2.jpg"
import hero3 from "./image/hero3.jpg"

const Hero = () => {
    return (
        <>
            <Swiper
                pagination={{ dynamicBullets: true, }}
                autoplay={{ delay: 2500 }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide><HeroCard img={hero1} text={"Summer Cloths"} /></SwiperSlide>
                <SwiperSlide><HeroCard img={hero2} text={"Winter Cloths"} /></SwiperSlide>
                <SwiperSlide><HeroCard img={hero3} text={"Autom Cloths"} /></SwiperSlide>
            </Swiper>
        </>
    )
}

export default Hero