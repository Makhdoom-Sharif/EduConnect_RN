import axios from 'axios';

export const registerUserCall = async props => {
  const { email, role, contactNo, password, username } = props;
  return await axios({
    method: 'post',
    url: 'https://educonnectbackend-production.up.railway.app/api/auth/register',
    data: { email, role, contactNo, password, username },
  });
};

export const loginUserCall = async props => {
  const { email, password } = props;
  return await axios({
    method: 'post',
    url: 'https://educonnectbackend-production.up.railway.app/api/auth/login',
    data: { email, password, },
  });
};

