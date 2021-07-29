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

    // colors (#)
    // row 0
    const [rp00, setRp00] = useState('fff')
    const [rp01, setRp01] = useState('fff')
    const [rp02, setRp02] = useState('fff')
    const [rp03, setRp03] = useState('fff')
    const [rp04, setRp04] = useState('fff')
    // row 1
    const [rp10, setRp10] = useState('fff')
    const [rp11, setRp11] = useState('fff')
    const [rp12, setRp12] = useState('fff')
    const [rp13, setRp13] = useState('fff')
    const [rp14, setRp14] = useState('fff')
    // row 1
    const [rp20, setRp20] = useState('fff')
    const [rp21, setRp21] = useState('fff')
    const [rp22, setRp22] = useState('fff')
    const [rp23, setRp23] = useState('fff')
    const [rp24, setRp24] = useState('fff')
    // row 1
    const [rp30, setRp30] = useState('fff')
    const [rp31, setRp31] = useState('fff')
    const [rp32, setRp32] = useState('fff')
    const [rp33, setRp33] = useState('fff')
    const [rp34, setRp34] = useState('fff')
    // row 1
    const [rp40, setRp40] = useState('fff')
    const [rp41, setRp41] = useState('fff')
    const [rp42, setRp42] = useState('fff')
    const [rp43, setRp43] = useState('fff')
    const [rp44, setRp44] = useState('fff')

    let canvas = [
        [rp00, rp01, rp02, rp03, rp04],
        [rp10, rp11, rp12, rp13, rp14],
        [rp20, rp21, rp22, rp23, rp24],
        [rp30, rp31, rp32, rp33, rp34],
        [rp40, rp41, rp42, rp43, rp44]
    ]

    console.log('RP00-----', rp00);
    console.log('CANVAS-----', canvas);

    const handleSubmit = async () => {
        const payload = {
            title,
            rows: canvas // <- canvas
        }
        await dispatch(createDrawing(payload))
        history.push('/results')
    }

    // ---

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

    
    // ---

    let rows = []; // <-defined above 
    let rows2 =[];
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
        // 0) working code
        rows.push(<Row key={i} row={row} pixel={pixel} setPixel={setPixel} colorChoice={colorChoice}/>)
        // rows.push(<Row key={i} row={rowsDB[i]} colorChoice={colorChoice}/>)

        // experiment...
        rows2.push(<Row key={i} canvas={canvas} setRp00={setRp00} colorChoice={colorChoice}/>)

        // ---

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
                <div>
                    {rows2}
                </div>
                <CirclePicker className={styles.colorPicker} color={colorChoice} onChangeComplete={(color) => setColorChoice(color.hex)}/>
                <div onClick={() => setColorChoice('#fff')}>
                    Erase<RiEraserLine />
                </div>
            </div>

            {/* if no color on canvas, disable see results button */}
            <button type='button' onClick={handleSubmit}>See results</button>
            <button type='button' onClick={() => history.push('/drawing')}>Choose a different drawing</button>
            {/* <button type='button' onClick={() => exportComponentAsPNG(canvasRef)}>
                Export as PNG
            </button> */}
        </div>
    )
}