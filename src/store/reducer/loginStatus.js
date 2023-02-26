const data = {
  loginStatus: false,
};

const loginStatus = (state = data, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, ...action.payload};
    default:
      return state;
  }
};
export default loginStatus;
