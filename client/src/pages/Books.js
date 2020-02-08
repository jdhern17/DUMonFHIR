import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { FormBtn } from "../components/Form";
import { Form, Field } from "react-final-form";

class Books extends Component {
  state = {
    //books: [],
    //bookResults: [],
    somethingInTheState: [],
    //title: "",
    //author: "",
    //synopsis: "",
    //titleToSave: "",
    //authorToSave: "",
    //checkboxes: [],
    searchValues: {}
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (bookResult, event) => {
    event.preventDefault();
    // this.setState({
    // 	titleToSave: bookResult.title,
    // 	authorToSave: bookResult.author
    // })

    if (bookResult.title && bookResult.author) {
      // only saves the title author and synopsis fields to send
      API.saveBook({
        title: bookResult.title,
        author: bookResult.author
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  actuallyShowSomethingUI = res => {
    this.setState({
      somethingInTheState: res.data.entry
    });
  };

  showResults = values => {
    window.alert(JSON.stringify(values, undefined, 2));
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
              <Link to={"../Searchers"}>Next</Link>
            </FormBtn>
            <FormBtn>
              <Link to={"../Quizpage"}>Back</Link>
            </FormBtn>
          </div>
        </Row>
        <Row>
          <Col size="md-2"></Col>
          <Col size="md-4">
            <Jumbotron>
              <h3>What are FHIR and JSON?</h3>
            </Jumbotron>
            <p>
              FHIR stands for Fast Healthcare Interoperability Resources and is
              an interface messaging standard published in 2014 as a way to push
              healthcare towards RESTful architectures that leveraged the latest
              web standards such as JSON, HTTP, OAuth and REST.
            </p>
            <p>
              JSON is the preferred messaging format for FHIR which would
              replace message formats such as HL7v2 and HL7v3/CCDA.
            </p>
          </Col>
          <Col size="md-4">
            <Jumbotron>
              <h3>Build a JSON interface message!</h3>
            </Jumbotron>
            <Form onSubmit={this.showResults}>
              {({ handleSubmit, values }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <div>
                        <label>First Name</label>
                        <Field
                          name="firstName"
                          component="input"
                          placeholder="First Name"
                        />
                      </div>
                      <div>
                        <label>Last Name</label>
                        <Field
                          name="lastName"
                          component="input"
                          placeholder="Last Name"
                        />
                      </div>
                      <div>
                        <label>Gender</label>
                        <Field
                          name="gender"
                          component="input"
                          placeholder="Gender"
                        />
                      </div>
                      <div>
                        <label>Birthdate</label>
                        <Field
                          name="birthdate"
                          component="input"
                          placeholder="Birthdate"
                        />
                      </div>
                    </div>
                    <pre>{JSON.stringify(values, undefined, 2)}</pre>
                  </form>
                );
              }}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
