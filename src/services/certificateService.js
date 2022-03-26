import http from './httpServices';
import {
  teiURL,
  postPrintsURL,
  printsURL,
} from '../components/constants/apiURL';
import { toast } from 'react-toastify';

// get tracked entity instance
const certificateTEI = async (phoneEntered, uniqueId) => {
  try {
    const results = await http.get(teiURL, {
      params: {
        phone: phoneEntered,
        uniqueId: uniqueId,
      },
    });
    if (!results && !results.data.data) return undefined;
    const { status, data } = results.data;
    if (status !== 200) return undefined;

    return data;
  } catch (error) {
    // TODO, BUG when toast is used, taost id get logged...
    //return toast.error('something went wrong', error)
  }
};

// send printed certificate data to server for tracking
const postPrints = async (data1) => {
  const url = postPrintsURL;
  const results = await http.post(url, data1);
  if (!results && !results.data.data) return toast('Error login failed');
  const { status, message, data } = results.data;
  if (status !== 200) return toast('Error login failed');
  return message;
};

// prints monitering
const printsMoniter = async (token) => {
  const url = printsURL;
  try {
    const { status, message, data } = await http.get(url, {
      headers: { 'x-auth-token': `Bearer ${token}` },
    });
    if (status !== 200) return toast('Session Expired, please login again');
    return data.data;
  } catch (error) {
    //return toast('Session Expired, please login again');
  }
};

export { certificateTEI, postPrints, printsMoniter };
