import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getDrawing } from '../store/drawing';
import Display from './Display';
import styles from '../css-modules/SampleDrawing.module.css';

export default function SampleDrawing() {
    const history = useHistory();
    const [seconds, setSeconds] = useState(10);

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            history.push('/drawing/new');
        }
    })

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