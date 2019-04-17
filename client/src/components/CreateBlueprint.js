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
      data: {}
    }
  }

  componentDidMount() {
    axios.get('api/user/', {
      headers: {
        'access-token': Cookies.get('token')
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.setState({ auth: true, data: res.data });
        console.log(this.state)
      }
    })
  }

  createBlueprint = (name, description) => {
    const { username, id } = this.state.data;
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
      console.log(res)
      if (res.status === 201) {
        console.log('success!')
      }
    })
  }

  render() {
    const { username } = this.state.data;
    const { name, description } = this.state;
    return (
      <div>
        <h1>Create Blueprint</h1>
        <h2>Welcome {username} !</h2>
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

const mapState = state => {
  return {
    username: state.user.user
  };
};

export default connect(mapState)(CreateBlueprint);
