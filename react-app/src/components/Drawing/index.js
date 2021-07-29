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
    const [colorChoice, setColorChoice] = useState('#607d8b');
    
    // set initial colors of canvas in 2d array with '#fff' value
    let colors = [];
    for (let i = 0; i < 10; i++) {
        colors.push([]);
        for (let j = 0; j < 10; j++) {
            colors[i].push('#fff');
        };
    };

    // using useRef so component doesn't reload every time to reflect changes
    // useRef keeps element in an object
    const allColors = useRef(colors);
    // console.log('allColors', allColors);
    // prints { [ [], [], [] ... ], [ [], [], [] ... ] ... }

    // function used @ Column component when user clicks
    // r = rowIdx, c = columnIdx, obj = allColors
    const updateColors = (r, c, obj) => {
        // make a copy of allColors
        const copy = obj.current.map(row => row.slice());
        // change color value at [rowIdx][columnIdx] be clicked color
        copy[r][c] = colorChoice
        // set allColors equal to modified copy
        obj.current = copy
    }

    // creates rows of Row components to display
    let rows = [];
    for (let i = 0; i < 10; i++) {
        rows.push(
            <Row 
                key={i} 
                rowIdx={i}
                allColors={allColors}
                colorChoice={colorChoice}
                updateColors={updateColors}
            />
        )
    }

    const handleSubmit = async () => {
        const payload = {
            title,
            rows // <- should be renamed: pixels?
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