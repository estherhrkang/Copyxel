import DisplayRow from './DisplayRow';
import sampleDrawings from '../../sampleData/sampleDrawings.json';
import styles from '../../css-modules/Display.module.css';

export default function Display({ randomIdx }) {

    const currentDrawingColorsArray = sampleDrawings[randomIdx];
    let rows = [];
    for (let i = 0; i < currentDrawingColorsArray?.length; i++) {
        rows.push(
            <DisplayRow 
                key={i}
                rowIdx={i}
                currentDrawingColorsArray={currentDrawingColorsArray}
            />
        );
    };

    return(
        <div className={styles.drawingPanel}>
            <div>
                {rows}
            </div>
        </div>
    );
};