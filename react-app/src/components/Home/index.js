import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllDrawings } from '../../store/drawing';
import Slide from './Slide';
import styles from '../../css-modules/Home.module.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
// import Swiper core and required modules
import SwiperCore, { Pagination, Mousewheel, Keyboard } from 'swiper/core';
// install Swiper modules
SwiperCore.use([Pagination, Mousewheel, Keyboard]);

export default function Home() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllDrawings());
    }, [dispatch]);
    
    const slides = [];
    const drawingsArray = useSelector(state => state.drawing.drawings);
    for (let i = 0; i < drawingsArray?.length; i++) {
        slides.push(
            <SwiperSlide key={i} className={styles.swiperSlide}>
                <Slide drawing={drawingsArray[i]}/>
            </SwiperSlide>
        );
    };

    const handlePlayButton = () => {
        if (user) {
            history.push('/drawing')
        } else {
            history.push('/login');
        };
    };

    return (
        <div className={styles.home}>
            <Swiper slidesPerView={4} keyboard={true} mousewheel={true} spaceBetween={30} 
                pagination={{ "clickable": true }} className={styles.swiperContainer}>
                {slides}
            </Swiper>
            <button type='button' onClick={handlePlayButton}>Play?</button>
        </div>
    );
};