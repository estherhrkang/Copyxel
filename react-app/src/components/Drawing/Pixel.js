import { useState } from 'react';
import styles from '../../css-modules/Pixel.module.css';

export default function Pixel({ row, pixel, colorChoice }) {
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