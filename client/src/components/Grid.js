import React, { Component } from "react";
import { Grid, Image } from "semantic-ui-react";
import data from "../dummydata.json";
import CardExampleCard from "./Card";
import { Link } from "react-router-dom";

class BlueprintGrid extends Component {
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
    let cards = this.state.posts.map(post => (
      <Grid.Column width={3}>
        <CardExampleCard
          name={post.name}
          description={post.description}
          img_url={post.img_url}
          status={post.status}
          time={post.time}
          id={post.id}
        />
      </Grid.Column>
    ));

    return (
      <div>
        <Grid celled>
          <Grid.Row width={30}>{cards}</Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default BlueprintGrid;
