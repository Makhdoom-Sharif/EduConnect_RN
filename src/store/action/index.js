export const login = data => {
  return {
    type: 'LOGIN',
    payload: data,
  };
};
export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};
export const refresh = data => {
  return {
    type: 'REFRESH',
    payload: data,
  };
};
export const tutorsByLocation = data => {
  return {
    type: 'TUTORS_BY_LOCATIONS',
    payload: data,
  };
};

export const resetTutorLocationQuery = data => {
  return {
    type: 'RESET_TUTOR_LOCATION_QUERY',
    payload: data,
  };
};

