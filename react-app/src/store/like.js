const SET_ALL_LIKES = 'drawing/SET_ALL_LIKES';
const SET_LIKE = 'drawing/SET_LIKE';
const REMOVE_LIKE = 'drawing/REMOVE_LIKE';

const setAllLikes = (likes) => ({
    type: SET_ALL_LIKES,
    payload: likes
});

const setLike = (like) => ({
    type: SET_LIKE,
    payload: like
});

const removeLike = (like) => ({
    type: REMOVE_LIKE,
    payload: like
})

const initialState = { like: null };

export const getAllLikes = () => async (dispatch) => {
    const response = await fetch('/api/likes/');
    if (response.ok) {
        const data = await response.json();
        dispatch(setAllLikes(data));
    } else {
        return ['An error occurred. Please try again.'];
    };
};

export const getLike = (user_id, drawing_id) => async (dispatch) => {
    const response = await fetch(`/api/likes/${user_id}/drawing/${drawing_id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setLike(data));
    } else {
        return ['An error occurred. Please try again.'];
    };
};

export const createLike = (like) => async (dispatch) => {
    const response = await fetch('/api/likes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(like)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setLike(data));
    } else {
        return ['An error occurred. Please try again.']
    };
};

export const deleteLike = (like_id) => async (dispatch) => {
    const response = await fetch(`/api/likes/${like_id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeLike(data));
    } else {
        return ['An error occurred. Please try again.'];
    };
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_ALL_LIKES:
            return { likes: action.payload }
        case SET_LIKE:
            return { ...state, currentLike: action.payload }
        case REMOVE_LIKE:
            return { ...state, currentLike: null }
        default:
            return state
    };
};