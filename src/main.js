import React, { Component, Fragment } from "react";
import Menu from "./components/menu";
import Footer from "./components/footer";

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Menu />
        {this.props.children}
        <Footer />
      </Fragment>
    );
  }
}

export default Main;
