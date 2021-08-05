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

    return(
        <div className={styles.userLike}>display user's liked drawings
            <Swiper slidesPerView={4} keyboard={true} mousewheel={true} spaceBetween={30} 
                pagination={{ "clickable": true }} className={styles.swiperContainer}>
                {slides}
            </Swiper>
        </div>
    );
};