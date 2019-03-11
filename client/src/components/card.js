import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import data from "../dummydata.json";

class CardExampleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    // fetch("data", {
    //   method: "GET"
    // })
    //   .then(res => res.json())
    //   .then(data => {
    this.setState({ posts: data });
    console.log(this.posts);
    //   });
  }

  render() {
    return (
      <div>
        <Card>
          <Image src={this.props.img_url} />
          <Card.Content>
            <Card.Header>{this.props.name}</Card.Header>
            <Card.Meta>
              <span className="date">{this.props.time}</span>
            </Card.Meta>
            <Card.Description>{this.props.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {this.props.status}
            </a>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default CardExampleCard;
