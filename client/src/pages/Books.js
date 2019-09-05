import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, Checkbox, FormBtn, TextArea } from "../components/Form";
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
          <Col size="md-12">
            <Jumbotron>
              <h1>Welcome to DUMonFHIR!</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h2>What are FHIR and JSON?</h2>
            </Jumbotron>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h2>Design your own FHIR-Adherent interface message!</h2>
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
        <Row>
          <Col size="md-2">
            <Jumbotron>
              <h2>Search FHIR API</h2>
            </Jumbotron>
            <h4>Summary Search</h4>
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

                      {/*  <Field name="submit" type="submit" onClick={this.showSomething}/>
                                       <FormBtn onClick={this.showSomething} type="submit">
                                         <button type="submit">Submit</button>
                                        Submit
                                        </FormBtn> */}
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
          <Col size="md-10">
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
                      <h2>Discreet Response</h2>
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

                    {/* <List>
                      <ListItem key={this.state.somethingInTheState._id}>
                        <Link
                          to={"/books/" + this.state.somethingInTheState._id}
                        >
                          <strong>
                            {this.state.somethingInTheState} by{" "}
                            {this.state.somethingInTheState}
                          </strong>
                        </Link>
                        <DeleteBtn
                          onClick={() =>
                            this.deleteBook(this.state.somethingInTheState._id)
                          }
                        />
                        <FormBtn
                          onClick={e =>
                            this.handleFormSubmit(
                              this.state.somethingInTheState,
                              e
                            )
                          }
                        >
                          Save Book
                        </FormBtn>
                      </ListItem>
                    </List> */}

                    {/* {this.state.somethingInTheState.length ? (
                      <ul>
                        {[...Array(10)].map(testLocations => (
                          <li>{testLocations}</li>
                        ))}
                      </ul>
                    ) : (
                      "falsely"
                    )} */}

                    {/* <List>
                                                                  <ListItem key={this.state.somethingInTheState._id}>
                                                                        <Link to={"/books/" + this.state.somethingInTheState._id}>
                                                                              <strong>
                                                                                    {this.state.somethingInTheState}
                                                                              </strong>
                                                                        </Link>
                                                                        <DeleteBtn onClick={() => this.deleteBook(this.state.somethingInTheState._id)} />
                                                                        <FormBtn
                                                                              onClick={(e) => this.handleFormSubmit(this.state.somethingInTheState, e)}
                                                                        >
                                                                              Save Book
                                                                        </FormBtn>
                                                                  </ListItem>
                                                            </List>
                                                            {this.state.bookResults.length ? (
                                                                  <List>
                                                                        {this.state.bookResults.map(bookResult => (
                                                                              <ListItem key={bookResult._id}>
                                                                                    <Link to={"/books/" + bookResult._id}>
                                                                                          <strong>
                                                                                                {bookResult.title} by {bookResult.author}
                                                                                          </strong>
                                                                                    </Link>
                                                                                    <DeleteBtn onClick={() => this.deleteBook(bookResult._id)} />
                                                                                    <FormBtn
                                                                                          //disabled={!(this.state.author && this.state.title)}
                                                                                          onClick={(e) => this.handleFormSubmit(bookResult, e)}
                                                                                    >
                                                                                          Save Book
                                                            </FormBtn>
                                                                              </ListItem>
                                                                        ))}
                                                                  </List>
                                                            ) : (
                                                                        <h3>No Results to Display</h3>
                                                                  )} */}
                  </Col>
                  <Col size="md-6">
                    <Jumbotron>
                      <h2>Raw Response</h2>
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
