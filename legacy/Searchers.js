import React, { Component } from "react";
//import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
//import { Input, Checkbox, FormBtn, TextArea } from "../components/Form";
import { FormBtn } from "../components/Form";
import { Form, Field } from "react-final-form";
//import Button from 'react-bootstrap/Button';
//import Nav from "./components/Nav";

class Books extends Component {
  state = {
    books: [],
    bookResults: [],
    somethingInTheState: [],
    title: "",
    author: "",
    synopsis: "",
    titleToSave: "",
    authorToSave: "",
    checkboxes: [],
    searchValues: {}
  };

  componentDidMount() {
    this.loadBooks();
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
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

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        // clears the visible form fields
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  handleBookSearch = event => {
    event.preventDefault();
    if (this.state.title) {
      API.searchBook({
        title: this.state.title
      })
        .then(res => this.loadBookResults(res))
        .catch(err => console.log(err));
    }
  };

  loadBookResults = res => {
    this.setState({
      bookResults: res.data.articles,
      title: "",
      author: "",
      synopsis: ""
    });
  };

  actuallyShowSomethingUI = res => {
    this.setState({
      somethingInTheState: res.data.entry
    });
  };

  //      somethingInTheState: res.data.entry[0].resource.address[0].city

  // showSomething = event => {
  // };

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
              {/* <FormBtn
                                                //disabled={!(this.state.title)}
                                                onClick={this.showSomething}
                                          >
                                                Summary Search
                                          </FormBtn>
                                          <Input
                                                value={this.state.title}
                                                onChange={this.handleInputChange}
                                                name="title"
                                                placeholder="Title (required)"
                                          />
                                          <Input
                                                value={this.state.author}
                                                onChange={this.handleInputChange}
                                                name="author"
                                                placeholder="Author (required)"
                                          />
                                          <FormBtn
                                                disabled={!(this.state.title)}
                                                onClick={this.handleBookSearch}
                                          >
                                                Search Book
                                          </FormBtn>
                                          <FormBtn
                                                //disabled={!(this.state.title)}
                                                onClick={this.showSomething}
                                          >
                                                do something
                                          </FormBtn> */}
            </form>
          </Col>
          <Col size="md-6">
            {/* <Row>
                                          <Col size="md-12">
                                                <Jumbotron>
                                                      <h1>Create your own JSON FHIR Message!</h1>
                                                </Jumbotron>
                                                {this.state.books.length ? (
                                                      <List>
                                                            {this.state.books.map(book => (
                                                                  <ListItem key={book._id}>
                                                                        <Link to={"/books/" + book._id}>
                                                                              <strong>
                                                                                    {book.title} by {book.author}
                                                                              </strong>
                                                                        </Link>
                                                                        <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                                                  </ListItem>
                                                            ))}
                                                      </List>
                                                ) : (
                                                            <h3>No Results to Display</h3>
                                                      )}
                                          </Col>
                                    </Row> */}
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
