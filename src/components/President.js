import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styled from "styled-components";

const Tag = styled.div`
  background-color: black;
  color: white;
  font-size: 14px;
  display: inline;
  width: auto;
  padding: 4px 5px;
  border-radius: 5px;
  margin: 10px 5px;
`;

export class President extends Component {
  render() {
    return (
  
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.picture} />
        <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Text>
            {this.props.description}
            </Card.Text>
            <Button variant="primary">Vote For {this.props.name} </Button>
        </Card.Body>
        </Card>



    );
  }
}

export default President;
