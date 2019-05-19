import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
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
    const isMember = this.props.data.blueprints.findIndex(m => m.id === blueprint.id) > -1;
    return (
      <Grid.Column width={3}>
        <CardContainer
          ownerIdProp={this.props.data.id}
          id={blueprint.id}
          name={blueprint.name}
          description={blueprint.description}
          imageUrl={blueprint.imageUrl}
          status={blueprint.status}
          time={blueprint.time}
          isMember={isMember}
          join
        />
        <title>Join Blueprint</title>
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
          return this.renderblueprints(blueprints);
        })}
      </PageContainer>
    );
  }
}

export default JoinBlueprint;
