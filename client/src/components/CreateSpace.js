import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, TextField, FormLayout, Layout, Select, Button, Form} from "@shopify/polaris";
import axios from 'axios';
import Cookies from 'js-cookie';
import PageContainer from '../components/PageContainer';
class CreateSpace extends Component {
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
    const blueprintCategory = [
      {label: 'School', value: 'school'},
      {label: 'Office', value: 'office'},
      {label: 'Home', value: 'home'},
      {label: 'Bathroom', value: 'Bathroom'}
    ];
    const type = [
      {label: 'Public', value: true},
      {label: 'Private', value: false}
    ];
    return (
      <Card className="CBcard" title="Create Space" sectioned>
        <PageContainer title="">
          <h3 className="warning"> {message} </h3>
          <Form className="blueprint"
            onSubmit={() =>
              this.createBlueprint(
                name,
                description,
                imageUrl,
                address,
                isPublic,
                category
              )
            } >
          <FormLayout>
            <TextField label="Space Name"
              onChange={ this.handleChange('name')}
              value={name}
            />
            <TextField label="Expiration Time"
              onChange={this.handleChange('address')}
              value={address}
            />
            <FormLayout.Group>    
              <Select
                label="Blueprint"
                options={["Hunter College"]}
                value={"Hunter College"}
              />
              <Select
                label="Category"
                options={blueprintCategory}
                onChange={this.handleChange('category')}
                value={category}
              />
            </FormLayout.Group>
            <TextField
              label="Image Url"
              onChange={this.handleChange('imageUrl')}
              value={imageUrl}
            />
            <TextField
              label="Description"
              onChange={this.handleChange('description')}
              value={description}
              multiline
            />
            <Button submit>Submit</Button>
          </FormLayout>
          </Form>
        </PageContainer>
      </Card>
    );
  }
  handleChange=(field)=>{
    return (value) =>{ 
      this.setState({[field]: value})};
  }
}



export default CreateSpace;
