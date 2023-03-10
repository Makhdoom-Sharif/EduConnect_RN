const initialState = false;


const refresh = (state = initialState, action) => {
  switch (action.type) {
    case 'REFRESH':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default refresh;
