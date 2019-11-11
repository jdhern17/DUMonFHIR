import React, { Component } from "react";
//import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
//import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
//import { Input, TextArea, FormBtn } from "../components/Form";
//import Button from 'react-bootstrap/Button';

class Jump extends Component {
  state = {
    occupation: "",
    email: ""
  };

  componentDidMount() {}

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleUserGo = event => {
    event.preventDefault();
    if (this.state.email) {
      API.saveUser({
        occupation: this.state.occupation,
        email: this.state.email
      }).catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-2"></Col>
          <Col size="md-8">
            <Jumbotron>
              <h1>Welcome to DUMonFHIR</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-4"></Col>
          <Col size="md-4">
            <form>
              <Input
                value={this.state.occupation}
                onChange={this.handleInputChange}
                name="occupation"
                placeholder="occupation (optional)"
              />
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="email (required)"
              />
              <FormBtn onClick={this.handleUserGo}>
                <Link to={"/Quizpage"} disabled={!this.state.email}>
                  GO!
                </Link>
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Jump;
