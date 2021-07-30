import styles from '../../css-modules/Slide.module.css';

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
    // console.log('parsed---', JSON.parse(drawing.colors)); // breaks!

    // 2) loop through row, loop through column
    // 3) grab each color value in row/column
    // 4) use Drawing(Row, Column) components to create canvas reflecting color value 

    // OR

    // ** use Results component! **

    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.card__front}>
                    <div>{drawing.title}</div>
                </div>
                <div className={styles.card__back}>
                    <div>
                        {/* {drawing.colors} */}
                    </div>
                    <div>{changeDateFormat(drawing.date_created)}</div>
                </div>
            </div>
        </div>
    )
}