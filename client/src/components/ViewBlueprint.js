import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import SpaceCard from "./SpaceCard";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import "../styles/ViewBlueprint.css";
import PageContainer from "./PageContainer";
import {Card, Label, List, ResourceList, TextStyle, Select, Tabs, Avatar, TextField, Button, Toast} from '@shopify/polaris';

class ViewBlueprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      blueprint: {},
      message: "",
      spaces: [],
      sortByCategory: {},
      category: "Categories",
      sortedCards: [],
      users: [],
      inviteUser: '',
      showToast: false,
      toastMessage: ''
    };
  }
  componentDidMount() {
    axios.get(`/api/blueprint/${this.props.blueprintId}`, {
        headers: {
          "access-token": Cookies.get("token")
        }
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({ blueprint: res.data, users: res.data.users });
          if (res.data.spaces.length === 0) {
            this.setState({ message: "NOBODY HERE" });
          }
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

  handleSort = e => {
    if (e.target.value == "Categories") {
      this.handleSortByAll();
    } else {
      this.handleSortByCategory(e.target.value);
    }
  };

  handleSortByCategory = category => {
    const { data } = this.props;
    const { username, id } = data;
    const { spaces, sortByCategory } = this.state;
    let categories = [];
    let dict = {};
    spaces.forEach(space => {
      if (space.category == category) {
        categories.push(space);
      }
    });
    console.log(categories);

    dict[category] = categories;
    categories.sort();

    console.log(dict);

    this.setState({ sortByCategory: dict });
  };

  handleSortByAll() {
    const { data } = this.props;
    const { username, id } = data;
    const { message, blueprint, spaces, sortByCategory } = this.state;
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

  handleTabChange = (selectedTabIndex) => {
    this.setState({selected: selectedTabIndex});
  };

  handleInviteBlur = async (name) => {
    var yes = window.confirm(`Are you sure you want to invite ${name}`)
    if (yes) {
      try {
        const res = await axios.post(`/api/blueprint/invite`, {
          ownerId: this.props.data.id,
          blueprintId: this.props.blueprintId,
          username: name
        }, {headers: { "access-token": Cookies.get("token") }});
        if (res.status === 201) {
          // this.toggleToast('Successfully invited ' + name);
          this.setState({ showToast : !this.state.showToast , toastMessage: 'Successfully invited ' + name })
        }
      } catch (err) {
        this.setState({ showToast : !this.state.showToast , toastMessage: String(err) })
      }
    }
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
      sortByCategory[i] = sortByCategory[i].map(space => {
        return (
          <SpaceCard
            username={username}
            handleOccupy={this.handleOccupy}
            id={space.space_id}
            name={space.name}
            imageUrl={space.imageUrl}
            location={space.location}
            category={space.category}
            occupied={space.occupied}
            description={space.description}
          />
        );
      });
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

    const { selected } = this.state;

    const tabs = [
      {
        id: 'all-blueprints',
        content: 'Blueprints',
        render: (<div>
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={5}>
                <div className="dropdown">
                  <select
                    onChange={e => {
                      this.setState({ category: e.target.value });
                      this.handleSort(e);
                    }}
                    name="one"
                    className="dropdown-select"
                    text="Sort By"
                  >
                    <option value="Categories">Categories</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Study Room">Study Room</option>
                    <option value="Conference Room">
                      Conference Room
                    </option>
                    <option value="Classroom">Classroom</option>
                    <option value="Library">Library</option>
                  </select>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row />
            <Grid.Row>{cat}</Grid.Row>
          </Grid>
        </div>),
        accessibilityLabel: 'All customers',
        panelID: 'all-customers-content',
      },
      {
        id: 'members-tab',
        content: 'Members',
        render: (<div>
          <TextField
            label="Invite Member"
            value={this.state.inviteUser}
            onChange={(val) => this.setState({ inviteUser : val })}
            placeholder="CoolGuy420"
            onBlur={() => this.handleInviteBlur(this.state.inviteUser)}
          />
          <ResourceList
            resourceName={{singular: 'memeber', plural: 'members'}}
            items={this.state.users.map(m => {
              return {
                id: m.id,
                url: m.imageUrl,
                name: m.username,
                location: m.description
              }
            })}
            renderItem={(item) => {
              const {id, url, name, location} = item;
              const media = <Avatar customer size="medium" name={name} />;

              return (
                <ResourceList.Item
                  id={id}
                  url={url}
                  media={media}
                  accessibilityLabel={`View details for ${name}`}
                >
                  <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                  </h3>
                  <div>{location}</div>
                </ResourceList.Item>
              );
            }}
          />
        </div>),
        panelID: 'members',
      },
      {
        id: 'statistics-page',
        content: 'Statistics',
        render: (<h1> Statistics </h1>),
        panelID: 'statistics',
      },
      {
        id: 'scheduling-page',
        content: 'Scheduling',
        render: (<h1> Scheduling </h1>),
        panelID: 'scheduling',
      },
    ];

    const { showToast, toastMessage } = this.state;

    const toastMarkup = showToast ? (
      <Toast content={toastMessage} onDismiss={() => {this.setState({ showToast: false });window.location.reload()}} />
    ) : null;

    return (
      <PageContainer title={blueprint.name}>
        {toastMarkup}
        <Card>
          <Tabs
            tabs={tabs}
            selected={selected}
            onSelect={this.handleTabChange}
          >
            <Card>
              <Card.Section title={tabs[selected].content}>
              {/* <p>Tab {selected} selected</p> */}
              {tabs[selected].render}
              </Card.Section>
            </Card>
          </Tabs>
        </Card>
      </PageContainer>
    );
  }
}

const mapState = state => {
  return {
    username: state.user.user
  };
};

export default connect(mapState)(ViewBlueprint);
