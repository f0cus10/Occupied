import React, { Component } from "react";
import { Grid, Image } from "semantic-ui-react";
import BlueprintGrid from "./Grid";
import { Link } from "react-router-dom";
import "../styles/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
          </Grid.Column>
          <Grid.Column width={13}>
            <div>
              <Link to="/create">
                <button type="button" class="btn btn-primary btn-lg m-2">
                  CREATE BLUEPRINT
                </button>
              </Link>
            </div>
            <div>
              <Link to="/join">
                <button type="button" class="btn btn-primary btn-lg m-2">
                  JOIN BLUEPRINT
                </button>
              </Link>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={3}>
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
          </Grid.Column>
          <Grid.Column width={13}>
            {/* <Link to="/create"> Hello</Link> */}
            <BlueprintGrid />
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
