import styles from '../../css-modules/Slide.module.css';
import DisplayRow from '../Display/DisplayRow';

export default function Slide({ drawing }) {

    // drawing.date_created -> Fri, 30 Jul 2021 00:00:00 GMT 
    function changeDateFormat(date) {
        const dayOfWk = date.slice(0, 4)
        const day = date.slice(5, 7)
        const month = date.slice(8, 11)
        const year = date.slice(12, 16)
        return `${dayOfWk} ${month} ${day} ${year}`
    }

    // 1) parse drawing.colors
    // console.log('NOT parsed---', drawing.colors);
    // console.log('parsed---', JSON.parse(drawing['colors'])); // breaks!
    const currentDrawingColorsArray = JSON.parse(drawing['colors']);

    // 2) loop through row, loop through column
    let rows = [];
    for (let i = 0; i < currentDrawingColorsArray?.length; i++) {
        rows.push(
            <DisplayRow 
                key={i}
                rowIdx={i}
                currentDrawingColorsArray={currentDrawingColorsArray}
            />
        )
    }
           

    // 3) grab each color value in row/column
    // 4) use Drawing(Row, Column) components to create canvas reflecting color value 

    // OR

    // ** use Results component! **

    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.card__front}>
                    <div className={styles.title}>{drawing.title}</div>
                    <div className={styles.canvas}>
                        <div className={styles.pixels}>
                            {rows}
                        </div>
                    </div>
                </div>
                <div className={styles.card__back}>
                    <div className={styles.date}>{changeDateFormat(drawing.date_created)}</div>
                </div>
            </div>
        </div>
    )
}