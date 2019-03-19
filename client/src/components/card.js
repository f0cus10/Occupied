import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import data from "../dummydata.json";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CardExampleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.setState({ posts: data });
    console.log(this.posts);
  }

  render() {
    const {
      isAdminOf,
      status,
      time,
      name,
      description,
      img_url,
      id
    } = this.props;

    return (
      <div>
        <Card>
          <Image src={img_url} />
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
              {isAdminOf.includes(id) && <Link to="/edit">Edit </Link>}
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
const mapState = state => {
  console.log(state);
  return {
    isAdminOf: state.user.isAdminOf
  };
};

export default connect(mapState)(CardExampleCard);
