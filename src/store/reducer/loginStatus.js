const data = {
  accessToken: null,
  contactNo: null,
  email: null,
  name: null,
  role: null,
  userID: null
};

const loginStatus = (state = data, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default loginStatus;
