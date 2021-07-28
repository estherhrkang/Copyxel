import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styles from '../../css-modules/Drawing.module.css';
import { CirclePicker } from 'react-color';
import { RiEraserLine } from 'react-icons/ri';
import Row from './Row';


export default function Drawing() {
    const history = useHistory();
    const [colorChoice, setColorChoice] = useState('#ed2364');


    const [pixelColor, setPixelColor] = useState('#fff');
    const [oldColor, setOldColor] = useState(pixelColor);
    const [canChangeColor, setCanChangeColor] = useState(true);

    function applyColor() {
        setPixelColor(colorChoice);
        setCanChangeColor(false);
    };

    function changeColorOnHover() {
        setOldColor(pixelColor);
        setPixelColor(colorChoice);
    };

    function resetColor() {
        if (canChangeColor) setPixelColor(oldColor);
        setCanChangeColor(true);
    };

    let rows = [];
    // let pixels = [];

    let rowsDB = [];
    // let pixelsDB = [];

    for (let i = 0; i < 5; i++) {
        // rowsDB[i] = [];
        // rows[i] = [];

        // 2)
        // rows.push(
        //     <div className={styles.row}>
        //     {pixels}
        //     </div>
        // )

        // for (let j = 0; j < 5; j++) {
            // rowsDB[i][j] = j;

            // 3)
            // rows[i] = (
            //     <div className={styles.row}>
            //          {rows[i][j] = (
            //             <div className={styles.pixel}
            //                 onClick={applyColor}
            //                 onMouseEnter={changeColorOnHover}
            //                 onMouseLeave={resetColor}
            //                 style={{ backgroundColor: pixelColor }}
            //             >
            //             </div>
            //          )}
            //     </div>
            // )
            
            // 2)
            // pixels.push(
            //     <div className={styles.pixel}
            //         onClick={applyColor}
            //         onMouseEnter={changeColorOnHover}
            //         onMouseLeave={resetColor}
            //         style={{ backgroundColor: pixelColor }}
            //     >
            //     </div>
            // )

            // 1)
            // rows[i][j] = (
            //     <div className={styles.row}>
            //          <div className={styles.pixel}
            //             onClick={applyColor}
            //             onMouseEnter={changeColorOnHover}
            //             onMouseLeave={resetColor}
            //             style={{ backgroundColor: pixelColor }}
            //         >
            //         </div>
            //     </div>
            // )

        // }

        // 0) working code
        rows.push(<Row key={i} colorChoice={colorChoice}/>)
    }

    // console.log('ROWS', rows);
    // console.log('DRAWING', drawing);

    // console.log('rowsDB----------', rowsDB);
    // console.log('pixelsDB----------', pixelsDB);


    return (
        <div className={styles.drawingContainer}>
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