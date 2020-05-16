"use strict";
import React, {Component} from "react";
import {
  DropdownButton,
  Image,
  Col,
  Row,
  Well,
  Panel,
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  InputGroup,
  MenuItem,
} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {findDOMNode} from "react-dom";
import {
  postBooks,
  deleteBooks,
  getBooks,
  resetButton,
} from "../../actions/booksActions";
import axios from "axios";

class BooksForm extends Component {
  state = {
    images: [{}],
    img: "",
  };

  componentDidMount() {
    axios
      .get("/api/images")
      .then((res) => {
        this.setState({images: res.data});
      })
      .catch((err) => {
        this.setState({
          images: "error loading image files from the server",
          img: "",
        });
      });
    this.props.getBooks();
  }

  handleSubmit = () => {
    const book = [
      {
        title: findDOMNode(this.refs.title).value,
        description: findDOMNode(this.refs.description).value,
        images: findDOMNode(this.refs.images).value,
        price: findDOMNode(this.refs.price).value,
      },
    ];
    this.props.postBooks(book);
  };

  onDelete = () => {
    let bookId = findDOMNode(this.refs.delete).value;

    this.props.deleteBooks(bookId);
  };

  handleSelect(img) {
    this.setState({img: "/images/" + img});
  }

  resetForm() {
    //RESET the FORM BUTTON
    this.props.resetButton();
    findDOMNode(this.refs.title).value = "";
    findDOMNode(this.refs.description).value = "";
    this.setState({img: ""});
    findDOMNode(this.refs.price).value = "";
  }

  render() {
    const booksList = this.props.books.map((book) => {
      return <option key={book._id}>{book._id}</option>;
    });

    const imgList = this.state.images.map((image, i) => {
      return (
        <MenuItem
          onClick={this.handleSelect.bind(this, image.name)}
          key={i}
          eventKey={image.name}
        >
          {image.name}
        </MenuItem>
      );
    }, this);
    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl
                  name="imageSelect"
                  type="text"
                  ref="images"
                  value={this.state.img}
                  readOnly
                />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Select An Image"
                  bsStyle="primary"
                >
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive />
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
            <Panel style={{padding: "1em"}}>
              <FormGroup
                controlId="title"
                validationState={this.props.validation}
              >
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Title"
                  ref="title"
                />
                <FormControl.Feedback />>
              </FormGroup>
              <FormGroup
                controlId="description"
                validationState={this.props.validation}
              >
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Description"
                  ref="description"
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="price"
                validationState={this.props.validation}
              >
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Price"
                  ref="price"
                />
                <FormControl.Feedback />
              </FormGroup>
              <Button
                onClick={
                  !this.props.msg
                    ? this.handleSubmit
                    : this.resetForm.bind(this)
                }
                bsStyle={!this.props.style ? "primary" : this.props.style}
              >
                {!this.props.msg ? "Save Book" : this.props.msg}
              </Button>
            </Panel>
            <Panel style={{padding: "1em", marginTop: "25px"}}>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select a book id to delete</ControlLabel>
                <FormControl
                  ref="delete"
                  componentClass="select"
                  placeholder="select"
                >
                  <option value="select">select</option>
                  {booksList}
                </FormControl>
              </FormGroup>
              <Button onClick={this.onDelete} bsStyle="danger">
                Delete Book
              </Button>
            </Panel>
          </Col>
        </Row>
      </Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style,
    validation: state.books.validation,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {postBooks, deleteBooks, getBooks, resetButton},
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
