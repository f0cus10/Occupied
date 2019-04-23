import React, { Component } from "react";
import { connect } from 'react-redux';
import { Card, Icon, Image } from "semantic-ui-react";
import data from "../dummydata.json";
import { Link } from "react-router-dom";
import '../styles/Card.css';
import Modal from './Modal';
import EditModal from './EditModal';
import { setModalContent } from '../store/user';
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
        this.props.setModal('OCCUPIED - DELETE', 'SUCCESSFULLY DELETED');
        this.setState(({ active }) => ({ active: !active }));
      } else {
        this.props.setModal('OCCUPIED - DELETE', 'AN ERROR OCCURED WHILE DELETING');
        this.setState(({ active }) => ({ active: !active }));
      }
    })
  }

  handleEdit = () => {
    axios.get(`/api/blueprint/${this.props.id}`, { 
      headers: {
        'access-token': Cookies.get('token')
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.setState(({ active }) => ({ active: !active }));
        this.props.setModal('Occupied - EDIT', <EditModal data={res.data} />);
      } else {
        this.setState(({ active }) => ({ active: !active }));
        this.props.setModal('Occupied - EDIT', 'An error has occurred...');
      }
    })
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
            <Card.Description>Category: {category}</Card.Description>
            <Card.Description>{address}</Card.Description>
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
                    component={({ onClick }) => <a onClick={onClick}> Delete </a>}
                    active={this.state.active}
                    func={this.handleDelete}
                    title="Occupied App - Delete"
                    body="Successfully Deleted!"
                    id={id}
                    refresh
                  />
                  <Modal
                    component={({ onClick }) => <a onClick={onClick}> Edit </a>}
                    active={this.state.active}
                    func={this.handleEdit}
                    title="Occupied App - Edit"
                    body="Welcome to Edit"
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
    setModal: (title,body) => {
      const content = { title, body };
      dispatch(setModalContent(content));
    }
  }
}

export default connect(mapState, mapDispatch)(CardContainer);