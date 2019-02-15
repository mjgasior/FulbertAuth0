import React, { Component } from "react";

class Courses extends Component {
  state = {
    courses: []
  };

  async componentDidMount() {
    const response = await fetch("/course", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    });
    if (response.ok) {
      const result = await response.json();
      this.setState({ courses: result.courses });
    } else {
      throw new Error("Netzwerk achtung");
    }

    const resp2 = await fetch("/admin", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    });
    if (resp2.ok) {
      const result = await resp2.json();
      console.log(result);
    } else {
      throw new Error("Netzwerk achtung");
    }
  }
  
  render() {
    return (
      <p>
        {this.state.courses.map(course => (
          <li key={course.id}>{course.title}</li>
        ))}
      </p>
    );
  }
}

export default Courses;
