import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import AuthContext from "../AuthContext";

function SecureRoute({ component: Component, scopes, ...rest }) {
  return (
    <AuthContext.Consumer>
      {auth => (
        <Route
          {...rest}
          render={props => {
            if (!auth.isAuthenticated()) {
              return auth.login();
            }

            if (scopes.length > 0 && !auth.userHasScopes(scopes)) {
              return (
                <h1>
                  żeby widzieć te strone pocza ci te skopy: {scopes.join(" ")}
                </h1>
              );
            }

            return <Component auth={auth} {...props} />;
          }}
        />
      )}
    </AuthContext.Consumer>
  );
}

SecureRoute.propTypes = {
  component: PropTypes.func.isRequired,
  scopes: PropTypes.array
};

SecureRoute.defaultProps = {
  scopes: []
};

export default SecureRoute;
