import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styles from '../../css-modules/Drawing.module.css';
import { CirclePicker } from 'react-color';
import { RiEraserLine } from 'react-icons/ri';
import Row from './Row';


export default function Drawing() {
    const history = useHistory();
    const [colorChoice, setColorChoice] = useState('#ed2364');

    let rows = [];
    for (let i = 0; i < 16; i++) {
        rows.push(<Row key={i} colorChoice={colorChoice}/>)
    }

    console.log(rows);

    return (
        <div>
            <h1>BEGIN DRAWING!</h1>
            <div className={styles.drawing}>
                <div className={styles.drawingPanel}>
                    <div className={styles.pixels}>{rows}</div>
                </div>
                <CirclePicker className={styles.colorPicker} color={colorChoice} onChangeComplete={(color) => setColorChoice(color.hex)}/>
                <div onClick={() => setColorChoice('#fff')}>
                    Erase<RiEraserLine />
                </div>
            </div>

            {/* if no color on canvas, disable see results button */}
            <button type='button' onClick={() => history.push('/drawing/results')}>SEE RESULTS</button>
            <button type='button' onClick={() => history.push('/drawing')}>CHOOSE A DIFFERENT DRAWING</button>
        </div>
    )
}