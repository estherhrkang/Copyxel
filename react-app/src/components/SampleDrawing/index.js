import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduceTime } from '../../store/time';
import Display from '../Display';
import Drawing from '../Drawing';
import RandomSampleDrawing from './RandomSampleDrawing';
import styles from '../../css-modules/SampleDrawing.module.css';

export default function SampleDrawing() {
    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState(10);
    const [beginDrawing, setBeginDrawing] = useState(false);

    // how to countdown without page reload...?!?!

    // 1)
    // const time = useSelector(state => state.time);
    // useEffect(() => {
    //     dispatch(reduceTime(time));
    // }, [dispatch, time]);


    // 2) working, but causes page reloads and runs random idx function every time
    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds((prev) => prev - 1), 1000);
        } else {
            clearTimeout();
            setBeginDrawing(true);
        }
    }, [seconds]);

    // const randomIdx = useRef(Math.floor(Math.random() * (samples.length - 1)));

    return(
        <>
        { beginDrawing ? (
            <div>
                {/* pass down randomIdx here */}
                <Drawing />
            </div>
        ) : (
            <div className={styles.sampleDrawingContainer}>
                    <h2>Remember this drawing in {seconds} seconds!</h2>
                    <div className={styles.sampleDrawing}>
                        {/* Sample Drawing */}
                        {/* <Display /> */}
                        {/* pass down randomIdx here */}
                        <RandomSampleDrawing />
                    </div>
                    {/* <button type='button' onClick={() => history.push('/drawing/new')}>Begin drawing</button> */}
            </div>
        ) }
        </>
    )
}