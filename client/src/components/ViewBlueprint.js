import React, { Component } from "react";
import { connect } from "react-redux";
import CardExampleCard from "./Card";
import { Link } from "react-router-dom";

class ViewBlueprint extends Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        <h1>View Blueprint</h1>
        <h2>Welcome {username} !</h2>
        <h1>MY NAME IS {this.name}</h1>
        <CardExampleCard />
        <Link to="/home">GO TO HOME</Link>
      </div>
    );
  }
}

const mapState = state => {
  return {
    username: state.user.user
  };
};

export default connect(mapState)(ViewBlueprint);
