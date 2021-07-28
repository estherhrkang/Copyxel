const SET_DRAWING = 'drawing/SET_DRAWING';
const REMOVE_DRAWING = 'drawing/REMOVE_DRAWING';

const setDrawing = (drawing) => ({
    type: SET_DRAWING,
    payload: drawing
});

const removeDrawing = (drawing) => ({
    type: REMOVE_DRAWING,
    payload: drawing
});

const initialState = { drawing: null };

export const getAllDrawings = () => async (dispatch) => {
    const response = await fetch('/api/drawings/all');
    if (response.ok) {
        const data = await response.json();
        dispatch(setDrawing(data));
    } else {
        return ['An error occurred. Please try again.']
    }
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
    const response = await fetch('/api/drawings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(drawing)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setDrawing(data));
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const editDrawing = (drawing) => async (dispatch) => {
    const response = await fetch(`/api/drawings/${drawing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(drawing)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setDrawing(data));
    } else {
        return ['An error occurred. Please try again.']
    }

};

export const deleteDrawing = (drawing) => async (dispatch) => {
    const response = await fetch(`/api/drawings/${drawing.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(drawing)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeDrawing(data));
    } else {
        return ['An error occurred. Please try again.']
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DRAWING:
            return { drawing: action.payload }
        case REMOVE_DRAWING:
            return { drawing: null }
        default:
            return state;
    };
};