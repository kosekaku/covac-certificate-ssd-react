import React from "react";
import {   Routes, Route, Outlet } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router';

function ProtectedRoute({ element: Component, ...restOfProps }) {
  const tokenStored = JSON.parse(sessionStorage.getItem('token'));
  // if(!tokenStored) return setToken(null);
  console.log("token is available.....", tokenStored, restOfProps );


  return (
    
    tokenStored!==null ?  <Outlet /> : <Navigate to="/login" />
    // <Route
    //   {...restOfProps}
    //   render={(props) =>
    //     tokenStored && tokenStored.token!==null ?  <Outlet /> : navigate('/login')
    //   }
    // />
  
  );
}

export default ProtectedRoute;
