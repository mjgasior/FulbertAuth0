import React, { PureComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Card = styled.div`
  border: solid 1px red;
  border-radius: 2px;
  margin: 5px;
`;

class Table extends PureComponent {
  state = {
    users: []
  };

  async componentDidMount() {
    const response = await fetch("/delay");
    const { users } = await response.json();
    this.setState({ users: users.items });
  }

  render() {
    return (
      <Container>
        {this.state.users.map(({ name, index }) => (
          <Card key={name + index}>{name}</Card>
        ))}
      </Container>
    );
  }
}

export default Table;
