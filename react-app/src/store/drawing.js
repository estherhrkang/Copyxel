const SET_ALL_DRAWINGS = 'drawing/SET_ALL_DRAWINGS';
const SET_DRAWING = 'drawing/SET_DRAWING';
const REMOVE_DRAWING = 'drawing/REMOVE_DRAWING';

const setAllDrawings = (drawings) => ({
    type: SET_ALL_DRAWINGS,
    payload: drawings
});

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
    const response = await fetch('/api/drawings/');
    if (response.ok) {
        const data = await response.json();
        dispatch(setAllDrawings(data.drawings));
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
    const response = await fetch('/api/drawings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(drawing)
    });
    console.log('what is response?', response);
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
        const data = await response.json();
        console.log('checking what is in data', data)
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
        case SET_ALL_DRAWINGS:
            return { drawings: action.payload }
        case SET_DRAWING:
            return { ...state, currentDrawing: action.payload }
        case REMOVE_DRAWING:
            return { ...state, currentDrawing: null }
        default:
            return state;
    };
};