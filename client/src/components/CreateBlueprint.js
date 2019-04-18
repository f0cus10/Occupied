import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import Cookies from 'js-cookie';

class CreateBlueprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      message: '',
    }
  }

  createBlueprint = (name, description) => {
    const { username, id } = this.props.data;
    let data = { name, description, isPublic: true, userId: id, username, category: 'House'};
    fetch('/api/blueprint/create', {
      method: 'POST',
      headers: {
        "access-token": Cookies.get('token'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status === 201) {
        this.setState({ message: 'Create Successfull!' });
      } else {
        this.setState({ message: 'An error has occured' })
      }
    })
  }

  render() {
    const { username } = this.props.data;
    const { name, description, message } = this.state;
    return (
      <div>
        <h1>Create Blueprint</h1>
        <h2>Welcome {username} !</h2>
        <h3 className="warning"> {message} </h3>
        <Form onSubmit={() => this.createBlueprint(name, description)}>
          <Form.Field>
            <label className="label"> Building Name</label>
            <input onChange={(e) => this.setState({name: e.target.value})} placeholder='Building Name'/>
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input placeholder='Address' />
          </Form.Field>
          <Form.TextArea label='Description' onChange={(e) => this.setState({description: e.target.value})} placeholder='Add description...' />
          <Button type='submit'>Submit</Button>
        </Form>
        <Link to="/home">GO TO HOME</Link>
      </div>
    );
  }
}

export default CreateBlueprint;
