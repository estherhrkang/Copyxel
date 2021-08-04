import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrawings, getAllDrawingsByUser } from '../../store/drawing';
import Slide from '../Home/Slide';
import styles from '../../css-modules/UserHistory.module.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
// import Swiper core and required modules
import SwiperCore, { Pagination, Mousewheel, Keyboard } from 'swiper/core';
// install Swiper modules
SwiperCore.use([Pagination, Mousewheel, Keyboard]);

export default function UserHistory() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    console.log('---user---', user);
    const drawingsArray = user?.drawings
    console.log('drawingsArray', drawingsArray);
    // const drawingsArray = useSelector(state => state.drawing.drawings);

    const slides = [];
    for (let i = 0; i < drawingsArray?.length; i++) {
        slides.push(
            <SwiperSlide key={i} className={styles.swiperSlide}>
                <Slide drawing={drawingsArray[i]}/>
            </SwiperSlide>
        )
    }

    useEffect(() => {
        dispatch(getAllDrawingsByUser(user?.id));
    }, [dispatch]);

    return(
        <div className={styles.userHistory}>display user's drawing history
            <Swiper slidesPerView={4} keyboard={true} mousewheel={true} spaceBetween={30} 
                pagination={{ "clickable": true }} className={styles.swiperContainer}>
                {slides}
            </Swiper>
        </div>
    );
};