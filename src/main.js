import React, { Component, Fragment } from "react";
import Menu from "./components/menu";
import Footer from "./components/footer";
import { connect } from "react-redux";

class Main extends Component {
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

export default connect(mapStateToProps)(Main);
