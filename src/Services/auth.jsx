import {registerUserCall} from '../backenAPICalls/authAPICall';

export const signUpUser = async props => {
  const {email, role, contactNo, password, username} = props;
  await registerUserCall({email, role, contactNo, password, username});
};
