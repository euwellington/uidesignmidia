import React from "react";
import { Route, Redirect } from "react-router-dom";
import { DetalInfo } from "./auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = DetalInfo();
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/acess-login-admin"} />
        )
      }
    />
  );
};

export default PrivateRoute;