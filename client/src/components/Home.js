import React, { Component } from "react";
import BlueprintGrid from "./Grid";
import { connect } from 'react-redux';
import "../styles/Home.css";
import Modal from '../components/Modal'
import PageContainer from '../components/PageContainer';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { blueprints, id, imageUrl, categories } = this.props.data;
    return (
      <PageContainer title="Home">
        <BlueprintGrid ownerIdProp={id} blueprints={blueprints} uniqueCategories={categories} />
      </PageContainer>
    );
  }
}

const mapState = state => {
  return {
    username: state.user.user,
    auth: state.user.auth,
  }
}

export default connect(mapState)(Home);
