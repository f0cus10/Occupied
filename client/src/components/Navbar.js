import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { username } = this.props;
    const { activeItem } = this.state;
    return (
      <div className="navBar">
        <Menu secondary>
          <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
          <Menu.Item name='Create Blueprint' active={activeItem === 'Create Blueprint'} onClick={this.handleItemClick} />

          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search Blueprints...' />
            </Menu.Item>
            <Menu.Item>
              <div className="user">
                Welcome {username}!
            </div>
            </Menu.Item>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

const mapState = state => {
  return {
    username: state.user.user
  }
}

export default connect(mapState)(Navbar);