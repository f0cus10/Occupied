import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import Cookies from 'js-cookie';
// import SpaceCard from "./SpaceCard";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import '../styles/ViewBlueprint.css';

class ViewBlueprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blueprint: {},
      message: "",
      spaces: [],
      sortByCategory: {},
      sortedCards: []
    };
  }
  componentDidMount() {
    axios.get('/api/blueprint/3', {
      headers: {
        'access-token': Cookies.get('token')
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.setState({ blueprint: res.data })
        console.log(this.props.data.username)
      } else {
        this.setState({ message: "ERROR FETCHING BLUEPRINT" })
      }
    })
    .catch(err => {
      this.setState({ message: "ERROR FETCHING BLUEPRINT" })
    })
  };
  render() {
    const { data } = this.props;
    const { username, id } = data;
    const { message } = this.state;
    return (
      <div className="body">
        <h1>View Blueprint</h1>
        <h2>{message}</h2>
        <div className="card-container">
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={5}>
                <div class="dropdown">
                  <select name="one" class="dropdown-select" text="Sort By">
                    <option value="">Categories</option>
                    <option value="1">School</option>
                    <option value="2">Home</option>
                    <option value="3">Library</option>
                    <option value="4">Office</option>
                    <option value="5">Library</option>
                  </select>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row></Grid.Row>
          </Grid>
        </div>

        <Link to="/home">GO TO HOME</Link>
      </div>
    );
  }
}

const mapState = state => {
  return {
    username: state.user.user
  };
};

export default connect(mapState)(ViewBlueprint);