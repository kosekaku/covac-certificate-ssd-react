import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../header';
import { printsMoniter } from '../../services/certificateService';
const MoniterDashboard = () => {
  const [printCounts, setPrintCounts] = useState(0);
  const [rePrintCounts, setRePrintCounts] = useState(0);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    // call api to get users and counts
    try {
      const tokenStored = JSON.parse(sessionStorage.getItem('token'));
      if (!tokenStored) return setToken(null);
      setToken(tokenStored.token);
      // check if user is logined
      const getData = async () => {
        if (!token) return null;
        const data = await printsMoniter(token);
        if (data === undefined) {
          return toast('Acces denied, session expired, login again');
          //navigate('/login');
        }
        const prints = data.map((user) => user.print_count);
        const reprints = prints.reduce(
          (previousValue, currentValue) => previousValue + currentValue
        );
        // set users state
        setUsers(data);
        setPrintCounts(users.length);
        setRePrintCounts(reprints);
      };
      getData();
    } catch (error) {
      toast('Acces denied');
    }
  }, [users.length, token]);

  return (
    <>
      {token === null && navigate('/login')}
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
                <p className="card-text">{printCounts}</p>
              </div>
            </div>

            <div
              className="card border-info mb-3 text-center"
              style={{ maxWidth: '10rem' }}
            >
              <div className="card-header">REPRINTS</div>
              <div className="card-body text-info">
                <p className="card-text">{rePrintCounts}</p>
              </div>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              {/* <caption>List of users</caption> */}

              <tr>
                <th>#</th>
                <th>Unique Id</th>
                <th>Full Name</th>
                <th>Occupation</th>
                <th>Address</th>
                <th>Print date</th>
                <th>Reprints</th>
              </tr>
              <>
                {users.length !== 0 &&
                  users.map((user, index) => {
                    const {
                      user_id,
                      full_name,
                      occupation,
                      address,
                      dob,
                      printed_on,
                      print_count,
                      reprinted_on,
                    } = user;
                    return (
                      <tr key={user_id} id="userData">
                        <td>{index}</td>
                        <td>{user_id}</td>
                        <td>{full_name}</td>
                        <td>{occupation}</td>
                        <td>{address}</td>
                        <td>{printed_on}</td>
                        <td>{print_count}</td>
                      </tr>
                    );
                  })}
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
