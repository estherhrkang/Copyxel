const SET_COLOR = 'canvas/SET_COLOR';
const SET_PIXEL = 'canvas/SET_PIXEL';

const setColor = (color) => ({
    type: SET_COLOR,
    payload: color
});

const setPixel = (pixel) => ({
    type: SET_PIXEL,
    payload: pixel
});

// thunk







const initialState = { canvas: null };

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_COLOR:
            newState = { ...state }
            newState['color'] = action.payload
            return newState;
        case SET_PIXEL:
            newState = { ...state }
            newState['pixel'] = action.payload
            return newState;
        default:
            return state;
    }
}
