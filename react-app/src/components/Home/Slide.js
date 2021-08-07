import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DisplayRow from '../Display/DisplayRow';
import { getAllDrawings, deleteDrawing, createLike, deleteLike,
        createComment, editComment, deleteComment } from '../../store/drawing';

import { FaRegHeart, FaHeart, FaCommentMedical, FaRegCommentDots, FaRegEdit, FaRegSave } from 'react-icons/fa';
import { FiDelete } from 'react-icons/fi';
import { BsFillTrashFill } from 'react-icons/bs';
import styles from '../../css-modules/Slide.module.css';

export default function Slide({ drawing }) {
    const dispatch = useDispatch();
    const allDrawings = useSelector(state => state.drawing.drawings);
    const user = useSelector(state => state.session.user);
    const usersDrawingsArray = user?.drawings;
    const usersLikedDrawingsArray = user?.liked_drawings;
    const commentsArray = drawing?.comments;

    const [showDeleteDrawing, setShowDeleteDrawing] = useState(false);
    const [showLike, setShowLike] = useState(false);
    const [showDeleteComment, setShowDeleteComment] = useState(false);
    const [showEditComment, setShowEditComment] = useState(false);
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [editErrors, setEditErrors] = useState([]);

    useEffect(() => {
        for (let i = 0; i < usersDrawingsArray?.length; i++) {
            if (usersDrawingsArray[i].id === drawing.id) {
                setShowDeleteDrawing(true);
            };
        };
        for (let i = 0; i < usersLikedDrawingsArray?.length; i++) {
            if (usersLikedDrawingsArray[i].id === drawing.id) {
                setShowLike(true);
            };
        };
        // for (let i = 0; i < commentsArray?.length; i++) {
        //     if (commentsArray[i].user_id === user.id) {
        //         setShowDeleteComment(true);
        //     };
        // };
    }, [dispatch, drawing, user]);

    // drawing.date_created -> Fri, 30 Jul 2021 00:00:00 GMT 
    function changeDateFormat(date) {
        const dayOfWk = date.slice(0, 4)
        const day = date.slice(5, 7)
        const month = date.slice(8, 11)
        const year = date.slice(12, 16)
        return `${dayOfWk} ${month} ${day} ${year}`
    };

    // front side
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

    // back side
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

    const handleComment = async () => {
        const payload = {
            content: content,
            drawing_id: drawing.id
        }
        const data = await dispatch(createComment(payload));
        if (data) setErrors(data);
        setContent('');
    };

    const handleDeleteComment = (comment) => {
        dispatch(deleteComment(comment));
        setContent('');
    };

    const handleEditComment = (comment) => {
        if (!content) {
            setEditErrors(['Please leave your comment'])
        } else {
            dispatch(editComment(comment));
            setShowEditComment(false);
        }
    };

    // if guest user, show filled heart with count of total likes for the drawing
    const handleUnlike = () => {
        dispatch(deleteLike(drawing));
    };
    const handleLike = () => {
        dispatch(createLike(drawing));
    };

    const handleDeleteDrawing = () => {
        dispatch(deleteDrawing(drawing));
    };

    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.card__front}>
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
                        <div className={styles.comment}>
                            {/* <FaRegCommentDots /> */}
                            {/* {commentsArray?.map((comment) => comment.content)} */}
                            {commentsArray?.map((comment) => (
                                <div key={comment.id}>
                                    {showEditComment ? (
                                        <>
                                            {editErrors.map((error, ind) => (<div key={ind}>{error}</div>))}
                                            <input
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                            >
                                            </input>
                                        </>
                                    ) : (
                                        <>
                                            {comment.content}
                                        </>
                                    )}
                                    {/* {showDeleteComment && */}
                                        <FiDelete 
                                            onClick={() => handleDeleteComment(comment)} 
                                            className={styles.deleteButton}
                                        />
                                        {showEditComment ? (
                                            <>
                                                <FaRegSave 
                                                    onClick={() => handleEditComment(comment)}
                                                    className={styles.editButton}
                                                />
                                                <div onClick={() => setShowEditComment(false)}>Cancel</div>
                                            </>
                                        ) : (
                                            <FaRegEdit 
                                                onClick={() => setShowEditComment(true)}
                                                className={styles.editButton}
                                            />
                                        )}
                                    {/* } */}
                                </div>
                            ))}
                            
                        </div>
                        {user && 
                            <>  
                                <div className={styles.commentBox}>
                                    {errors.map((error, ind) => (<div key={ind}>{error}</div>))}
                                    <input
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                    {content ? (
                                        <FaCommentMedical 
                                            onClick={handleComment} 
                                            className={styles.commentButton}
                                            // disabled={!content}
                                        />
                                    ) : (
                                        <FaRegCommentDots />
                                    ) 
                                    }
                                </div>
                                <div>
                                    {showLike ? (
                                        <FaHeart 
                                            onClick={handleUnlike} 
                                            className={styles.likeButton} 
                                            style={{ color: 'red' }}
                                        />
                                    ) : (
                                        <FaRegHeart 
                                            onClick={handleLike} 
                                            className={styles.likeButton}
                                        />  
                                    )}
                                    {showDeleteDrawing && 
                                        <BsFillTrashFill 
                                            onClick={handleDeleteDrawing} 
                                            className={styles.deleteButton}
                                        />
                                    }
                                </div>  
                            </>
                        }
                </div>
            </div>
        </div>
    );
};