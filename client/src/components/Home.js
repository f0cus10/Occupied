import React, { Component } from "react";
import { Grid, Image } from "semantic-ui-react";
import BlueprintGrid from "./Grid";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import "../styles/Home.css";
import MediaQuery from 'react-responsive';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { blueprints, id } = this.props.data;
    return (
      <>
        <MediaQuery query="(max-width: 767px)">
          <div className="body">
            <div className="row">
              <Link to="/create">
                <button type="button" className="btn btn-primary btn-lg m-2">
                  CREATE BLUEPRINT
                </button>
              </Link>
              <Link to="/join">
                <button type="button" className="btn btn-primary btn-lg m-2">
                  JOIN BLUEPRINT
                </button>
              </Link>
            </div>
            <BlueprintGrid blueprints={blueprints} />
          </div>
        </MediaQuery>
        <MediaQuery query="(min-width: 768px)">
          <Grid celled>
          <Grid.Row>
            {/* <Image src="https://react.semantic-ui.com/images/wireframe/image.png" /> */}
            <div className="row">
              <Link to="/create">
                <button type="button" className="btn btn-primary btn-lg m-2">
                  CREATE BLUEPRINT
                </button>
              </Link>
              <Link to="/join">
                <button type="button" className="btn btn-primary btn-lg m-2">
                  JOIN BLUEPRINT
                </button>
              </Link>
            </div>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <Image
                src="https://media.licdn.com/dms/image/C5103AQGwk9g4oFaQcQ/profile-displayphoto-shrink_800_800/0?e=1559779200&v=beta&t=YI9uL4Bht2N16C29-PMGfyrcNSO-UCJwlOq0iVQjfmg"
                size="medium"
                circular
              />
            </Grid.Column>
            <Grid.Column width={13}>
              <BlueprintGrid ownerIdProp={id} blueprints={blueprints} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </MediaQuery>
      </>
    );
  }
}

const mapState = state => {
  return {
    username: state.user.user,
    isAuth: state.user.isAuth,
    blueprints: state.user.blueprints
  }
}

export default connect(mapState)(Home);
