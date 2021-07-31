import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getDrawing } from '../store/drawing';
import Display from './Display';
import styles from '../css-modules/SampleDrawing.module.css';

export default function SampleDrawing() {
    const history = useHistory();
    const [seconds, setSeconds] = useState(10);

    // 1)
    // working, but causes page reloads and runs random idx function every time
    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            clearTimeout()
            history.push('/drawing/new');
        }
    }, [seconds]);
    // if redirected to a different page:
    // setSeconds(0)

    // 2)
    // let seconds = 10
    // function countDown(time) {
    //     if (seconds > 0) {
    //         // setInterval(countDown(seconds), 1000)
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