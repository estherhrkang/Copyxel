import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrawings, getDrawing } from '../../store/drawing';
import DisplayRow from './DisplayRow';
import styles from '../../css-modules/Display.module.css';

export default function Display() {    
    const [loading, setLoading] = useState(false);
    
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
    
    // drawing store 
    // [ {colors: stringified allColors...}, {colors: stringified allColors...} ... ]
    const drawingsArray = useSelector(state => state.drawing.drawings);
    console.log('---drawingsArray---', drawingsArray);
    // console.log('parsed?', JSON.parse(drawingsArray[6]['colors']))
    

    // (1) get idx: 2 ways

    // ((1)) fixed max
    // const randomIdxWithFixedMax = useRef(Math.floor(Math.random() * 10));
    // ((2)) random Id based on the length of drawingsArray
    const randomIdx = useRef(Math.floor(Math.random() * (drawingsArray.length - 1)));
    console.log('---random index---', randomIdx);


    // (2) find currentDrawing: 2 ways

    // ((1))
    // const currentDrawing = drawingsArray?.find(each => Number(each['id']) === Number(randomIdxWithFixedMax.current)) // BREAKS HERE---!!! undefined
    // ((2)))
    const currentDrawing = drawingsArray[randomIdx.current];
    // const currentDrawing = drawingsArray?.find(each => each['id'] === randomIdx.current)
    console.log('---currentDrawing---', currentDrawing)

    // if (!currentDrawing) {
    //     setLoading(true)
    // } else {
    //     setLoading(false)
    // }
    
    // if (currentDrawing) {

    // if (!loading) {

        // (3) for that drawing, parse allColors 2d array
        let currentDrawingColorsArray
        if (currentDrawing) {
            currentDrawingColorsArray = JSON.parse(currentDrawing['colors'])
            // currentDrawingColorsArray = JSON.parse(currentDrawing?.colors)
        } else {
            currentDrawingColorsArray = []
        }
        // const colors = currentDrawing['colors']
        // const parsed = JSON.parse(colors)
        console.log('currentDrawingColorsArray', currentDrawingColorsArray)
        

        // (4) create columns first, create rows 
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

        return(
            <div className={styles.drawingPanel}>
                <div className={styles.pixels}>
                    {rows}
                </div>
            </div>
        );

    // } else {
    //     return (
    //         <div></div>
    //     )
    // }

    // } else {
    //     return (
    //         <div>Drawing is loading...</div>
    //     )
    // } 
};