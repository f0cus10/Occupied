import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Input, Menu } from 'semantic-ui-react';
// import publicBlueprints from '../publicBlueprints.json';
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
    // var obj = publicBlueprints[0];
    // this.setState({blueprints : publicBlueprints});
    // console.log(obj.description);
    fetch('/api/blueprint/public', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => this.setState({blueprints : data}))
  }

  renderblueprints = blueprint => {
    const { search } = this.state;
    var code = blueprint.name.toLowerCase();
    return(
      <Grid.Column width={3}>
      <CardExampleCard
        name={blueprint.name}
        description={blueprint.description}
        img_url={blueprint.imageUrl}
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
    const { blueprints, search } = this.state;
    const filteredblueprints = blueprints.filter(blueprints => {
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
