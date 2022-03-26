import http from './httpServices';
import { loginURL } from '../components/constants/apiURL';

const login = async (email, password) => {
  try {
    const results = await http.post(loginURL, {
      email,
      password,
    });
    if (!results && !results.data.data) throw new Error('Error login failed');
    const { status, message, data } = results.data;

    if (status !== 200) throw new Error('Error login failed');
    return data;
  } catch (error) {
    //
  }
};

export { login };
