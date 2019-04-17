import React, { Component } from "react";
import data from "../dummydata.json";
import CardExampleCard from "./Card";
import '../styles/Grid.css';

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
      <CardExampleCard
        name={post.name}
        description={post.description}
        img_url={post.img_url}
        status={post.status}
        time={post.time}
        id={post.id}
      />
    ));

    return (
      <div className="card-container">
        {/* {cards} */}
      </div>
    );
  }
}

export default BlueprintGrid;
