import { useSelector } from 'react-redux';
import Slide from '../Home/Slide';
import styles from '../../css-modules/UserHistory.module.css';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Pagination, Mousewheel, Keyboard } from 'swiper/core';
SwiperCore.use([Pagination, Mousewheel, Keyboard]);

export default function UserHistory() {
    const user = useSelector(state => state.session.user);
    const drawingsArray = user?.drawings

    const slides = [];
    for (let i = 0; i < drawingsArray?.length; i++) {
        slides.push(
            <SwiperSlide key={i} className={styles.swiperSlide}>
                <Slide drawing={drawingsArray[i]}/>
            </SwiperSlide>
        );
    };

    return(
        <div className={styles.userHistory}>display user's drawing history
            <Swiper slidesPerView={4} keyboard={true} mousewheel={true} spaceBetween={30} 
                pagination={{ "clickable": true }} className={styles.swiperContainer}>
                {slides}
            </Swiper>
        </div>
    );
};