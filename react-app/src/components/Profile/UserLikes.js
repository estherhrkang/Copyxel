import { useSelector } from 'react-redux';
import Slide from '../Home/Slide';
import styles from '../../css-modules/UserLikes.module.css';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Pagination, Mousewheel, Keyboard } from 'swiper/core';
SwiperCore.use([Pagination, Mousewheel, Keyboard]);

export default function UserLikes() {
    const user = useSelector(state => state.session.user);
    const likedDrawingsArray = user?.liked_drawings;

    const slides = [];
    for (let i = 0; i < likedDrawingsArray?.length; i++) {
        slides.push(
            <SwiperSlide key={i} className={styles.swiperSlide}>
                <Slide drawing={likedDrawingsArray[i]}/>
            </SwiperSlide>
        );
    };

    if (likedDrawingsArray.length) {
        return(
            <div className={styles.userLike}>
                <Swiper slidesPerView={4} keyboard={true} mousewheel={true} spaceBetween={30} 
                    pagination={{ "clickable": true }} className={styles.swiperContainer}>
                    {slides}
                </Swiper>
            </div>
        );
    } else {
        return(
            <div className={styles.emptyLike}>You have not liked any drawings yet!</div>
        )
    }
};