import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrawings, getDrawing, deleteDrawing } from '../../store/drawing';
import DisplayRow from './DisplayRow';
import styles from '../../css-modules/Display.module.css';

export default function Display() {    
    // use getDrawing to display one drawing
    // use this component on sample drawing and results components

    // 1) if drawing id can be passed in as a prop, 
    // use useParams to get id and find currentDrawing

    // 2) if not, get all drawings, get drawing from a random number as id
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDrawings());
        // dispatch(getDrawing(drawing)) // id, title, colors, date_created
    }, [dispatch])
    
    // drawing store obj
    // { drawings: [ {colors: stringified allColors...}, {colors: ...}, ... ] }
    const drawingsObj = useSelector(state => state.drawing.drawing);
    // [ {colors: stringified allColors...}, {colors: stringified allColors...} ... ]
    const drawingsArray = drawingsObj?.drawings;
    console.log('whats in drawingsobj.drawings?', drawingsArray);    
    // console.log('parsed?', JSON.parse(drawingsArray[6]['colors']))
    

    // (1) for each drawing in drawingsArray,
    // find one where its id matches the id passed into this component
    const fakeDrawingIdToBePassedInAsProp = 6;    
    // (1.5) to randomize what's shown:
    // get all drawings
    // filter out that's owned by current user
    // generate random number up to length of all drawings - 1
    // set it as id to find currentDrawing
    const randomIdx = Math.floor(Math.random() * drawingsArray?.length);
    console.log('---random index---', randomIdx);

    const currentDrawing = drawingsArray?.find(each => each['id'] === fakeDrawingIdToBePassedInAsProp)
    console.log('currentDrawing', currentDrawing)
    
    // (2) for that drawing, parse allColors 2d array
    const currentDrawingColorsArray = currentDrawing && JSON.parse(currentDrawing['colors'])
    console.log('currentDrawingColorsArray', currentDrawingColorsArray)
    

    // (3) create columns first, create rows 
    // set its background color to corresponding color value in 2d array
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


    function changeDateFormat(date) {
        const dayOfWk = date.slice(0, 4)
        const day = date.slice(5, 7)
        const month = date.slice(8, 11)
        const year = date.slice(12, 16)
        return `${dayOfWk} ${month} ${day} ${year}`
    }

    return(
        <div className={styles.drawingPanel}>
            <div className={styles.pixels}>
                {rows}
            </div>
        </div>
    );
};