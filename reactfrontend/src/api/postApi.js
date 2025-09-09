
import axios from 'axios';

const postApi = axios.create({
  baseURL: 'http://localhost:3000/cache', 
});

export default postApi;
