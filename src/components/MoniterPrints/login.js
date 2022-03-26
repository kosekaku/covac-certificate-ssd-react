import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { login } from '../../services/loginService';
// import useToken from '../Utils/useToken';
import { toast, ToastContainer } from 'react-toastify';
import { renderButton, renderInput } from '../Helpers/renderFormFields';
import { InputText } from '../commons/input';

const Login = () => {
  const [token, setToken] = useState();
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const { token: tokenData } = await login(email, password);
      if (!tokenData) setLoginError(true);
      setToken({ token: tokenData });
      sessionStorage.setItem('token', JSON.stringify({ token: tokenData }));
      navigate('/prints', { state: token });
    } catch (error) {
      toast.error('Login failed, provide correct username and passowrd');
      setLoginError(true);
    }
  };

  const renderLoginInputs = (
    name,
    label,
    placeHolder,
    type = 'text',
    ...rest
  ) => {
    return (
      <InputText
        name={name}
        label={label}
        placeHolder={placeHolder}
        type={type}
      />
    );
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 w-50">
            <div
              className="card bg-secondary text-white"
              style={{ borderRadius: '1rem' }}
            >
              <div className="card-body p-5 text-center">
                <form
                  className="mb-md-5 mt-md-4 pb-5"
                  onSubmit={handleLoginSubmit}
                >
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login email and password!
                  </p>
                  {renderLoginInputs(
                    'email',
                    'Email',
                    'Enter valid username',
                    'email'
                  )}
                  {renderLoginInputs(
                    'password',
                    'Password',
                    'Enter password',
                    'password'
                  )}

                  <div className="d-flex justify-content-center align-items-center bg-secondary ">
                    {renderButton('Login')}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export { Login };
