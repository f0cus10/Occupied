import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import data from "../dummydata.json";
import { Link } from "react-router-dom";
import '../styles/Card.css';
import axios from "axios";
import Cookies from "js-cookie";

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.setState({ posts: data });
  }
  
  deleteBlueprint = (e) => {
    e.preventDefault();
    axios.get(`/api/blueprint/delete/${this.props.id}`, { 
      headers: {
        'access-token': Cookies.get('token')
      }
    })
    .then(res => {
      if (res.status === 201) {
      }
    })
  }

  render() {
    const {
      address,
      category,
      status,
      time,
      name,
      description,
      imageUrl,
      isOwner,
      id
    } = this.props;

    return (
      <div className="card-box">
        <Card>
          <Image src={imageUrl} className="card-image"/>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
              <span className="date">{time}</span>
            </Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {status}
            </a>
            <div>
              <Link to="/view">View </Link>
              { isOwner && (
                <>
                  <Link to="/edit"> Edit </Link>
                  <a onClick={this.deleteBlueprint}>Delete</a>
                </>
              )}
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default CardContainer;