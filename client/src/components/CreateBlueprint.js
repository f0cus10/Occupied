import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/CreateBlueprint.css';
import PageContainer from '../components/PageContainer';
class CreateBlueprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      message: '',
      imageUrl:'',
      address:'',
      isPublic: false,
      category:''
    }
  }

  createBlueprint = (name, description, imageUrl="https://acutehearingcenters.com/wp-content/uploads/2017/01/Placeholder-for-Location.jpg", address, isPublic, category) => {
    const { username, id } = this.props.data;  
    let data = { name, description, imageUrl, address, isPublic, userId: id, username, address, category};
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
    const { name, description, message, imageUrl, address, isPublic , category} = this.state;
    return (
      <PageContainer title="Create Blueprint">
        <h3 className="warning"> {message} </h3>
        <Form
          className="blueprint"
          onSubmit={() =>
            this.createBlueprint(
              name,
              description,
              imageUrl,
              address,
              isPublic,
              category
            )
          }
        >
          <Form.Field>
            <label className="label"> Building Name</label>
            <input
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Building Name"
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Address</label>
            <input
              onChange={e => this.setState({ address: e.target.value })}
              placeholder="Address"
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Blueprint Type</label>
            <select
              //value={isPublic}
              onChange={e => {
                if (e.target.value == "1") {
                  this.setState({ isPublic: true });
                } else if (e.target.value == "2") {
                  this.setState({ isPublic: false });
                }
              }}
              class="ui dropdown"
            >
              <option value="" />
              <option value="1">Public</option>
              <option value="2">Private</option>
            </select>
          </Form.Field>
          <Form.Field>
            <label className="label">Categories</label>
            <select
              onChange={e => this.setState({ category: e.target.value })}
              class="ui dropdown"
            >
              <option value="" />
              <option value="School">School</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Building">Building</option>
              <option value="Building">Other</option>
            </select>
          </Form.Field>
          <Form.Field>
            <label className="label">Image URL</label>
            <input
              onChange={e => this.setState({ imageUrl: e.target.value })}
              placeholder="Image url"
            />
          </Form.Field>
          <Form.Field>
            <label className="label">Description</label>
            <Form.TextArea
              onChange={e => this.setState({ description: e.target.value })}
              placeholder="Add description..."
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </PageContainer>
    );
  }
}

export default CreateBlueprint;
