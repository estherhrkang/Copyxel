import styles from '../../css-modules/DisplayColumn.module.css';

export default function DisplayColumn({ rowIdx, columnIdx, currentDrawingColorsArray }) {

    return(
        <div
            className={styles.pixel}
            style={{ backgroundColor: currentDrawingColorsArray[rowIdx][columnIdx] }}
        >
        </div>
    )
}