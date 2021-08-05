import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DisplayRow from '../Display/DisplayRow';
import { getAllDrawings, deleteDrawing, createLike, deleteLike } from '../../store/drawing';

import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import styles from '../../css-modules/Slide.module.css';

export default function Slide({ drawing }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const drawingsArray = useSelector(state => state.drawing.drawings);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        dispatch(getAllDrawings());
    }, [dispatch]);

    // drawing.date_created -> Fri, 30 Jul 2021 00:00:00 GMT 
    function changeDateFormat(date) {
        const dayOfWk = date.slice(0, 4)
        const day = date.slice(5, 7)
        const month = date.slice(8, 11)
        const year = date.slice(12, 16)
        return `${dayOfWk} ${month} ${day} ${year}`
    };

    const currentDrawingColorsArray = JSON.parse(drawing['colors']);
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

    const currentSampleDrawingColorsArray = JSON.parse(drawing['sample_colors']);
    let sampleRows = [];
    for (let i = 0; i < currentSampleDrawingColorsArray?.length; i++) {
        sampleRows.push(
            <DisplayRow 
                key={i}
                rowIdx={i}
                currentDrawingColorsArray={currentSampleDrawingColorsArray}
            />
        );
    };

    // if guest user, show filled heart with count of total likes for the drawing
    const handleUnlike = () => {
        dispatch(deleteLike(drawing));
    };
    const handleLike = () => {
        dispatch(createLike(drawing));
    };

    // only if drawing is owned by current user, show button to delete the drawing
    // if (user.id == drawing['user_id']) {
    //     setShowDelete(true);
    // }
    const handleDelete = () => {
        dispatch(deleteDrawing(drawing));
    };

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
                    {/* how to show user name accordingly? */}
                    <div>{changeDateFormat(drawing.date_created)}</div>
                    <div className={styles.title}>{drawing.title}</div>
                    <div className={styles.canvas}>
                        <div className={styles.pixels}>
                            {sampleRows}
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        {user && 
                            <>
                                <FaHeart onClick={handleUnlike} className={styles.likeButton} style={{ color: 'red' }}/>
                                <FaRegHeart onClick={handleLike} className={styles.likeButton}/>  
                                {/* {showDelete &&  */}
                                    <BsFillTrashFill onClick={handleDelete} className={styles.deleteButton}/>
                                {/* } */}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};