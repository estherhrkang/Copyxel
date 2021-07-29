import React, { useState, useEffect, useRef } from 'react';
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
    
    
    // set initial canvas color to #fff
    let colors = [];
    for (let i = 0; i < 5; i++) {
        colors.push([]);
        for (let j = 0; j < 5; j++) {
            colors[i].push('#fff');
        };
    };
    
    const allColors = useRef(colors);
    // keeps in object
    // use it when you don't want your component to reload if it's changed
    
    const [canvas, setCanvas] = useState(colors);
    console.log('allColors', allColors);

    // selected color
    const [colorChoice, setColorChoice] = useState('#607d8b');
    // selected row/pixel
    const updateColors = (r, p, obj) => {
        const copy = obj.current.map(row => row.slice())
        copy[r][p] = colorChoice
        obj.current = copy
    }

    // create rows
    let rows = [];
    for (let i = 0; i < 5; i++) {
        rows.push(
            <Row 
                key={i} 
                rowIdx={i}
                // canvas={canvas} 
                setCanvas={setCanvas}
                // colors={colors} 
                allColors={allColors}
                colorChoice={colorChoice}
                updateColors={updateColors}
            />
        )
    }

    const handleSubmit = async () => {
        const payload = {
            title,
            rows: canvas // <- canvas
        }
        await dispatch(createDrawing(payload))
        history.push('/results')
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