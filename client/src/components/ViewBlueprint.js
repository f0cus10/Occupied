import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import SpaceCard from "./SpaceCard";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import "../styles/ViewBlueprint.css";

class ViewBlueprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blueprint: {},
      message: "",
      spaces: [],
      sortByCategory: {},
      category: "Categories",
      sortedCards: []
    };
  }
  componentDidMount() {
    axios
      .get("/api/blueprint/3", {
        headers: {
          "access-token": Cookies.get("token")
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ blueprint: res.data });
          console.log("blueprint");
          this.setState({ spaces: this.state.blueprint.spaces });
          this.handleSortByAll();
        } else {
          this.setState({ message: "ERROR FETCHING BLUEPRINT" });
        }
      })
      .catch(err => {
        this.setState({ message: "ERROR FETCHING BLUEPRINT" });
      });
  }

  handleSort() {
    if (this.state.category == "Categories") {
      this.handleSortByAll();
    } else {
      this.handleSortByCategory(this.state.category);
    }
  }

  handleSortByCategory(category) {
    const { data } = this.props;
    const { username, id } = data;
    const { spaces, sortByCategory } = this.state;
    let categories = [];
    let dict = {};
    spaces.forEach(space => {
      if (space.category == category) {
        categories.push(space.category);
      }
    });
    dict[category] = categories;
    categories.sort();

    this.setState({ sortByCategory: dict });
  }

  handleSortByAll() {
    const { data } = this.props;
    const { username, id } = data;
    const { message, blueprint, spaces, sortByCategory } = this.state;
    console.log("SPACES");
    console.log(spaces);
    let categories = [];
    let dict = {};
    spaces.forEach(space => {
      if (categories.includes(space.category) == false) {
        categories.push(space.category);
      }
    });
    categories.sort();
    categories.forEach(item => (dict[item] = []));
    spaces.forEach(space => {
      dict[space.category].push(space);
    });
    for (let i in dict) {
      dict[i].sort();
    }
    this.setState({ sortByCategory: dict });
  }

  render() {
    const { data } = this.props;
    const { username, id } = data;
    const {
      message,
      blueprint,
      spaces,
      sortByCategory,
      sortedCards
    } = this.state;

    for (let i in sortByCategory) {
      sortByCategory[i] = sortByCategory[i].map(space => (
        <SpaceCard
          id={space.spaces_id}
          name={space.name}
          imageUrl={space.imageUrl}
          location={space.location}
          category={space.category}
          occupied={space.occupied}
          description={space.description}
        />
      ));
    }

    let cat = [];
    for (let i in sortByCategory) {
      cat.push(
        <Grid celled>
          <Grid.Row width={20}>
            <Grid.Column>{i}</Grid.Column>
          </Grid.Row>
          <Grid.Row width={20} className="row">
            {sortByCategory[i]}
          </Grid.Row>
        </Grid>
      );
    }

    return (
      <div className="body">
        <h1>View Blueprint</h1>
        <h2>{message}</h2>
        <div className="card-container">
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={5}>
                <div className="dropdown">
                  <select
                    onChange={e => {
                      this.setState({ category: e.target.value });
                      this.handleSort();
                    }}
                    value={this.state.category}
                    name="one"
                    className="dropdown-select"
                    text="Sort By"
                  >
                    <option value="Categories">Categories </option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Study Room">Study Room</option>
                    <option value="Conference Room">Conference Room</option>
                    <option value="Classroom">Classroom</option>
                    <option value="Library">Library</option>
                  </select>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row />
            <Grid.Row>{cat}</Grid.Row>
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
