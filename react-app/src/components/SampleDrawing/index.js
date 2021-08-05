import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Display from '../Display';
import Drawing from '../Drawing';
import RandomSampleDrawing from './RandomSampleDrawing';
import sampleDrawings from '../../sampleData/sampleDrawings.json';
import styles from '../../css-modules/SampleDrawing.module.css';

export default function SampleDrawing() {
    const dispatch = useDispatch();
    // adjust seconds! 
    const [seconds, setSeconds] = useState(3);
    const [beginDrawing, setBeginDrawing] = useState(false);

    useEffect(() => {
        if (seconds > 0 && window.location.pathname === '/drawing') {
            setTimeout(() => setSeconds((prev) => prev - 1), 1000);
        } else {
            clearTimeout();
            setBeginDrawing(true);
        }
    }, [seconds]);

    const randomIdx = useRef(Math.floor(Math.random() * (sampleDrawings.length - 1)));
    console.log('---randomIdx in SampleDrawing---', randomIdx);

    return(
        <>
            { beginDrawing ? (
                <div>
                    <Drawing randomIdx={randomIdx.current} />
                </div>
            ) : (
                <div className={styles.sampleDrawingContainer}>
                    <h2>Memorize this drawing in {seconds} seconds!</h2>
                    <div className={styles.sampleDrawing}>
                        {/* Sample Drawing */}
                        <Display randomIdx={randomIdx.current} />
                        {/* <RandomSampleDrawing /> */}
                    </div>
                </div>
            ) }
        </>
    );
};