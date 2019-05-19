import React, { Component } from "react";
import {Card} from '@shopify/polaris';
import '../styles/Help.css';


class Help extends Component {

  render(){
      return(
    // const { data, profileId } = this.props;
    <Card title="How Occupied Works">
      <Card.Section ></Card.Section>
      <Card.Section title="Terms to know:">
        <p className="occupiedContent">
	      <div><b><u>Blueprints</u> </b>- The representation of an area, composed of  spaces that a user can join.</div>
	      <div><b><u>Spaces</u></b> - The various types of rooms part of a blueprint that can be marked as occupied.</div>
        </p>
      </Card.Section>
      <Card.Section title="Join Blueprints">
        <p className="occupiedContent">
            In order to use a space in a blueprint, user must join a blueprint.
            An user can join  a blueprint of their choices in the <a href="join">join blueprints</a> page. 
            After joining, the blueprints are shown in the home page and the user now have 
            the option to use the spaces in that blueprint.
        </p>
      </Card.Section>
    
      <Card.Section title="Create Blueprints">
        <p className="occupiedContent">
          Users can create blueprints by going to the <a href="/create">create</a> blueprint page and entering the required information. 
          After creating a blueprint the user can create spaces for that blueprint. 
          If the blueprint is private, the creator can go to the blueprint and invite members.
        </p>
      </Card.Section>
    </Card>
      );
  }
}

export default Help;