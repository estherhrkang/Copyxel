import { useState, useEffect, useRef } from 'react';
import Display from '../Display';
import Drawing from '../Drawing';
import sampleDrawings from '../../sampleData/sampleDrawings.json';
import styles from '../../css-modules/SampleDrawing.module.css';

export default function SampleDrawing() {
    // adjust seconds! 
    const [seconds, setSeconds] = useState(10);
    const [beginDrawing, setBeginDrawing] = useState(false);

    useEffect(() => {
        if (seconds > 0 && window.location.pathname === '/drawing') {
            setTimeout(() => setSeconds((prev) => prev - 1), 1000);
        } else {
            clearTimeout();
            setBeginDrawing(true);
        }
    }, [seconds]);

    const randomIdx = useRef(Math.floor(Math.random() * (sampleDrawings.length)));
    // console.log('---randomIdx in SampleDrawing---', randomIdx.current);

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
                        <Display randomIdx={randomIdx.current} />
                    </div>
                </div>
            ) }
        </>
    );
};