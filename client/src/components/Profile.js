import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import '../styles/Profile.css';


class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const { username, email, description, imageUrl} = this.props.data;
    
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

const mapState = state => {
    return {
      username: state.user.user
    };
};

export default connect(mapState) (Profile);