import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import styles from '../../css-modules/Results.module.css';
import ResultsRow from './ResultsRow';
import Display from '../Display';
import RandomSampleDrawing from '../SampleDrawing/RandomSampleDrawing';

export default function Results({ colorsArray, drawingTitle }) {
    const history = useHistory();

    // use drawing/display component! 
    // this component is to be used by home/slide component

    let rows = [];
    for (let i = 0; i < colorsArray?.length; i++) {
        rows.push(
            <ResultsRow 
                key={i}
                rowIdx={i}
                colorsArray={colorsArray}
            />
        )
    }

    return (
        <div className={styles.resultsContainer}>
            <h1>Results page</h1>
            {/* sample: use passed down sample drawing id */}
            {/* drawing: use display component? grab last drawing id from store */}
            <div className={styles.results}>
                <div>
                    {/* <div>sample</div>
                    <div><Display /></div> */}
                    <div>random sample drawing</div>
                    <div><RandomSampleDrawing /></div>
                </div>
                <div className={styles.drawingPanel}>
                    <div>{drawingTitle}</div>
                    <div className={styles.pixels}>{rows}</div>
                </div>
            </div>
            <button type='button' onClick={() => history.push('/')}>See friends' drawings</button>
            {/* <button type='button' onClick={() => history.push('/drawing')}>Start over!</button> */}
        </div>
    )
}