import React from 'react';
import { Redirect } from 'react-router-dom';
import { Navigation } from '@shopify/polaris';
import Cookies from 'js-cookie';

function Nav({ back, username, handleNavigation, id }) {
  const profileStr = `/Profile/${id}`
  const userMenuActions = [
    {
      items: [{content: 'My Account', onAction: () => <Redirect to={profileStr} />}]
    }
  ];

  const navigationUserMenuMarkup = (
    <Navigation.UserMenu
      actions={userMenuActions}
      name={username}
      detail="Occupied"
      avatarInitials="M"
    />
  );

  return (
    <Navigation location="/" userMenu={navigationUserMenuMarkup}>
      {back && (
        <Navigation.Section
          items={[
            {
              label: `Back to ${back}`,
              icon: "arrowLeft",
              onClick: () => handleNavigation('/home')
            }
          ]}
        />
      )}
      <Navigation.Section
        separator
        title="Occupied App"
        items={[
          {
            label: "Home",
            icon: "home",
            onClick: () => handleNavigation('/home')
          },
          {
            label: "Create Blueprint",
            icon: 'circlePlus',
            onClick: () => handleNavigation('/create')
          },
          {
            label: "Join Blueprint",
            icon: 'search',
            onClick: () => handleNavigation('/join')
          },
          {
            label: "Help",
            icon: 'help',
            onClick: () => handleNavigation('/help')
          },
          {
            label: "Logout",
            icon: 'logOut',
            onClick: () => {
              Cookies.remove('token');
              Cookies.remove('cookie');
              window.location.href = '/';
            }
          }
        ]}
      />
    </Navigation>
  );
}

export default Nav;
