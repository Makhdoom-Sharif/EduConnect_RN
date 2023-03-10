const initialState = null;


const tutorsByLocation = (state = initialState, action) => {
  console.log(action.payload, 'payload')
  switch (action.type) {
    case 'TUTORS_BY_LOCATIONS':
      return action.payload
    default:
      return state;
  }
};
export default tutorsByLocation;
