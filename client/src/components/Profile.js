import React, { Component } from "react";
import '../styles/Profile.css';
import Cookies from 'js-cookie';
import axios from 'axios';


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
      <div >
        <div className="main">
          <div className="card">
            <img className="picture"
              src={imageUrl}
            />
          </div>
          <div className="card">
            <div>
              Username: {username} 
            </div>
            <div>
              Email: {email}
            </div>
            <div>
              Description: {description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;