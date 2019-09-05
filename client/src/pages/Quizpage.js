import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, Checkbox, FormBtn, TextArea } from "../components/Form";
import { Form, Field } from "react-final-form";
import Quiz from "react-quiz-component";
import { quiz } from "./quiz";

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
              <Link to={"../Books"}>Back</Link>
            </FormBtn>
          </div>
        </Row>
        <Row>
          <Col size="md-4"></Col>
          <Col size="md-4">
            <Jumbotron>
              <h4>Interface Knowledge Assessment!</h4>
            </Jumbotron>
            <Quiz quiz={quiz} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
