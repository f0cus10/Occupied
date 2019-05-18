import React, { Component } from "react";
import { Card, TextField, FormLayout, Select, Button, Form, Banner} from "@shopify/polaris";
import Cookies from 'js-cookie';
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

  createBlueprint = async (name, description, imageUrl="https://acutehearingcenters.com/wp-content/uploads/2017/01/Placeholder-for-Location.jpg", address, isPublic, category) => {
    const { username, id } = this.props.data;  
    let data = { name, description, imageUrl, address, isPublic, userId: id, username, category};
    //clear all the errors
    this.setState({
      message: null
    })
    try{
      const response = await fetch('/api/blueprint/create',{
        method: 'POST',
        headers: {
          "access-token": Cookies.get('token'),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      //Check response status
      if(response.status !== 200){
        this.setState({ message: "Something went wrong" });
        console.log("Response message returned with invalid status");
        return;
      }

      //if successfully created, notify the user
      const { created, errors } = await response.json();
      if (created){
        this.setState({ message: "Create Successful!"});
      }
      else{
        const msg = `${errors[0].path}: ${errors[0].message}`;
        this.setState({ message: msg });
      }
      return;
    } catch (err){
      console.error(err);
    }
  }

  render() {
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
      <Card className="CBcard" title="Create Blueprint" sectioned>
        { message ? (
            <Banner
            title={message}
            onDismiss={()=> {this.setState({message: null})}}
            status = {message === 'Create Successful!' ? "success": "critical"}
            >
            </Banner>
          ) : null 
        }
        <PageContainer title="">
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
            <TextField label="Building Name"
              onChange={ this.handleChange('name')}
              value={name}
            />
            <TextField label="Address"
              onChange={this.handleChange('address')}
              value={address}
            />
            <FormLayout.Group>    
              <Select
                label="Blueprint Type"
                options={type}
                onChange={this.handleChange('isPublic')}
                value={isPublic}
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



export default CreateBlueprint;
