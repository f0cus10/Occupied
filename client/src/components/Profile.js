import React, { Component } from "react";
import '../styles/Profile.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { DataTable, Label, Page, CalloutCard, Card, DescriptionList } from '@shopify/polaris';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    axios.get(`/api/user/id/${this.props.profileId}`, {
      headers: {
        'access-token': Cookies.get('token')
      }
    })
    .then(res => {
      this.setState({ data : res.data });
    })
  }

  render(){
    // const { data, profileId } = this.props;
    const { data } = this.state;
    let username, email, description, imageUrl, blueprints, rows = [['','','','']];
    if (data) {
      username = data.username;
      email = data.email;
      blueprints = data.blueprints;
      description = data.description;
      imageUrl = data.imageUrl;
    }
    if (blueprints) {
      rows = blueprints.map(b => ([b.name, b.category, String(b.isPublic), b.description]))
    }
    
    return (
      <Page title="Profile">
        <title>My Profile</title>
        <Card>
          <CalloutCard
            title={username}
            illustration={imageUrl}
            primaryAction={{
              content: "Add Friend",
              url: "https://www.shopify.com"
            }}
          >
            <DescriptionList
              items={[
                {
                  term: "Email",
                  description: email
                },
                {
                  term: "Description",
                  description: description
                }
              ]}
            />
          </CalloutCard>
          <Label> Blueprints </Label> 
          <Card>
            <DataTable
              columnContentTypes={[
                "text",
                "text",
                "text",
                "text",
              ]}
              headings={[
                "Name",
                "Category",
                "Public",
                "Description",
              ]}
              rows={rows}
            />
          </Card>
        </Card>
      </Page>
    );
  }
}

export default Profile;