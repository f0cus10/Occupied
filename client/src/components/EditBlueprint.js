import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class EditBlueprint extends Component {
  render() {
    const { username, isAdminOf } = this.props;
    return (
      <div>
        <h1>Edit Blueprint</h1>
        <h2>Welcome {username} !</h2>
        <Link to="/home">GO TO HOME</Link>
      </div>
    );
  }
}

const mapState = state => {
  return {
    username: state.user.user,
    isAdminOf: state.user.isAdminOf
  };
};

export default connect(mapState)(EditBlueprint);
