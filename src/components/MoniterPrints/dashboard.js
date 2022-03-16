import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../header';
import useToken from '../Utils/useToken';

const MoniterDashboard = () => {
  const [printCounts, setPrintCounts] = useState(0);
  const [rePrintCounts, setRePrintCounts] = useState(0);
  const [users, setUsers] = useState([]);
  const [token, setToken]  = useState();
  const [printErrors, setprintErrors] = useState();
  // const { token, setToken } = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    // call api to get users and counts
    const url = 'http://localhost:8000/api/v1/teis/prints';
    const tokenStored = JSON.parse(sessionStorage.getItem('token'));
    if(!tokenStored) return setToken(null);
    //const {token: token} =tokenStored;
    setToken(tokenStored.token);
    console.log('Tokens to login222', token);
    // check if user is logined
   
    const getData = async () => {
      if(!token) return null;
      //if(token===null) return navigate(-1);

      const {status, message, data: response} = await axios.get(url,{
        headers: {'x-auth-token': `Bearer ${token}`}
      });
      if(status!==200) return toast(message);
      const {data} = response;
      const prints = data.map((user) => user.print_count);
      const reprints = prints.reduce((previousValue, currentValue)=> previousValue+currentValue);
      // set users state
      setUsers(data);
      setPrintCounts(users.length);
      setRePrintCounts(reprints);
    };
    getData();
  }, [users.length, token]);

  console.log('Hello world dashboards', token);
  return (
    <>{
      token===null && navigate('/login') 
}
    <div className="card bg-light text-dark " style={{ height: '100vh' }}>
      <Header />
      <div className="card-body   ">
        <div className="card-group d-flex justify-content-end ">
          <div
            className="card border-secondary mb-3 text-center"
            style={{ maxWidth: '10rem' }}
          >
            <div className="card-header">PRINTS</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Total Prints</h5> */}
              <p className="card-text">{printCounts}</p>
            </div>
          </div>

          <div
            className="card border-info mb-3 text-center"
            style={{ maxWidth: '10rem' }}
          >
            <div className="card-header">REPRINTS</div>
            <div className="card-body text-info">
              {/* <h5 className="card-title">Total Prints</h5> */}
              <p className="card-text">{rePrintCounts}</p>
            </div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            {/* <caption>List of users</caption> */}

            <tr>
              <th>Unique Id</th>
              <th>Full Name</th>
              <th>Occupation</th>
              <th>Address</th>
              <th>Print date</th>
              <th>Reprints</th>
            </tr>
            <>
            {
              users.length!==0 && (
                users.map((user, index)=> {
                  const {
                    user_id, full_name,occupation, address,dob,printed_on, print_count, reprinted_on
                  } = user;
                  return <tr key={user_id} id="userData">
                    <td>{index}</td>
                    <td>{user_id}</td>
                    <td>{full_name}</td>
                    <td>{occupation}</td>
                    <td>{address}</td>
                    <td>{printed_on}</td>
                    <td>{print_count}</td>
                    </tr>
                })
              )
            }
            </>
          </table>
        </div>
      </div>
    </div>
    <ToastContainer
        position="top-center"
        //autoClose={loadingTime}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
    
  );
};

export default MoniterDashboard;
