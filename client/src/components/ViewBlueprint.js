import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import SpaceCard from "./SpaceCard";
import Modal from "./Modal";
import { Grid } from "semantic-ui-react";
import "../styles/ViewBlueprint.css";
import PageContainer from "./PageContainer";
import CreateSpaceModal from './CreateSpaceModal';
import {Button,ExceptionList, Card, ResourceList, TextStyle, Select, Tabs, Avatar, TextField,Toast} from '@shopify/polaris';
import { setModalContent } from "../store/user";
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';

class ViewBlueprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      selected: 0,
      blueprint: {},
      message: "",
      spaces: [],
      sortByCategory: {},
      category: "Categories",
      sortedCards: [],
      users: [],
      statistics: {},
      inviteUser: '',
      showToast: false,
      toastMessage: '',
      dateSelected: 'monday',
      spaceSelected: 'Hunter bathoomroom'
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
          let visits = res.data.visits.map(v => {
            return {
              ...v,
              spaceName: res.data.spaces.find(s => s.id === v.spaceId).name,
              userName: res.data.users.find(u => u.id === v.userId).username,
            }
          })
          let dow = ['sunday', 'monday', 'tuesday', 'thursday', 'friday', 'saturday', 'sunday'];
          let statistics = {
            'sunday': [0,0,0,0,0,0],
            'monday': [0,0,0,0,0,0],
            'tuesday': [0,0,0,0,0,0],
            'wednesday': [0,0,0,0,0,0],
            'thursday': [0,0,0,0,0,0],
            'friday': [0,0,0,0,0,0],
            'saturday': [0,0,0,0,0,0],
          }
          visits.forEach(v => {
            var d = new Date(v.from);
            let day = dow[d.getDay()];
            let time = d.getHours();
            if (time >= 0 && time < 9) {
              statistics[day][0] += 1;
            } else if (time >= 9 && time < 12) {
              statistics[day][1] += 1;
            } else if (time >= 12 && time < 15) {
              statistics[day][2] += 1;
            } else if (time >= 15 && time < 18) {
              statistics[day][3] += 1;
            } else if (time >= 18 && time < 21) {
              statistics[day][4] += 1;
            } else if (time >= 21 && time < 24) {
              statistics[day][5] += 1;
            }
          });
          this.setState({ blueprint: res.data, users: res.data.users, spaces: res.data.spaces, visits, statistics });
          console.log(this.state)
          if (res.data.spaces.length === 0) {
            this.setState({ message: "NOBODY HERE" });
          }
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
    const { spaces } = this.state;
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
    const { spaces } = this.state;
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
          this.setState({ showToast : !this.state.showToast , toastMessage: 'Successfully invited ' + name })
        }
      } catch (err) {
        this.setState({ showToast : !this.state.showToast , toastMessage: String(err) })
      }
    }
  }

  handleCreateSpace = () => {
    this.props.setModal("Occupied - CREATE SPACE", "", {id: 1});
    this.setState(({ active }) => ({ active: !active }));
  }

  handleUpdate = (name, description, category, expiration, imageUrl) => {
    axios.post( `/api/space/create`, {
      blueprintId: this.props.blueprintId,
      description,
      name,
      category,
      imageUrl,
    },
    {
      headers: { "access-token": Cookies.get("token") }
    }
    )
    .then(res => {
      if (res.status === 201) {
        this.setState({ showToast : !this.state.showToast , toastMessage: 'Successfully created ' + name })
      } 
    })
    .catch(err => {
      this.setState({ showToast : !this.state.showToast , toastMessage: String(err) })
    });
  }

  render() {
    const { data } = this.props;
    const { username} = data;
    const {
      blueprint,
      sortByCategory,
      active
    } = this.state;

    for (let i in sortByCategory) {
      sortByCategory[i] = sortByCategory[i].map(space => {
        const { users } = this.state;
        return (
          <SpaceCard
            username={username}
            handleOccupy={this.handleOccupy}
            handleToast={(val) => this.setState({ showToast : !this.state.showToast , toastMessage: val })}
            id={space.id}
            name={space.name}
            imageUrl={space.imageUrl}
            location={space.location}
            category={space.category}
            occupied={space.occupied}
            occupiedUser={users.find(u => u.id === space.userId)}
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

    const { selected, dateSelected, spaceSelected } = this.state;

    const tabs = [
      {
        id: "all-blueprints",
        content: "Blueprints",
        render: (
          <div>
            <Grid celled>
              <Grid.Row>
                <Grid.Column width={3}>
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
                    <Modal
                      component={({ onClick }) => (
                        <Button onClick={onClick}> Create Space </Button>
                      )}
                      bodyComp={
                        <CreateSpaceModal
                          handleUpdate={this.handleUpdate}
                        />
                      }
                      active={active}
                      func={this.handleCreateSpace}
                      title="Occupied App - Create Space"
                      body="Create Space"
                      refresh
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row />
              <Grid.Row>{cat}</Grid.Row>
            </Grid>
          </div>
        ),
        accessibilityLabel: "All customers",
        panelID: "all-customers-content"
      },
      {
        id: "members-tab",
        content: "Members",
        render: (
          <div>
            <TextField
              label="Invite Member"
              value={this.state.inviteUser}
              onChange={val => this.setState({ inviteUser: val })}
              placeholder="CoolGuy420"
              onBlur={() => this.handleInviteBlur(this.state.inviteUser)}
            />
            <ResourceList
              resourceName={{ singular: "memeber", plural: "members" }}
              items={this.state.users.map(m => {
                return {
                  id: m.id,
                  url: m.imageUrl,
                  name: m.username,
                  location: m.description
                };
              })}
              renderItem={item => {
                const { id, url, name, location } = item;
                const media = <Avatar customer size="medium" name={name} />;

                return (
                  <ResourceList.Item
                    id={id}
                    url={`http://occupied-app.herokuapp.com/Profile/${id}`}
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
          </div>
        ),
        panelID: "members"
      },
      {
        id: "statistics-page",
        content: "Statistics",
        render: (
          <div>
            <h1> Statistics </h1>
            <Card title="Popular Times">
              <Select
                label="Space"
                options={this.state.spaces.map(s => {
                  return {
                    label: s.name,
                    value: s.name
                  }
                })}
                value={spaceSelected}
                onChange={val => this.setState({ spaceSelected : val })}
              />
              <Select
                label="Date range"
                options={[
                  { label: "Mondays", value: "monday" },
                  { label: "Tuesdays", value: "tuesday" },
                  { label: "Wednesdays", value: "wednesday" },
                  { label: "Thursdays", value: "thursday" },
                  { label: "Fridays", value: "friday" },
                  { label: "Saturdays", value: "saturday" },
                  { label: "Sunday", value: "sunday" }
                ]}
                value={dateSelected}
                onChange={val => this.setState({ dateSelected: val })}
              />
              <Bar
                data={{
                  labels: [
                    "6am-9am",
                    "9am-12pm",
                    "12pm-3pm",
                    "3pm-6pm:",
                    "6pm-9pm",
                    "9pm-12am"
                  ],
                  datasets: [
                    {
                      backgroundColor: "rgba(255,99,132,0.2)",
                      borderColor: "rgba(255,99,132,1)",
                      borderWidth: 1,
                      hoverBackgroundColor: "rgba(255,99,132,0.4)",
                      hoverBorderColor: "rgba(255,99,132,1)",
                      data: this.state.statistics[dateSelected] 
                    }
                  ]
                }}
                width={150}
                height={100}
                options={{
                  maintainAspectRatio: false
                }}
              />
            </Card>
          </div>
        ),
        panelID: "statistics"
      },
      {
        id: "scheduling-page",
        content: "Scheduling",
        render: (
          <div>
            <ExceptionList
              items={this.state.visits ? this.state.visits.map(v => ({ to: v.to, icon: 'calendar', description: `${v.userName} visited ${v.spaceName} from ${format(new Date(v.from), 'ddd MM/DD HH:MM')} to ${format(new Date(v.to), 'ddd MM/DD HH:MM')}`})).reverse() : []}
            />
          </div>
        ),
        panelID: "scheduling"
      }
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
            <title>View Blueprints</title>
            <Card>
              <Card.Section title={tabs[selected].content}>
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
    username: state.user.user,
    modal: state.user.modal
  };
};

const mapDispatch = dispatch => {
  return {
    setModal: (title, body, data) => {
      const content = { title, body, data };
      dispatch(setModalContent(content));
    }
  };
};

export default connect(mapState, mapDispatch)(ViewBlueprint);
