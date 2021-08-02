import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reduceTime } from '../store/time';
import Display from './Display';
import Drawing from './Drawing';
import styles from '../css-modules/SampleDrawing.module.css';

export default function SampleDrawing() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [seconds, setSeconds] = useState(5);

    // how to countdown without page reload...?!?!

    // 0)
    // const time = useSelector(state => state.time);
    // useEffect(() => {
    //     dispatch(reduceTime(time));
    // }, [dispatch, time]);


    // 1) working, but causes page reloads and runs random idx function every time
    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds((prev) => prev - 1), 1000);
        } else {
            clearTimeout()
            history.push('/drawing/new');
        }
    }, [seconds]);

    // if redirected to a different page:
    // setSeconds(0)


    // 2)
    // let seconds = 5;
    // function countDown(time) {
    //     if (seconds > 0) {
    //         setInterval(countDown(seconds), 1000)
    //         seconds--
    //         // setTimeout(countDown(seconds-1), 1000); // stack overflow
    //     } else {
    //         clearInterval(countDown)
    //         // clearTimeout()
    //         history.push('/drawing/new');
    //     }
    // }
    // countDown(seconds);
    // getting error in browser console: 
    // can't perform a react state update on an unmounted component -> memory leak
    // cancel all subscriptions and asynchronous tasks in a useEffect cleanup function

    // 3)
    // let seconds = 10;
    // function countDown() {
    //     const timeLeft = setInterval(function() {
    //         seconds--;
    //         if (seconds <= 0) {
    //             clearInterval(timeLeft)
    //         }
    //     }, 1000);
    // }
    // countDown();

    return(
        // <>
        // {time ? (
        //     <div className={styles.sampleDrawingContainer}>
        //         <h1>Sample Drawing Title</h1>
        //         <h3>Get ready to copy this drawing in {time} seconds!</h3>
        //         <div className={styles.sampleDrawing}>
        //             Sample Drawing
        //             <Display />
        //         </div>
        //         {/* <button type='button' onClick={() => history.push('/drawing/new')}>Begin drawing</button> */}
        //     </div>
        // ) : (
        //     <Drawing />
        // )}
        // </>


        <div className={styles.sampleDrawingContainer}>
                <h1>Sample Drawing Title</h1>
                <h3>Get ready to copy this drawing in {seconds} seconds!</h3>
                <div className={styles.sampleDrawing}>
                    Sample Drawing
                    <Display />
                </div>
                {/* <button type='button' onClick={() => history.push('/drawing/new')}>Begin drawing</button> */}
            </div>
    )
}