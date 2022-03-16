import { useQuery } from 'react-query';
import http from './httpServices';

const login = async (
  email, password
) => {
try {

const urlLogin = 'http://localhost:8000/api/v1/login';
const results = await http.post(urlLogin,{
  email,
  password
});
if(!results && !results.data.data) throw new  Error('Error login failed');
const {status, message, data} = results.data;

if(status!== 200) throw new  Error('Error login failed');
return data;

} catch (error) {
console.log('Error, login failed, please provide correct creentials', error)
}
};

export { login };