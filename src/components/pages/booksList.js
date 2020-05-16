"use strict";
import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Grid, Col, Row, Button} from "react-bootstrap";
import {getBooks} from "../../actions/booksActions";
import BookItem from "./bookItem";
import BooksForm from "./booksForm";
import Cart from "./cart";

class BooksList extends Component {
  state = {
    disable: false,
  };
  componentDidMount() {
    //Dispatch an action
    this.props.getBooks();
  }

  render() {
    const bookList = this.props.books.map((book) => (
      <Col xs={12} sm={6} md={4} key={book._id}>
        <BookItem
          _id={book._id}
          title={book.title}
          description={book.description}
          images={book.images}
          price={book.price}
        />
      </Col>
    ));
    return (
      <Grid>
        <Row>
          <Cart />
        </Row>
        <Row style={{marginTop: "15px"}}>{bookList}</Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBooks: getBooks,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
