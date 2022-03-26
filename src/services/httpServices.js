import axios from 'axios';
import {toast} from 'react-toastify';

// handle unexpected errors globally using axios interceptors
axios.interceptors.response.use(null, error => {
  // return toast.error('not found');
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

