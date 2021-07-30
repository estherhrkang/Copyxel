import React from 'react';
import { useHistory } from 'react-router';
import { getDrawing } from '../store/drawing';
import Display from './Drawing/Display';
import styles from '../css-modules/SampleDrawing.module.css';

export default function SampleDrawing() {
    const history = useHistory();

    return(
        <div className={styles.sampleDrawingContainer}>
            <h1>Sample Drawing Title</h1>
            <div className={styles.sampleDrawing}>
                Sample Drawing
                <Display />
            </div>
            <button type='button' onClick={() => history.push('/drawing/new')}>Begin drawing</button>
        </div>
    )
}