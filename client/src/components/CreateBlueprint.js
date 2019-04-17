import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react';
import "../styles/CreateBlueprint.css";

class CreateBlueprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      imageUrl: ''
    }
  }

  createBlueprint = (name, description, imageUrl) => {
    let data = { name, description, imageUrl, isPublic: true, userId: 1, blueprintId: 10, username: 'miguel', category: 'House'};
    fetch('/api/blueprint/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data)
    })
    .then(res => console.log(res))
  }

  render() {
    const { username } = this.props;
    const { name, description, imageUrl } = this.state;
    return (
      <div>
        <h1>Create A Blueprint!</h1>
        <Form className="blueprint" onSubmit={() => this.createBlueprint(name, description, imageUrl)}>
        <Form.Field>
          <label className="label"> Building Name</label>
          <input onChange={(e) => this.setState({name: e.target.value})} placeholder='Building Name'/>
        </Form.Field>
        <Form.Field>
          <label className="label">Address</label>
          <input placeholder='Address' />
        </Form.Field>
        <Form.Field>
         <label className="label">Blueprint Type</label>
          <select class="ui dropdown">
          <option value=""></option>
          <option value="1">Public</option>
          <option value="0">Private</option>
          </select>
        </Form.Field> 
        <Form.Field>
            <label className="label">Categories</label>
            <select class="ui dropdown">
            <option value=""></option>
            <option value="School">School</option>
            <option value="Home">Home</option>
            <option value="Office">Office</option>
            <option value="Building">Building</option>
            <option value="Building">Other</option>
            </select>
        </Form.Field>  
        <Form.Field>
          <label className="label">Image URL</label>
          <input onChange={(e) => this.setState({imageUrl: e.target.value})} placeholder='Image url' />
        </Form.Field>
        <Form.Field>   
        <label className="label">Description</label>   
        <Form.TextArea onChange={(e) => this.setState({description: e.target.value})} placeholder='Add description...' />
        </Form.Field> 
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
