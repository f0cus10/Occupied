import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon, Image } from "semantic-ui-react";
import { Toast } from '@shopify/polaris';
import data from "../dummydata.json";
import { Link } from "react-router-dom";
import "../styles/Card.css";
import Modal from "./Modal";
import EditModal from "./EditModal";
import { setModalContent, setViewing } from "../store/user";
import axios from "axios";
import Cookies from "js-cookie";

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      active: false,
      showToast: false,
      toastMessage: ''
    };
  }

  componentDidMount() {
    this.setState({ posts: data });
  }

  handleDelete = () => {
    axios
      .get(`/api/blueprint/delete/${this.props.id}`, {
        headers: {
          "access-token": Cookies.get("token")
        }
      })
      .then(res => {
        if (res.status === 201) {
          this.props.setModal(
            "OCCUPIED - DELETE",
            "SUCCESSFULLY DELETED",
            false
          );
          this.setState(({ active }) => ({ active: !active }));
        } else {
          this.props.setModal(
            "OCCUPIED - DELETE",
            "AN ERROR OCCURED WHILE DELETING",
            false
          );
          this.setState(({ active }) => ({ active: !active }));
        }
      });
  };

  handleEdit = () => {
    axios
      .get(`/api/blueprint/${this.props.id}`, {
        headers: {
          "access-token": Cookies.get("token")
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.props.setModal("Occupied - EDIT", "", res.data);
          this.setState(({ active }) => ({ active: !active }));
        } else {
          this.props.setModal(
            "Occupied - EDIT",
            "An error has occurred...",
            false
          );
          this.setState(({ active }) => ({ active: !active }));
        }
      });
  };

  toggleToast = (toastMessage) => {
    this.setState(({showToast}) => ({showToast: !showToast, toastMessage}));
  };

  handleJoin = () => {
    axios.post(`/api/blueprint/join/`, {
      userId: this.props.ownerIdProp,
      blueprintId: this.props.id,
    }, {
      headers: { "access-token": Cookies.get("token") }
    })
    .then(res => {
      if (res.status === 201) {
        this.toggleToast('Join successful!');
      } else {
        this.toggleToast('There was a problem with your request...');
      }
    })
    .catch(err => {
      this.toggleToast(String(err));
    })
  }

  handleUpdate = (name, description, category, address, imageUrl, isPublic) => {
    axios.post( `/api/blueprint/edit`, {
      userId: this.props.ownerIdProp,
      blueprintId: this.props.id,
      description,
      name,
      category,
      address,
      imageUrl,
      isPublic
    },
    {
      headers: { "access-token": Cookies.get("token") }
    }
    )
    .then(res => {
      window.location.reload();
    })
    .catch(err => {
      console.error(err);
      window.location.reload();
    });
  };

  render() {
    const {
      address,
      category,
      status,
      time,
      name,
      modal,
      description,
      imageUrl,
      isOwner,
      isMember,
      id,
      join
    } = this.props;

    const { showToast, toastMessage } = this.state;

    const toastMarkup = showToast ? (
      <Toast content={toastMessage} onDismiss={() => {this.toggleToast("");window.location.reload()}} />
    ) : null;

    const { data } = modal;
    const viewUrl = `/view/${id}`;
    return (
      <div className="card-box">
        <Card>
        {toastMarkup}
          <Image src={imageUrl} className="card-image" />
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
              <Link to={viewUrl}> View </Link>
              {join && !isMember && (
                <a onClick={() => this.handleJoin()}> Join </a>
              )}
              {isOwner && (
                <>
                  <Modal
                    component={({ onClick }) => (
                      <a onClick={onClick}> Delete </a>
                    )}
                    active={this.state.active}
                    func={this.handleDelete}
                    title="Occupied App - Delete"
                    body="Successfully Deleted!"
                    id={id}
                    refresh
                  />
                  <Modal
                    component={({ onClick }) => (
                      <a onClick={onClick}> Edit </a>
                    )}
                    bodyComp={
                      <EditModal
                        handleUpdate={this.handleUpdate}
                        data={data}
                        uniqueCategories={this.props.uniqueCategories}
                      />
                    }
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
    modal: state.user.modal
  };
};

const mapDispatch = dispatch => {
  return {
    setModal: (title, body, data) => {
      const content = { title, body, data };
      dispatch(setModalContent(content));
    },
    setViewing: blueprintId => {
      dispatch(setViewing(blueprintId));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(CardContainer);
