import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { FormBtn } from "../components/Form";
import { Form, Field } from "react-final-form";

class Books extends Component {
  state = {
    somethingInTheState: [],
    searchValues: {}
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  actuallyShowSomethingUI = res => {
    this.setState({
      somethingInTheState: res.data.entry
    });
  };

  showResults = values => {
    //window.alert(JSON.stringify(values, undefined, 2));
    console.log(values);
    this.setState({
      searchValues: values
    });
    //event.preventDefault();
    API.searchSmart()
      .then(res => this.actuallyShowSomethingUI(res))
      .catch(err => console.log(err));
    //await sleep(500)
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-2"></Col>
          <Col size="md-8">
            <Jumbotron>
              <h1>Welcome to DUMonFHIR!</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <div className="mx-auto">
            <FormBtn>
              <Link to={"../"}>Next</Link>
            </FormBtn>
            <FormBtn>
              <Link to={"../Books"}>Back</Link>
            </FormBtn>
          </div>
        </Row>
        <Row>
          <Col size="md-2"></Col>
          <Col size="md-2">
            <Jumbotron>
              <h3>Search FHIR API</h3>
            </Jumbotron>
            <h3>Summary Search</h3>
            <form>
              <Form onSubmit={this.showResults}>
                {({ handleSubmit, values }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <div>
                        <div>
                          <Field
                            name="firstName"
                            type="checkbox"
                            component="input"
                            placeholder="First Name"
                          />
                          <label>First Name</label>
                        </div>
                        <div>
                          <Field
                            name="lastName"
                            type="checkbox"
                            component="input"
                            placeholder="Last Name"
                          />
                          <label>Last Name</label>
                        </div>
                        <div>
                          <Field
                            name="gender"
                            type="checkbox"
                            component="input"
                            placeholder="Gender"
                          />
                          <label>Gender</label>
                        </div>
                        <div>
                          <Field
                            name="birthdate"
                            type="checkbox"
                            component="input"
                            placeholder="Birthdate"
                          />
                          <label>Birthdate</label>
                        </div>
                      </div>
                      <button type="submit">Submit</button>
                    </form>
                  );
                }}
              </Form>
            </form>
          </Col>
          <Col size="md-6">
            <Row>
              <Col size="md-12">
                <Row>
                  <Col size="md-6">
                    <Jumbotron>
                      <h3>Discrete Response</h3>
                    </Jumbotron>
                    {this.state.somethingInTheState.length ? (
                      <List>
                        {this.state.somethingInTheState.map(testLocations => (
                          <ListItem>
                            {this.state.searchValues.firstName
                              ? testLocations.resource.name[0].given[0].toString()
                              : " "}{" "}
                            {this.state.searchValues.lastName
                              ? testLocations.resource.name[0].family.toString()
                              : " "}{" "}
                            {this.state.searchValues.gender
                              ? testLocations.resource.gender.toString()
                              : " "}{" "}
                            {this.state.searchValues.birthdate
                              ? testLocations.resource.birthDate.toString()
                              : " "}
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <p>Select Search Criteria</p>
                    )}
                  </Col>
                  <Col size="md-6">
                    <Jumbotron>
                      <h3>Full FHIR Response</h3>
                    </Jumbotron>

                    {this.state.somethingInTheState.length ? (
                      <List>
                        <ListItem>
                          {JSON.stringify(this.state.somethingInTheState, 4)}
                        </ListItem>
                      </List>
                    ) : (
                      <p>Select Search Criteria</p>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
