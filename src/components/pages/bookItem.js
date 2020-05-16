import React, {Component} from "react";
import {Image, Well, Col, Row, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addToCart, updateCart} from "../../actions/cartActions";

class BookItem extends Component {
  handleCart = () => {
    const book = [
      ...this.props.cart,
      {
        _id: this.props._id,
        title: this.props.title,
        description: this.props.description,
        images: this.props.images,
        price: this.props.price,
        quantity: 1,
      },
    ];

    if (this.props.cart.length > 0) {
      // cart is not empty
      let _id = this.props._id;
      let cartIndex = this.props.cart.findIndex(function (cart) {
        return cart._id === _id;
      });
      // if Returns -1 there are no items with the same id
      if (cartIndex === -1) {
        this.props.addToCart(book);
      } else {
        // we need to update quantity
        this.props.updateCart(_id, 1, this.props.cart);
      }
    } else {
      // cart is empty
      this.props.addToCart(book);
    }
  };

  render() {
    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Image src={this.props.images} responsive />
          </Col>
          <Col xs={12} sm={6}>
            <h6>{this.props.title}</h6>
            <p>{this.props.description}</p>
            <h6>usd. ${this.props.price}</h6>
            <Button onClick={this.handleCart} bsStyle="primary">
              Buy Now
            </Button>
          </Col>
        </Row>
      </Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
  };
}

function mapDispatchToCart(dispatch) {
  return bindActionCreators(
    {
      addToCart,
      updateCart,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToCart)(BookItem);
