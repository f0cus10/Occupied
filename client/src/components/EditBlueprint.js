import React, { Component } from "react";
import { Link } from "react-router-dom";

class EditBlueprint extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { username, blueprints } = this.props.data;
    return (
      <div>
        <h1>Edit Blueprint</h1>
        <h2>Welcome {username} !</h2>
        <Link to="/home">GO TO HOME</Link>
      </div>
    );
  }
}

export default EditBlueprint;
