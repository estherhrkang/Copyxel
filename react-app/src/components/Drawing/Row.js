
import styles from '../../css-modules/Row.module.css';
import Pixel from './Pixel';

export default function Row({ rowIdx, pixel, canvas, setCanvas, colorChoice }) {

    let pixels = [];

    for (let j = 0; j < 5; j++) {
        pixels.push(
            <Pixel 
                key={j} 
                rowIdx={rowIdx} 
                pixelIdx={j} 
                canvas={canvas} 
                setCanvas={setCanvas} 
                colorChoice={colorChoice}
            />
        )
    }

    return (
        <div className={styles.row}>
            {pixels}
        </div>
    );
};