import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DisplayRow from '../Display/DisplayRow';
import { deleteDrawing, createLike, deleteLike,
        createComment, editComment, deleteComment } from '../../store/drawing';

import { FaRegHeart, FaHeart, FaCommentMedical, FaRegCommentDots, FaRegEdit, FaRegSave, FaRegWindowClose } from 'react-icons/fa';
import { FiDelete } from 'react-icons/fi';
import { BsFillTrashFill } from 'react-icons/bs';
import styles from '../../css-modules/Slide.module.css';

export default function Slide({ drawing }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const usersDrawingsArray = user?.drawings;
    const usersLikedDrawingsArray = user?.liked_drawings;
    const commentsArray = drawing?.comments.sort((a, b) => b.id - a.id);
    const usersCommentsArray = user?.comments;

    const [showDeleteDrawing, setShowDeleteDrawing] = useState(false);
    const [showLike, setShowLike] = useState(false);
    const [showEditComment, setShowEditComment] = useState(false);
    const [editedContent, setEditedContent] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        // if current user is the owner of the drawing, display delete button
        for (let i = 0; i < usersDrawingsArray?.length; i++) {
            if (usersDrawingsArray[i].id === drawing.id) {
                setShowDeleteDrawing(true);
            };
        };

        // display like, unlike button
        if (!usersLikedDrawingsArray.length) setShowLike(false);
        for (let i = 0; i < usersLikedDrawingsArray?.length; i++) {
            if (usersLikedDrawingsArray[i].id === drawing.id) {
                setShowLike(true);
            };
        };

    }, [dispatch, drawing, user, usersDrawingsArray, usersLikedDrawingsArray]);

    // drawing.date_created -> Fri, 30 Jul 2021 00:00:00 GMT 
    function changeDateFormat(date) {
        const dayOfWk = date.slice(0, 4)
        const day = date.slice(5, 7)
        const month = date.slice(8, 11)
        const year = date.slice(12, 16)
        return `${dayOfWk} ${month} ${day} ${year}`
        // Fri, Jul 30 2021
    };

    // colors of drawing on the front side
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

    // colors of drawing on the back side
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

    // check if comment is owned by current user
    const commentOwner = (comment) => {
        for (let i = 0; i < usersCommentsArray?.length; i++) {
            if (usersCommentsArray[i].id === comment.id) {
                return true;
            }
        }
    }


    // create, delete, edit comments

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
    };

    const handleEditComment = (comment) => {
        const payload = {
            content: editedContent,
            drawing_id: comment.drawing_id,
            id: comment.id,
            user_id: comment.user_id
        }
        dispatch(editComment(payload));
        setShowEditComment(false);
    };


    // like, unlike

    const handleUnlike = () => {
        dispatch(deleteLike(drawing));
    };

    const handleLike = () => {
        dispatch(createLike(drawing));
    };


    // delete drawing

    const handleDeleteDrawing = async () => {
        for (let i = 0; i < commentsArray.length; i++) {
            await dispatch(deleteComment(commentsArray[i]));
        };
        await dispatch(deleteDrawing(drawing));
    };


    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                {/* front side */}
                <div className={styles.card__front}>
                    <div className={styles.canvas}>
                        <div className={styles.pixels}>
                            {rows}
                        </div>
                    </div>
                </div>
                {/* back side */}
                <div className={styles.card__back}>
                    <div>{changeDateFormat(drawing.date_created)}</div>
                    <div className={styles.title}>{drawing.title}</div>
                    <div className={styles.canvas}>
                        <div>
                            {sampleRows}
                        </div>
                    </div>
                    {user ? 
                        (
                            <>
                                {/* display or edit comment div */}
                                <div className={styles.commentContainer}>
                                    {commentsArray?.map((comment) => (
                                        <div className={styles.comment} key={comment.id}>
                                            {showEditComment ? (
                                                <>
                                                    <input
                                                        className={styles.commentEditBox}
                                                        value={editedContent}
                                                        placeholder='Edit your comment'
                                                        onChange={(e) => setEditedContent(e.target.value)}
                                                    >
                                                    </input>
                                                </>
                                            ) : (
                                                <>
                                                    { comment.content.length >= 20 ? (
                                                        `${comment.content.slice(0, 20)}...`
                                                    ) : (
                                                        comment.content
                                                    )}
                                                </>
                                            )}
                                            <div>
                                                {/* buttons: delete, save, cancel, showEdit */}
                                                {commentOwner(comment) && !showEditComment &&
                                                    <>
                                                        <FiDelete 
                                                            onClick={() => handleDeleteComment(comment)} 
                                                            className={styles.deleteButton}
                                                        />
                                                        <FaRegEdit 
                                                            onClick={() => setShowEditComment(true)}
                                                            className={styles.editButton}
                                                        />
                                                    </>
                                                }
                                                {showEditComment && 
                                                    <>
                                                        {editedContent && 
                                                            <FaRegSave 
                                                                onClick={() => handleEditComment(comment)}
                                                                className={styles.editButton}
                                                            />
                                                        }
                                                        <FaRegWindowClose 
                                                            onClick={() => setShowEditComment(false)}
                                                            className={styles.cancelButton}
                                                        />
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* leave comment div */}
                                <div>
                                    {errors.map((error, ind) => (<div key={ind}>{error}</div>))}
                                    <input
                                        className={styles.commentBox}
                                        value={content}
                                        placeholder='Leave a comment!'
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                    {content ? (
                                        <FaCommentMedical 
                                            onClick={handleComment} 
                                            className={styles.commentButton}
                                        />
                                    ) : (
                                        <FaRegCommentDots 
                                            className={styles.commentShowButton}
                                        />
                                    ) 
                                    }
                                </div>

                                {/* like or delete comment div */}
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
                        ) : (
                            <>
                                {/* display comment div */}
                                <div className={styles.commentContainer}>
                                    {commentsArray?.map((comment) => (
                                        <div key={comment.id}>
                                            {comment.content}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};