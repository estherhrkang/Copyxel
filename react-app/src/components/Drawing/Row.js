
import styles from '../../css-modules/Row.module.css';
import Pixel from './Pixel';

export default function Row({ colorChoice }) {

    let pixels = [];

    for (let i = 0; i < 16; i++) {
        pixels.push(<Pixel key={i} colorChoice={colorChoice}/>)
    }

    return (
        <div className={styles.row}>
            {pixels}
        </div>
    );
};