import Column from './Column';
// import styles?

export default function Row({ rowIdx, currentDrawingColorsArray }) {

    let columns = [];
    for (let j = 0; j < currentDrawingColorsArray[rowIdx].length; j++) {
        columns.push(
            <Column
                key={j}
                rowIdx={rowIdx}
                columnIdx={j}
                currentDrawingColorsArray={currentDrawingColorsArray}
            />
        )
    }

    return (
        <div>
            {columns}
        </div>
    )
}