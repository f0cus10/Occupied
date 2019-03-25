import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Input, Menu } from 'semantic-ui-react';
import publicBlueprints from '../publicBlueprints.json';
import CardExampleCard from './Card.js';

class JoinBlueprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:  "",
      blueprints:[]
    }
  }
  componentDidMount() {
    var obj = publicBlueprints[0];
    this.setState({blueprints : publicBlueprints});
    console.log(obj.description);
  }
  render() {
    let cards = this.state.blueprints.map(bp => (
      <Grid.Column width={3}>
        <CardExampleCard
          name={bp.name}
          description={bp.description}
          img_url={bp.img_url}
          status={bp.status}
          time={bp.time}
        />
      </Grid.Column>
    ));
    return (
      <Grid celled>
    <Grid.Row>
      <Grid.Column width={3}>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column width={13}>
      <Menu.Item>
              <Input icon='search' placeholder='Search Blueprints...' />
            </Menu.Item>
            <div>Message</div>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={3}>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
      {cards}
      <Grid.Column width={13}>
      </Grid.Column>
    </Grid.Row>
  </Grid>
    );
  }
}

export default JoinBlueprint;