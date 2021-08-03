import ResultsColumn from './ResultsColumn';
import styles from '../../css-modules/ResultsRow.module.css';

export default function ResultsRow({ rowIdx, colorsArray }) {

    let columns = [];
    for (let j = 0; j < colorsArray[rowIdx].length; j++) {
        columns.push(
            <ResultsColumn 
                key={j}
                rowIdx={rowIdx}
                columnIdx={j}
                colorsArray={colorsArray}
            />
        )
    }

    return (
        <div className={styles.row}>
            {columns}
        </div>
    )
}