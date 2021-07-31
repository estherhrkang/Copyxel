import DisplayColumn from './DisplayColumn';
import styles from '../../css-modules/DisplayRow.module.css';

export default function DisplayRow({ rowIdx, currentDrawingColorsArray }) {

    let columns = [];
    for (let j = 0; j < currentDrawingColorsArray[rowIdx].length; j++) {
        columns.push(
            <DisplayColumn
                key={j}
                rowIdx={rowIdx}
                columnIdx={j}
                currentDrawingColorsArray={currentDrawingColorsArray}
            />
        )
    }

    return (
        <div className={styles.row}>
            {columns}
        </div>
    )
}