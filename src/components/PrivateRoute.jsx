import React from "react";
import AuthContext from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute() {
  return (
    <AuthContext.Consumer>
      {({ user }) => {
        return user ? <Outlet /> : <Navigate to="/login" />;
      }}
    </AuthContext.Consumer>
  );
}

export default PrivateRoute;
