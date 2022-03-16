import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    //const userToken = JSON.parse(tokenString);
    return tokenString?.token
  };
  const [token, setToken] = useState(getToken());


  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    return setToken(userToken.token);
  };
  console.log('Getting token from session', token);

  return {
    setToken: saveToken,
    token
  }
}
