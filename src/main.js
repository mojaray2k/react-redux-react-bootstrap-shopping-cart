import React, {Component, Fragment} from "react";
import Menu from "./components/menu";
import Footer from "./components/footer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCart} from "./actions/cartActions";

class Main extends Component {
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    return (
      <Fragment>
        <Menu cartItemsNumber={this.props.totalQty} />
        {this.props.children}
        <Footer />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalQty: state.cart.totalQty,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCart,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
