import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrawings, getDrawing, deleteDrawing } from '../../store/drawing';
import styles from '../../css-modules/Display.module.css';

export default function Display({ drawing }) {    
    // use getDrawing to display one drawing
    // use this component on sample drawing and results components

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


    // 1) for each drawing in drawingsArray,
    // find one where its id matches the id passed into this component
    // filter out that's owned by current user
    // randomize what's shown

    // 2) for that drawing, parse allColors 2d array

    // 3) create rows, columns using color values in 2d array


    return(
        <div>
            display component
        </div>
    );
};