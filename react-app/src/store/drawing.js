import { setUser } from './session';

const SET_ALL_DRAWINGS = 'drawing/SET_ALL_DRAWINGS';
const SET_DRAWING = 'drawing/SET_DRAWING';
// const REMOVE_DRAWING = 'drawing/REMOVE_DRAWING';
const SET_LIKE = 'drawing/SET_LIKE';
const SET_COMMENTS = 'drawing/SET_COMMENTS';

const setAllDrawings = (drawings) => ({
    type: SET_ALL_DRAWINGS,
    payload: drawings
});

const setDrawing = (drawing) => ({
    type: SET_DRAWING,
    payload: drawing
});

// const removeDrawing = (drawing) => ({
//     type: REMOVE_DRAWING,
//     payload: drawing
// });

const setLike = (drawing) => ({
    type: SET_LIKE,
    payload: drawing
});

const setComments = (comment) => ({
    type: SET_COMMENTS,
    payload: comment
});

export const getAllDrawings = () => async (dispatch) => {
    const response = await fetch('/api/drawings/');
    if (response.ok) {
        const data = await response.json();
        dispatch(setAllDrawings(data.drawings));
    } else {
        return ['An error occurred. Please try again.']
    };
};

export const getDrawing = (drawing) => async (dispatch) => {
    const response = await fetch(`/api/drawings/${drawing.id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setDrawing(data));
    } else {
        return ['An error occurred. Please try again.']
    };
};

export const createDrawing = (drawing) => async (dispatch) => {
    const response = await fetch('/api/drawings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(drawing)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setDrawing(data.drawing));
        dispatch(setUser(data.user));
    } else {
        return ['An error occurred. Please try again.']
    };
};

export const createLike = (drawing) => async (dispatch) => {
    const response = await fetch(`/api/drawings/${drawing.id}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(drawing)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setLike(data.drawings));
        dispatch(setUser(data.user));
        return 'liked'
    } else {
        return ['An error occurred. Please try again.']
    };
};

export const createComment = ({ content, drawing_id}) => async (dispatch) => {
    const response = await fetch(`/api/drawings/${drawing_id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({content})
    });
    if (response.ok) {
        console.log('---got response.ok---');
        const data = await response.json();
        dispatch(setComments(data));
    } else {
        console.log('---response not ok---');
        return ['An error occurred. Please try again.']
    };
};

export const editComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setComments(data.comments));
    } else {
        return ['An error occurred. Please try again.']
    };
}

export const deleteDrawing = (drawing) => async (dispatch) => {
    const response = await fetch(`/api/drawings/${drawing.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(drawing)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setAllDrawings(data.drawings));
        dispatch(setUser(data.user));
    } else {
        return ['An error occurred. Please try again.']
    };
};

export const deleteLike = (drawing) => async (dispatch) => {
    const response = await fetch(`/api/drawings/${drawing.id}/likes`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(drawing)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setLike(data.drawings));
        dispatch(setUser(data.user));
        return 'unliked'
    } else {
        return ['An error occurred. Please try again.']
    };
};

export const deleteComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setComments(data.comments));
    } else {
        return ['An error occurred. Please try again.']
    };
};

const initialState = { 
    drawing: null, drawings: null, 
    like: null, 
    comments: null
};
// const initialState = { drawing: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_DRAWINGS:
            return { ...state, drawings: action.payload }
        case SET_DRAWING:
            return { ...state, drawing: action.payload }
        // case REMOVE_DRAWING:
        //     return { ...state, drawing: null }
        case SET_LIKE:
            return { ...state, like: action.payload }
        case SET_COMMENTS:
            return { ...state, comments: action.payload }
        default:
            return state;
    };
};