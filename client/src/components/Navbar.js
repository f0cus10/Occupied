import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { username } = this.props;
    return (
      <div className="navbar">
        Welcome {username}!
      </div>
    );
  }
}

const mapState = state => {
  return {
    username: state.user.user
  }
}

export default connect(mapState)(Navbar);