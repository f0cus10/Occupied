import React from "react";
import { connect } from 'react-redux';
import { Button, Modal, TextContainer } from "@shopify/polaris";

//TODO fix broken active state here
class ModalCard extends React.Component {
  state = {
    active: false
  };

  handleChange = () => {
    if (this.props.refresh) {
      window.location.reload()
    } else {
      this.setState(({ active }) => ({ active: !active }));
    }
  }

  render() {
    const { active, modal, func, component: Component } = this.props;
    const { title, body } = modal;
    return (
      <div>
        { Component ? (
          <Component onClick={func} />
        ) : (
          <Button onClick={this.handleChange}>Open</Button>
        )}
        <Modal
          limitHeight={true}
          open={active}
          onClose={this.handleChange}
          title={title}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                { body }
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    );
  }
}

const mapState = state => {
  return {
    modal: state.user.modal
  }
}

const mapDispatch = dispatch => {
  return {
  }
}

export default connect(mapState, mapDispatch)(ModalCard);