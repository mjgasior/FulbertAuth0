import React from "react";
import { Route } from "react-router-dom";
import AuthContext from "../AuthContext";
import PropTypes from "prop-types";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {auth => (
        <Route
          {...rest}
          render={props => <Component {...props} auth={auth} />}
        />
      )}
    </AuthContext.Consumer>
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default PublicRoute;
