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
import {postBooks, deleteBooks} from "../../actions/booksActions";
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
  }

  handleSubmit = () => {
    const book = [
      {
        title: findDOMNode(this.refs.title).value,
        description: findDOMNode(this.refs.description).value,
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
                  ref="image"
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
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Title"
                  ref="title"
                />
              </FormGroup>
              <FormGroup controlId="description">
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Description"
                  ref="description"
                />
              </FormGroup>
              <FormGroup controlId="price">
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Price"
                  ref="price"
                />
              </FormGroup>
              <Button onClick={this.handleSubmit} bsStyle="primary">
                Save
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({postBooks, deleteBooks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
