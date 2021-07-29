
import styles from '../../css-modules/Row.module.css';
import Pixel from './Pixel';

export default function Row({ row, pixel, setPixel, canvas, setRp00, colorChoice }) {

    let pixels = [];
    let pixels2 = [];

    for (let j = 0; j < 5; j++) {
        // setPixel(`${j}`)
        // pixel = j;
        pixels.push(<Pixel key={j} row={row} pixel={pixel} setRp00={setRp00} colorChoice={colorChoice}/>)
    
        pixels2.push(<Pixel key={j} canvas={canvas}/>)
    }

    return (
        <div className={styles.row}>
            {pixels}
        </div>
    );
};