// import styles?


export default function Column({ rowIdx, columnIdx, currentDrawingColorsArray }) {

    return(
        <div
            style={{ backgroundColor: currentDrawingColorsArray[rowIdx][columnIdx] }}
        >
        </div>
    )
}