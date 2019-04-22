import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
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
    Cookies.remove('token');
    Cookies.remove('cookie');
    window.location.href = '/';
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
          </Link>
          <Link to="/join">
            <Menu.Item name='Join Blueprint' active={activeItem === 'Join Blueprint'} />
          </Link>

          <Menu.Menu position='right'>
            
          <Link to="/profile">
            <Menu.Item>
              <div className="user">
                Welcome {username}! 
              </div>
            </Menu.Item>
            </Link>
            <Menu.Item
              onClick={this.handleLogin}
              name='Log out'
              active={activeItem === 'Log out'}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;