import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, Checkbox, FormBtn } from "../components/Form";
import { Form, Field } from 'react-final-form';
//import Button from 'react-bootstrap/Button';
//import Nav from "./components/Nav";

const showResults = async values => {
    //await sleep(500)
    window.alert(JSON.stringify(values, undefined, 2));
}

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
            checkboxes: []
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
            })
      };

      actuallyShowSomethingUI = res => {
            this.setState({
                  somethingInTheState: res.data.entry[0].resource.address[0].city
            })
      }

      showSomething = event => {
            event.preventDefault();

            API
                  .searchSmart()
                  .then(res => this.actuallyShowSomethingUI(res))
                  .catch(err => console.log(err));

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
                                  <h2>What does it look like?</h2>
                              </Jumbotron>
                              <Form onSubmit={showResults}>
                                          {({handleSubmit, values}) => {
                                    return <form onSubmit={handleSubmit}>
                                        <div>
                                            <label> First Name  </label>
                                            <Field name="firstName" component="input" placeholder="First Name" validate={value => (value ? undefined : "Required")} />
                                        </div>
                                        <button type="submit">Submit</button>
                                        <pre>{JSON.stringify(values, undefined, 2)}</pre>
                                    </form>;
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
                                          <Checkbox value="Given Name">
                                                Given Name
                                          </Checkbox>
                                          <Checkbox>
                                                Family Name
                                          </Checkbox>
                                          <Checkbox>
                                                Phone Number
                                          </Checkbox>
                                          <Checkbox>
                                                Gender
                                          </Checkbox>
                                          <Checkbox>
                                                Birthdate
                                          </Checkbox>
                                          <FormBtn
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
                                          </FormBtn>

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
                                                                  <h2>Raw Response</h2>
                                                            </Jumbotron>
                                                      </Col>
                                                      <Col size="md-6">
                                                            <Jumbotron>
                                                                  <h2>Discreet Response</h2>
                                                            </Jumbotron>

                                                            <List>
                                                                  <ListItem key={this.state.somethingInTheState._id}>
                                                                        <Link to={"/books/" + this.state.somethingInTheState._id}>
                                                                              <strong>
                                                                                    {this.state.somethingInTheState} by {this.state.somethingInTheState}
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
                                                                  )}
                                                      </Col>
                                                </Row>
                                          </Col>
                                    </Row>
                              </Col>
                        </Row>
                  </Container >
            );
      }
}

export default Books;
