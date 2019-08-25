import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
		bookResults: [],
    title: "",
    author: "",
    synopsis: "",
		titleToSave: "",
		authorToSave:""
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

  handleFormSubmit = (bookResult,event) => {
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

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search API Here</h1>
            </Jumbotron>
            <form>
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
              {/* <TextArea

                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
							<FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleBookSearch}
              >
                Search Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
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
        </Row>
				<Row>
				<Col size="md-12">
				            <Jumbotron>
              <h1>API Results</h1>
            </Jumbotron>
				{/* need an API call to show here */}
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
                onClick={(e) => this.handleFormSubmit(bookResult,e)}
              >
                Save Book
              </FormBtn>
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
				{/*  */}
				</Col>
				</Row>
      </Container>
    );
  }
}

export default Books;
