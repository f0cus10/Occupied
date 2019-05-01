import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "../styles/SpaceCard.css";
import axios from "axios";
import Cookies from "js-cookie";

class SpaceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGreen: true,
      curStyle: {},
      text: "Occupy"
    };
    this.handleColor = this.handleColor.bind(this);
  }

  handleColor() {
    const { isGreen } = this.state;
    console.log(this.state);
    const occupiedStyle = {
      "background-color": "rgba(255, 0, 0, 0.6)"
    };

    const vacantStyle = {
      "background-color": "rgba(76, 175, 80, 0.6)",
      text: "Occupy"
    };
    if (isGreen) {
      this.setState({
        curStyle: occupiedStyle,
        isGreen: !isGreen,
        text: "Occupied"
      });
    } else {
      this.setState({
        curStyle: vacantStyle,
        isGreen: !isGreen,
        text: "Occupy"
      });
    }
  }

  handleOccupy = e => {
    e.preventDefault();
    const { id, username } = this.props;
    axios
      .post("api/space/occupy", {
        spaceId: id,
        username,
        headers: { "access-token": Cookies.get("token") }
      })
      .then(res => {
        console.log(res);
        alert("Occupied");
      })
      .catch(err => {
        console.log(err);
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
      description
    } = this.props;

    const mstyle = classNames({ red: occupied, green: !occupied });
    return (
      <div className="card-box">
        <Card className={mstyle}>
          <Image src={imageUrl} className="card-image" />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta />
            <Card.Description>{category}</Card.Description>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {occupied}
            </a>
            <div>
              <Link to="/view">View </Link>
              {/* {isAdminOf.includes(id) && <Link to="/edit">Edit </Link>} */}
            </div>
            <button onClick={this.handleOccupy}> {this.state.text} </button>
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
