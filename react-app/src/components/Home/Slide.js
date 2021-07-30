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

    return (
        <div>
            <div>{drawing.title}</div>
            <div>
                {/* {drawing.colors} */}
            </div>
            <div>{changeDateFormat(drawing.date_created)}</div>
        </div>
    )
}