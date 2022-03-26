import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ComponentToPrint } from './components/Certificate/main';
import VerifyCertificate from './components/Certificate/verifyCertificate';
import MoniterDashboard from './components/MoniterPrints/dashboard';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Login } from './components/MoniterPrints/login';
import ProtectedRoute from './components/Utils/protectedRoute';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes basename="/">
        <Route exact path="/" name="Home" element={<App />} />
        <Route
          exact
          path="/print"
          name="PrintCerti"
          element={<ComponentToPrint />}
        />
        <Route
          exact
          path="/print/verify"
          name="VerifyCerti"
          element={<VerifyCertificate />}
        />
      
        <Route exact path="/login" name="Login" element={<Login />} />
        <Route
          exact
          path="/logout"
          name="Home"
          element={<MoniterDashboard />}
        />
        <Route path="*" name="Home" element={<App />} />
        {/* <ProtectedRoute exact path="/prints" name="Dashboard" element={ <MoniterDashboard/>}/> */}
        <Route exact path="/prints" element={<ProtectedRoute />}>
          <Route exact path="/prints" element={<MoniterDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
