import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router';
import { getAllDrawings, getDrawing } from '../../store/drawing';
import ResultsRow from './ResultsRow';
import styles from '../../css-modules/Results.module.css';

export default function Results({ colorsArray }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const drawingsArray = useSelector(state => state.drawing.drawings);
    console.log('---drawingsArray---', drawingsArray);

    // compare stringified arrays
    const currentDrawing = drawingsArray?.find(drawing => drawing['colors'] == JSON.stringify(colorsArray));

    useEffect(() => {
        dispatch(getAllDrawings());
    }, [dispatch]);

    let sampleColorsArray;
    if (currentDrawing) {
        sampleColorsArray = JSON.parse(currentDrawing['sample_colors']);
        console.log('---sampleColorsArray---', sampleColorsArray);
    } else {
        sampleColorsArray = [];
    };

    let sampleRows = [];
    for (let i = 0; i < sampleColorsArray?.length; i++) {
        sampleRows.push(
            <ResultsRow 
                key={i}
                rowIdx={i}
                colorsArray={sampleColorsArray}
            />
        );
    };

    let rows = [];
    for (let i = 0; i < colorsArray?.length; i++) {
        rows.push(
            <ResultsRow 
                key={i}
                rowIdx={i}
                colorsArray={colorsArray}
            />
        );
    };

    // const playAgain = () => {
    //     return <Redirect to='/drawing'/>
    // }

    return (
        <div className={styles.resultsContainer}>
            <h1>Results page</h1>
            {/* sample: use passed down sample drawing id */}
            {/* drawing: use display component? grab last drawing id from store */}
            <div className={styles.results}>
                <div className={styles.drawingPanel}>
                    Sample drawing
                    <div className={styles.pixels}>{sampleRows}</div>
                </div>
                <div className={styles.drawingPanel}>
                    Your drawing
                    <div className={styles.pixels}>{rows}</div>
                </div>
            </div>
            <button type='button' onClick={() => history.push('/')}>Back to Home</button>
            <button type='button' onClick={() => window.location.reload()}>Play again?</button>
            {/* <button type='button' onClick={playAgain}>Play again?</button> */}
        </div>
    )
}