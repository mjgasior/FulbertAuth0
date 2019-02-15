import React, { Component } from "react";

class Public extends Component {
  state = {
    message: ""
  };

  async componentDidMount() {
    const response = await fetch("/public");
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

export default Public;
