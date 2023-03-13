const initialState = null;


const tutorsByLocation = (state = initialState, action) => {
  console.log(action.payload, 'payload')
  switch (action.type) {
    case 'TUTORS_BY_LOCATIONS':
      return action.payload
    case 'RESET_TUTOR_LOCATION_QUERY':
      return initialState;
    default:
      return state;
  }
};
export default tutorsByLocation;
