import styles from '../../css-modules/ResultsColumn.module.css';

export default function ResultsColumn({ rowIdx, columnIdx, colorsArray }) {

    return (
        <div
            className={styles.pixel}
            style={{ backgroundColor: colorsArray[rowIdx][columnIdx] }}
        >
        </div>
    )
}