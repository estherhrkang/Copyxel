import Pixel from './Pixel';
import styles from '../../css-modules/Row.module.css';

export default function Row({ rowIdx, canvas, setCanvas, colors, allColors, colorChoice, updateColors }) {

    // create pixels(columns)
    let pixels = [];
    for (let j = 0; j < 5; j++) {
        pixels.push(
            <Pixel 
                key={j} 
                rowIdx={rowIdx} 
                pixelIdx={j} 
                // canvas={canvas} 
                setCanvas={setCanvas}
                // colors={colors}
                allColors={allColors}
                colorChoice={colorChoice}
                updateColors={updateColors}
            />
        )
    }

    return (
        <div className={styles.row}>
            {pixels}
        </div>
    );
};