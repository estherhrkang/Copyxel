
import styles from '../../css-modules/Row.module.css';
import Pixel from './Pixel';

export default function Row({ row, pixel, setPixel, colorChoice }) {

    let pixels = [];

    for (let j = 0; j < 5; j++) {
        // setPixel(`${j}`)
        // pixel = j;
        pixels.push(<Pixel row={row} pixel={pixel} colorChoice={colorChoice}/>)
    }

    return (
        <div className={styles.row}>
            {pixels}
        </div>
    );
};