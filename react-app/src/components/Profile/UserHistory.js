import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Slide from '../Home/Slide';
import styles from '../../css-modules/UserHistory.module.css';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Pagination, Mousewheel, Keyboard } from 'swiper/core';
SwiperCore.use([Pagination, Mousewheel, Keyboard]);

export default function UserHistory() {
    const history = useHistory();
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

    if (drawingsArray.length) {
        return(
            <div className={styles.userHistory}>
                <Swiper slidesPerView={4} keyboard={true} mousewheel={true} spaceBetween={30} 
                    pagination={{ "clickable": true }} className={styles.swiperContainer}>
                    {slides}
                </Swiper>
            </div>
        );
    } else {
        return(
            <div className={styles.emptyHistory}>
                <div>You don't have any drawings yet!</div>
                <div>
                    <button type='button' onClick={() => history.push('/drawing')}>Play game?</button>
                </div>
            </div>
        )
    }
};