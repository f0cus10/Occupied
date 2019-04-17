import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react'

class CreateBlueprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    }
  }

  componentDidMount() {
    
  }

  createBlueprint = (name, description) => {
    let data = { name, description, isPublic: true, userId: 1, blueprintId: 10, username: 'miguel', category: 'House'};
    fetch('/api/blueprint/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(res => console.log(res))
  }

  render() {
    const { username } = this.props;
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
