import {loginUserCall, registerUserCall} from '../backenAPICalls/authAPICall';

export const signUpUser = async props => {
  const {email, role, contactNo, password, username} = props;
  return await registerUserCall({email, role, contactNo, password, username});
};

export const loginUser = async props => {
  const {email, role, contactNo, password, username} = props;
  return await loginUserCall({email, role, contactNo, password, username});
};
