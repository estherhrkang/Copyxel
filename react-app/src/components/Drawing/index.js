import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createDrawing, deleteDrawing } from '../../store/drawing';
import Row from './Row';
import { CirclePicker } from 'react-color';
import { RiEraserLine } from 'react-icons/ri';
import styles from '../../css-modules/Drawing.module.css';


export default function Drawing() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [colorChoice, setColorChoice] = useState('#607d8b');

    const colors = [
        ['#fff', '#fff', '#fff', '#fff', '#fff'],
        ['#fff', '#fff', '#fff', '#fff', '#fff'],
        ['#fff', '#fff', '#fff', '#fff', '#fff'],
        ['#fff', '#fff', '#fff', '#fff', '#fff'],
        ['#fff', '#fff', '#fff', '#fff', '#fff']
    ]
    const [canvas, setCanvas] = useState(colors);
    console.log('CANVAS-----', canvas);

    const handleSubmit = async () => {
        const payload = {
            title,
            rows: canvas // <- canvas
        }
        await dispatch(createDrawing(payload))
        history.push('/results')
    }

    let rows = [];

    for (let i = 0; i < 5; i++) {
        rows.push(
            <Row 
                key={i} 
                rowIdx={i}
                canvas={canvas} 
                setCanvas={setCanvas} 
                colorChoice={colorChoice}
            />
        )
        
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
                    <div className={styles.pixels}>{rows}</div>
                </div>
                <CirclePicker className={styles.colorPicker} color={colorChoice} onChangeComplete={(color) => setColorChoice(color.hex)}/>
                <div onClick={() => setColorChoice('#fff')}>
                    Erase<RiEraserLine />
                </div>
            </div>

            {/* if no color on canvas, disable see results button */}
            <button type='button' onClick={handleSubmit}>See results</button>
            <button type='button' onClick={() => history.push('/drawing')}>Choose a different drawing</button>
        </div>
    )
}