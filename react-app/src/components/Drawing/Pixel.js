import { useState } from 'react';
import styles from '../../css-modules/Pixel.module.css';

export default function Pixel({ rowIdx, pixelIdx, canvas, setCanvas, colors, allColors, colorChoice, updateColors }) {
    const [pixelColor, setPixelColor] = useState('#fff');
    const [oldColor, setOldColor] = useState(pixelColor);
    const [canChangeColor, setCanChangeColor] = useState(true);
    
    function applyColor() {
        setPixelColor(colorChoice);
        setCanChangeColor(false);
        
        updateColors(rowIdx, pixelIdx, allColors);

        
        // if clicked on row/pixel, change setCanvas at row/pixel
        
        // setCanvas((prev) => {
        //     updateColors(rowIdx, pixelIdx)

        //     let rows = prev.map(row => row.slice())
        //     rows[rowIdx][pixelIdx] = colorChoice
        //     return rows
        // })

        // \/ updates, but only saves latest update
        // colors[rowIdx][pixelIdx] = colorChoice
        // setCanvas(colors)
        
        // \/ only saves first click
        // canvas[rowIdx][pixelIdx] = colorChoice

        // \/ breaks after third click
        // setCanvas(canvas[rowIdx][pixelIdx])
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