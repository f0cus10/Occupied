import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/SpaceCard.css";

class SpaceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGreen: true,
      curStyle: {},
      text: "Occupy"
    };
  }

  handleOccupy = () => {
    const { id, username } = this.props;
    axios.post(
        "../api/space/occupy",
        { spaceId: id, username },
        { headers: { "access-token": Cookies.get("token") } }
      )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.props.handleToast('Successfully occupied!')
        }
      })
      .catch(err => {
        console.log(err);
        this.props.handleToast(String(err));
      });
  };

  handleFinished = () => {
    const { id, username } = this.props;
    axios.post(
        "../api/space/finished",
        { spaceId: id, username },
        { headers: { "access-token": Cookies.get("token") } }
      )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.props.handleToast('Successfully finished!')
        }
      })
      .catch(err => {
        console.log(err);
        this.props.handleToast(String(err));
      });
  };

  render() {
    const {
      isAdminOf,
      occupied,
      name,
      category,
      imageUrl,
      id,
      description,
      handleClick,
      occupiedUser
    } = this.props;
    const mstyle = classNames({ red: occupied, green: !occupied });
    return (
      <div className="card-box">
        <Card className={mstyle}>
          { !occupied ? (
            <Image src={imageUrl} className="card-image" />
          ) : (
            <Image src={imageUrl} className="card-image" disabled />
          )}
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta />
            <Card.Description>{category}</Card.Description>
            { !occupied ? (
              <Card.Description>{description}</Card.Description>
            ) : (<>
              <Card.Description>{description}</Card.Description>
              <Card.Description>Currently Occupied by {occupiedUser.username}</Card.Description>
            </>)}
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {occupied}
            </a>
            <div>
              {/* <Link to="/view">View </Link> */}
              {/* {isAdminOf.includes(id) && <Link to="/edit">Edit </Link>} */}
            </div>
            { !occupied ? (
              <button onClick={() => this.handleOccupy()}>
                Occupy
              </button>
            ) : (
              <button onClick={() => this.handleFinished()}>
                Finished
              </button>
            )}
          </Card.Content>
        </Card>
      </div>
    );
  }
}
const mapState = state => {
  //console.log(state);
  return {
    isAdminOf: state.user.isAdminOf
  };
};

export default connect(mapState)(SpaceCard);
