import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Input, Menu } from 'semantic-ui-react';
import CardContainer from './Card.js';
import axios from 'axios';
import Cookies from 'js-cookie'
import PageContainer from './PageContainer';

class JoinBlueprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:  "",
      blueprints:[]
    }
  }
  componentDidMount() {
    axios.get('/api/blueprint/public', {
      headers: {
        'access-token': Cookies.get('token')
      }
    })
    .then(res => {
      this.setState({blueprints : res.data})
    })
  }

  renderblueprints = blueprint => {
    const { search } = this.state;
    var code = blueprint.name.toLowerCase();
    return(
      <Grid.Column width={3}>
      <CardContainer
        name={blueprint.name}
        description={blueprint.description}
        imageUrl={blueprint.imageUrl}
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
      <PageContainer title="Join Blueprint">
        {filteredblueprints.map(blueprints => {
          console.log(blueprints);
          return this.renderblueprints(blueprints);
        })}
      </PageContainer>
    );
  }
}

export default JoinBlueprint;
