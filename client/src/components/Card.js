import React, { Component } from "react";
import { connect } from 'react-redux';
import { Card, Icon, Image } from "semantic-ui-react";
import data from "../dummydata.json";
import { Link } from "react-router-dom";
import '../styles/Card.css';
import Modal from './Modal';
import { setUser } from '../store/user';
import axios from "axios";
import Cookies from "js-cookie";

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      active: false
    };
  }

  componentDidMount() {
    this.setState({ posts: data });
  }

  handleDelete = () => {
    axios.get(`/api/blueprint/delete/${this.props.id}`, { 
      headers: {
        'access-token': Cookies.get('token')
      }
    })
    .then(res => {
      if (res.status === 201) {
        this.setState(({ active }) => ({ active: !active }));
      } else {
        this.setState({ message: "ERROR DELETING COMPONENT" })
        this.setState(({ active }) => ({ active: !active }));
      }
    })
  }

  handleEdit = () => {
    return Promise.resolve(
      axios.get(`/api/blueprint/${this.props.id}`, { 
        headers: {
          'access-token': Cookies.get('token')
        }
      })
      .then(res => {
        if (res.status === 201) {
          this.setState(({ active }) => ({ active: !active }));
        } else {
          this.setState({ message: "ERROR DELETING COMPONENT" })
          this.setState(({ active }) => ({ active: !active }));
        }
      })
    )
  };

  render() {
    const {
      address,
      category,
      status,
      time,
      name,
      description,
      imageUrl,
      isOwner,
      id
    } = this.props;

    return (
      <div className="card-box">
        <Card>
          <Image src={imageUrl} className="card-image"/>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
              <span className="date">{time}</span>
            </Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {status}
            </a>
            <div>
              <Link to="/view">View </Link>
              { isOwner && (
                <>
                  {/* <Link to="/edit"> Edit </Link> */}
                  <Modal
                    component={({ onClick }) => <a onClick={onClick}> Edit </a>}
                    active={this.state.active}
                    func={this.handleEdit}
                    title="Occupied App"
                    body=""
                    id={id}
                    refresh
                  />
                  <Modal
                    component={({ onClick }) => <a onClick={onClick}> Edit </a>}
                    active={this.state.active}
                    func={this.handleDelete}
                    title="Occupied App"
                    body="Successfully Deleted!"
                    id={id}
                    refresh
                  />
                </>
              )}
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapState = state => {
  return {
  }
}

const mapDispatch = dispatch => {
  return {
    refresh() {
      dispatch(setUser(""))
    }
  }
}

export default connect(mapState, mapDispatch)(CardContainer);