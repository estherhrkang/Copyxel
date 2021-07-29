import Column from './Column';
import styles from '../../css-modules/Row.module.css';

export default function Row({ rowIdx, allColors, colorChoice, updateColors }) {

    // creates Column components to display
    let columns = [];
    for (let j = 0; j < 10; j++) {
        columns.push(
            <Column 
                key={j} 
                rowIdx={rowIdx} 
                columnIdx={j}
                allColors={allColors}
                colorChoice={colorChoice}
                updateColors={updateColors}
            />
        )
    }

    return (
        <div className={styles.row}>
            {columns}
        </div>
    );
};