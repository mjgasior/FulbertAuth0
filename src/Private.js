import React, { Component } from "react";

class Private extends Component {
  state = {
    message: ""
  };

  async componentDidMount() {
    const response = await fetch("/private", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    });
    if (response.ok) {
      const result = await response.json();
      this.setState({ message: result.message });
      return;
    }
    throw new Error("Netzwerk achtung");
  }
  render() {
    return <p>{this.state.message}</p>;
  }
}

export default Private;
