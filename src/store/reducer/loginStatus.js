const data = {
  accessToken: null,
  contactNo: null,
  email: null,
  name: null,
  role: null,
  userID: null
};
const initialState = {};


const loginStatus = (state = data, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
export default loginStatus;
