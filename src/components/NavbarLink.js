import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Radium from 'radium';

const Link = Radium(RouterLink)

export default class NavbarLink extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false
    }
  }

  handleMouseEnter() {
    this.setState({
      hover: true,
    })
  }

  handleMouseLeave() {
    this.setState({
      hover: false,
    })
  }

  render() {
    return (
      <Link
        {...this.props}
        style={[styles.container, this.state.hover && styles.hover.container]}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        {this.props.children}
      </Link>
    )
  }
}

const styles = {
  container: {
    fontSize: '16px',
    letterSpacing: '1px',
    textDecoration: 'none',
    color: '#FFFFFF',
    marginRight: '20px',
    borderBottom: '1px solid #171a1f'
  },
  hover: {
    container: {
      borderBottom: '1px solid #f38411'
    },
  },
};
