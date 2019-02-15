import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Main from "./positioning/Main";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import SecureRoute from "./Auth/SecureRoute";
import AuthContext from "./AuthContext";
import PublicRoute from "./Auth/PublicRoute";
import Delay from "./delay/Delay";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      tokenRenewalComplete: false
    };
  }

  componentDidMount() {
    this.state.auth.renewToken(() =>
      this.setState({ tokenRenewalComplete: true })
    );
  }

  render() {
    const { auth, tokenRenewalComplete } = this.state;
    if (!tokenRenewalComplete) {
      return "Ładowanie!";
    }
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <PublicRoute path="/" exact component={Home} />
        <Route path="/delay" component={Delay} />
        <Route path="/main" component={Main} />
        <Route path="/public" component={Public} />
        <SecureRoute path="/private" component={Private} auth={auth} />
        <SecureRoute
          path="/courses"
          component={Courses}
          scopes={["read:courses"]}
          auth={auth}
        />
        <PublicRoute path="/callback" component={Callback} />
        <SecureRoute path="/profile" component={Profile} auth={auth} />
      </AuthContext.Provider>
    );
  }
}

export default App;
