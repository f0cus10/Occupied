import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react'

class CreateBlueprint extends Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        <h1>Create Blueprint</h1>
        <h2>Welcome {username} !</h2>
        <Form>
        <Form.Field>
          <label className="label"> Building Name</label>
          <input placeholder='Building Name'/>
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <input placeholder='Address' />
        </Form.Field>
        <Form.TextArea label='Description' placeholder='Add description...' />
        <Button type='submit'>Submit</Button>
        </Form>
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

export default connect(mapState)(CreateBlueprint);
