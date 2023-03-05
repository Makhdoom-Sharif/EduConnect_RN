import axios from 'axios';

export const getCourses = async (headers) => {
  return await axios({
    method: 'get',
    url: 'https://educonnectbackend-production.up.railway.app/api/courses',
    headers: headers
  });
};
