const TIME_CLOCK = 'time/TIME_CLOCK';

const timePasses = () => ({
    type: TIME_CLOCK
});

export const reduceTime = (time) => async (dispatch) => {
    if (time === 0) return;
    const sleep = () => new Promise(res => setTimeout(() => {
        res('time passes');
    }, 1000));
    await sleep();
    dispatch(timePasses()); 
};

const initialState = 10

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TIME_CLOCK:
      return state-1;
    default:
      return state;
  };
};
