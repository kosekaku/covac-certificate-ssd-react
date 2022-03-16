import axios from 'axios';
import {toast} from 'react-toastify';

// TODO http service handler for all services wrapping axios use
// then import the file into services for use ie
// import http from './httpServices';
//await http.post(url',data);


// handle unexpected errors globally using axios interceptors
axios.interceptors.response.use(null, error => {
  console.log("axios interceptor starting..");
  const expectedErrors = error.response && error.response.status>=400 && error.response.status<500;
  
  if(expectedErrors){
    console.log("axios interceptot",error.response.status,error.response.data.error );
    console.log(error.message);
    toast.error(error.response.data.error );
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

