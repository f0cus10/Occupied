import React, { Component } from "react";
import '../styles/Profile.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import {DescriptionList, List, FormLayout} from '@shopify/polaris';
import PageContainer from '../components/PageContainer';



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
    let username, email, description, imageUrl;
    if (data) {
      username = data.username;
      email = data.email;
      description = data.description;
      imageUrl = data.imageUrl;
    }
    
    return (
      <FormLayout>
      <FormLayout.Group>
        <div className="main">
          <div className="profileCard">
            <img className="profilePicture"
              src={imageUrl}
            />
          </div>
        </div>
        <div className="profileDescription">
        <DescriptionList  className="main"
            items={[
              {
                term: 'Username',
                description: username,
              },
              {
                term: 'email',
                description: email,
              },
              {
                term: 'Description',
                description: description,
              },
            ]}
        />
        </div>
      </FormLayout.Group>
      </FormLayout>
    );
  }
}

export default Profile;