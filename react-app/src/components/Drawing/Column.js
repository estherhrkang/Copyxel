import { useState } from 'react';
import styles from '../../css-modules/Column.module.css';

export default function Column({ rowIdx, columnIdx, allColors, colorChoice, updateColors }) {
    const [pixelColor, setPixelColor] = useState('#fff');
    const [oldColor, setOldColor] = useState(pixelColor);
    const [canChangeColor, setCanChangeColor] = useState(true);
    
    function applyColor() {
        setPixelColor(colorChoice);
        setCanChangeColor(false);
        // function from Drawing Component
        updateColors(rowIdx, columnIdx, allColors);
    };

    function changeColorOnHover() {
        setOldColor(pixelColor);
        setPixelColor(colorChoice);
    };

    function resetColor() {
        if (canChangeColor) setPixelColor(oldColor);
        setCanChangeColor(true);
    };

    return (
        <div className={styles.pixel}
            onClick={applyColor}
            onMouseEnter={changeColorOnHover}
            onMouseLeave={resetColor}
            style={{ backgroundColor: pixelColor }}
        >
        </div>
    );
};

// /\ credits to Aleks Popovic's YouTube tutorial! /\