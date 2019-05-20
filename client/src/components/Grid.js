import React, { Component } from "react";
import CardContainer from "./Card";
import '../styles/Grid.css';

import { DisplayText } from '@shopify/polaris';

class BlueprintGrid extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { blueprints, ownerIdProp, uniqueCategories } = this.props;
    let cards;
    if (blueprints) {
      cards = blueprints.map(post => {
        let isOwner = ownerIdProp === post.userId;
        return (
          <CardContainer
            key={post.id}
            name={post.name}
            address={post.address}
            description={post.description}
            category={post.category}
            imageUrl={post.imageUrl}
            status={post.status}
            time={post.time}
            id={post.id}
            uniqueCategories={uniqueCategories}
            ownerIdProp={ownerIdProp}
            isOwner={isOwner}
          />
        )
      });
    }

    return (
      <div className="card-container">
        {!!cards.length ? cards :<DisplayText size="extraLarge">No blueprints here! Please create one in the create blueprints page!</DisplayText> }
      </div>
    );
  }
}

export default BlueprintGrid;
