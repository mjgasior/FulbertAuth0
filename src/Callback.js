import React, { Component } from "react";

class Callback extends Component {
  componentDidMount() {
    if (/acces_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("invalid callback URL");
    }
  }

  render() {
    return <h1>Ładowanie...</h1>;
  }
}

export default Callback;
