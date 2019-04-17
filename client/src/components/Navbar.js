import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleLogin = () => {
    Cookies.remove('token')
    Cookies.remove('cookie')
  }
  render() {
    const { username } = this.props;
    const { activeItem } = this.state;
    return (
      <div className="navBar">
        <Menu secondary>
        <Link to="/Home">
          <Menu.Item name='Home' active={activeItem === 'Home'}/>
          </Link>
          <Link to="/create">
            <Menu.Item name='Create Blueprint' active={activeItem === 'Create Blueprint'} />
          </Link>>
          <Link to="/join">
            <Menu.Item name='Join Blueprint' active={activeItem === 'Join Blueprint'} />
          </Link>>

          <Menu.Menu position='right'>
            <Menu.Item>
              <div className="user">
                Welcome {username}!
            </div>
            </Menu.Item>
            <Link onClick={this.handleLogin} to="/">
            <Menu.Item
              name='Log out'
              active={activeItem === 'Log out'}
            />
            </Link>
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