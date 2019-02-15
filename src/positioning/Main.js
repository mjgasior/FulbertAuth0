import React, { Component } from "react";
import "./main.css";

class Main extends Component {
  render() {
    return (
      <>
        <div className="box blueBox" />
        <div className="box greenBox" />
        <div className="container">
          <div className="box purpleBox"/>
        </div>
        <h1>Understanding CSS positiononin</h1>
        <p>
          <em>Fixed positionim</em> &rsquo;fixes&lsquo; the position of an
          element relative to browser window
        </p>
      </>
    );
  }
}

export default Main;
