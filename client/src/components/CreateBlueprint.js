import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateBlueprint extends Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        <h1>
          Create Blueprint
        </h1>
        <h2>Welcome {username} !</h2>
      </div>
    );
  }
}

const mapState = state => {
  return {
    username: state.user.user
  }
}

export default connect(mapState)(CreateBlueprint);