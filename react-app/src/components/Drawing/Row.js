
import styles from '../../css-modules/Row.module.css';
import Pixel from './Pixel';

export default function Row({ row, colorChoice }) {

    let pixels = [];

    for (let i = 0; i < 5; i++) {
        pixels.push(<Pixel key={i} row={row} colorChoice={colorChoice}/>)
    }

    return (
        <div className={styles.row}>
            {pixels}
        </div>
    );
};