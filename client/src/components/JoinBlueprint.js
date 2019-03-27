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

  renderblueprints = blueprint => {
    const { search } = this.state;
    var code = blueprint.name.toLowerCase();
    return(
      <Grid.Column width={3}>
      <CardExampleCard
        name={blueprint.name}
        description={blueprint.description}
        img_url={blueprint.img_url}
        status={blueprint.status}
        time={blueprint.time}
      />
    </Grid.Column>
    );
  };

  onchange = e => {
    this.setState({ search: e.target.value });
  };


  render() {
    /*let cards = this.state.blueprints.map(bp => (
      <Grid.Column width={3}>
        <CardExampleCard
          name={bp.name}
          description={bp.description}
          img_url={bp.img_url}
          status={bp.status}
          time={bp.time}
        />
      </Grid.Column>
    ));*/
    const { search } = this.state;
    const filteredblueprints = publicBlueprints.filter(blueprints => {
      return blueprints.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    return (
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </Grid.Column>
          <Grid.Column width={13}>
            <Menu.Item>
              <Input
                label="Search blueprints"
                icon="search"
                onChange={this.onchange}
              />
            </Menu.Item>
            <div>Search for your Blueprints here!</div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={3}>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </Grid.Column>
          {filteredblueprints.map(blueprints => {
            console.log(blueprints)
            return this.renderblueprints(blueprints);
          })}
          <Grid.Column width={13}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default JoinBlueprint;
