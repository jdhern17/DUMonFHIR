import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  //searches a book
  searchBook: function(bookTitle) {
    return axios.get(`https://newsapi.org/v2/everything?q=${bookTitle.title}&apiKey=4a77c85015524f0f96cc8601da0fe07b`)
  }
};
