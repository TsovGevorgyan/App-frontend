import axios from 'axios';
const token = localStorage.getItem('accessToken');
const headers = {
  'Access-Control-Allow-Origin': '*',
};
if (token) {
  headers.authorization = `Bearer ${token}`;
}
const instance = axios.create({
  headers,
});
console.log(instance);
export default instance;
