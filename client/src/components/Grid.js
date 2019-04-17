import React, { Component } from "react";
import CardContainer from "./Card";
import '../styles/Grid.css';

class BlueprintGrid extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { blueprints } = this.props;
    let cards;
    if (blueprints) {
      cards = blueprints.map(post => (
        <CardContainer
          name={post.name}
          address={post.address}
          description={post.description}
          category={post.category}
          imageUrl={post.imageUrl}
          status={post.status}
          time={post.time}
          id={post.id}
        />
      ));
    }

    return (
      <div className="card-container">
        {cards}
      </div>
    );
  }
}

export default BlueprintGrid;
