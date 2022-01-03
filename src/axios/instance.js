import axios from 'axios';
const token = localStorage.getItem('accessToken');
const headers = {
  'Access-Control-Allow-Origin': '*',
};
if (token) {
  headers.Authorization = `Bearer ${token}`;
}
const instance = axios.create({
  headers,
});

export default instance;
