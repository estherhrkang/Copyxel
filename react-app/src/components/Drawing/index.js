import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createDrawing, deleteDrawing } from '../../store/drawing';
import Row from './Row';
import { exportComponentAsPNG } from 'react-component-export-image';
import { CirclePicker } from 'react-color';
import { RiEraserLine } from 'react-icons/ri';
import styles from '../../css-modules/Drawing.module.css';


export default function Drawing() {
    const history = useHistory();
    const dispatch = useDispatch();
    const canvasRef = useRef();
    const [title, setTitle] = useState('');

    const [colorChoice, setColorChoice] = useState('#607d8b');
    let [row, setRow] = useState('');
    let [pixel, setPixel] = useState('');

    // useEffect(() => {
    //     // if
    // }, [colorChoice, row, pixel]);

    const handleSubmit = async () => {
        const payload = {
            title,
            rows
        }
        await dispatch(createDrawing(payload))
        history.push('/drawing/results')
    }

    // const [pixelColor, setPixelColor] = useState('#fff');
    // const [oldColor, setOldColor] = useState(pixelColor);
    // const [canChangeColor, setCanChangeColor] = useState(true);

    // function applyColor() {
    //     setPixelColor(colorChoice);
    //     setCanChangeColor(false);
    // };

    // function changeColorOnHover() {
    //     setOldColor(pixelColor);
    //     setPixelColor(colorChoice);
    // };

    // function resetColor() {
    //     if (canChangeColor) setPixelColor(oldColor);
    //     setCanChangeColor(true);
    // };

    



    let rows = []; // <-defined above 
    // let pixels = [];

    // let rowsDB = [
    //     ['0', '0', '0', '0', '0'],
    //     ['0', '0', '0', '0', '0'],
    //     ['0', '0', '0', '0', '0'],
    //     ['0', '0', '0', '0', '0'],
    //     ['0', '0', '0', '0', '0']
    // ];
    // let pixelsDB = [];

    for (let i = 0; i < 5; i++) {
        // setRow(`${i}`)

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
        rows.push(<Row row={row} pixel={pixel} setPixel={setPixel} colorChoice={colorChoice}/>)
        // rows.push(<Row key={i} row={rowsDB[i]} colorChoice={colorChoice}/>)
    }

    // console.log('ROWS', rows);
    // console.log('DRAWING', drawing);

    // console.log('rowsDB----------', rowsDB);
    // console.log('pixelsDB----------', pixelsDB);


    return (
        <div className={styles.drawingContainer}>
            <h1>Begin drawing!</h1>
            <div className={styles.drawing}>
                <form>
                    <input 
                        type='text'
                        placeholder='Name your drawing!'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </form>
                <div className={styles.drawingPanel}>
                    <div className={styles.pixels} ref={canvasRef}>{rows}</div>
                </div>
                <CirclePicker className={styles.colorPicker} color={colorChoice} onChangeComplete={(color) => setColorChoice(color.hex)}/>
                <div onClick={() => setColorChoice('#fff')}>
                    Erase<RiEraserLine />
                </div>
            </div>

            {/* if no color on canvas, disable see results button */}
            <button type='button' onClick={handleSubmit}>See results</button>
            <button type='button' onClick={() => history.push('/drawing')}>Choose a different drawing</button>
            <button type='button' onClick={() => exportComponentAsPNG(canvasRef)}>
                Export as PNG
            </button>
        </div>
    )
}