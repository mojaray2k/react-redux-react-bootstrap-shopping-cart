"use strict";
import React, { Component } from "react";
import { Nav, NavItem, Navbar, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
class Menu extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to='/'>
              <a href='/'>React-Bootstrap</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/about'>
              <NavItem eventKey={1} href='/about'>
                About
              </NavItem>
            </LinkContainer>

            <LinkContainer to='/contacts'>
              <NavItem eventKey={2} href='/contacts'>
                Contact
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to='/admin'>
              <NavItem eventKey={1} href='/admin'>
                Admin
              </NavItem>
            </LinkContainer>

            <LinkContainer to='/cart'>
              <NavItem eventKey={2} href='/cart'>
                Your Cart
                <Badge>1</Badge>
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;
