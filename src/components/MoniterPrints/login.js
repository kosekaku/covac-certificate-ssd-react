import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { login } from '../../services/loginService';
// import useToken from '../Utils/useToken';
import { toast, ToastContainer } from 'react-toastify';




const Login = () => {
  const [token, setToken ] = useState();
  const navigate = useNavigate();

   useEffect(()=>{
    console.log('Login token...', token);
     if(!token) return console.log('can not logina dn display prints');
     navigate('/prints',{state: token});
     console.log('Login token 2...', token);
   },)
  // handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.typeEmailX.value;
    const password = e.target.typePasswordX.value;
    console.log('Login submit...', email, password);
    // call login services and submit credentails
    const { token: tokenData } = await login(email, password);
    if(!tokenData) throw Error('Error, no token available') 
   setToken({token: tokenData});
   sessionStorage.setItem('token', JSON.stringify({token: tokenData}));
    console.log('server response...', token, tokenData);
    // set tokens to sessions
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-secondary text-white"
              style={{ borderRadius: '1rem' }}
            >
              <div className="card-body p-5 text-center">
                <form className="mb-md-5 mt-md-4 pb-5" onSubmit={handleLoginSubmit}>
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login email and password!
                  </p>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typeEmailX">
                      Email
                    </label>
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      placeholder="Enter your registered email"
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typePasswordX">
                      Password
                    </label>
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                    />
                  </div>

                  {/* <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}

                  <button
                    type="submit"
                    className="btn btn-outline-light btn-lg px-5"
                  >
                    Login
                  </button>
                </form>

                {/* <div>
              <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
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
