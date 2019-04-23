import React from "react";
import { Button, Modal, TextContainer } from "@shopify/polaris";

// TODO pass in two functions one for handleFunc and the other for when you click th
export default class ModalCard extends React.Component {
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
    const { message } = this.state;
    const { active, title, body, func, component: Component } = this.props;
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
              { message ? message : body }
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    );
  }
}
