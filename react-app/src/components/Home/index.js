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
    }, [dispatch])
    
    // drawing store obj
    // { drawings: [ {colors: stringified allColors...}, {colors: ...}, ... ] }
    const drawingsObj = useSelector(state => state.drawing.drawing);
    console.log('whats in drawings store', drawingsObj);
    
    // after keying into drawing store obj -> breaks!
    // [ {colors: stringified allColors...}, {colors: stringified allColors...} ... ]
    // const drawingsArray = useSelector(state => Object.values(state.drawing.drawing));
    // --or--
    // const drawingsArray = useSelector(state => state.drawing.drawing['drawings']);
    // console.log('whats in drawings store with drawings key?', drawingsArray);

    // console.log('whats in drawingsobj.drawings?', drawingsObj?.drawings);

    const slides = [];
    const drawingsArray = drawingsObj?.drawings;
    for (let i = 0; i < drawingsArray?.length; i++) {
        slides.push(
            <SwiperSlide key={i} className={styles.swiperSlide}>
                <Slide drawing={drawingsArray[i]}/>
            </SwiperSlide>
        )
    }

    const handlePlayButton = () => {
        if (user) {
            history.push('/drawing')
        } else {
            history.push('/login');
        }
    };

    return (
        <div className={styles.home}>
            <Swiper slidesPerView={3} keyboard={true} mousewheel={true} spaceBetween={30} 
                pagination={{ "clickable": true }} className={styles.swiperContainer}>
                {slides}
            </Swiper>
            <button type='button' onClick={handlePlayButton}>Play?</button>
        </div>
    );
};