import {ActionList, AppProvider, Card, DisplayText, Form, FormLayout, Frame, Label, Layout, List, Loading, Navigation, Page, TextContainer, TextField, Toast, TopBar, SkeletonPage, SkeletonBodyText, SkeletonDisplayText} from '@shopify/polaris';

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Nav from './Nav';

export default class PageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      howToast: false,
      isLoading: false,
      isDirty: false,
      searchActive: false,
      searchText: '',
      userMenuOpen: false,
      showMobileNavigation: false,
      isRedirect: false
    }
  }

  handleNavigation = (href) => {
    this.toggleState("isLoading");
    let currentHref = window.location.href.split('/');
    currentHref = currentHref.slice(-1);
    if (!href.toLowerCase().includes(currentHref[0].toLowerCase())) {
      this.setState({ isRedirect: href })
    }
  }

  render() {
    const {
      showToast,
      isLoading,
      searchActive,
      searchText,
      userMenuOpen,
      showMobileNavigation,
      isRedirect
    } = this.state;

    const { data, component: Component, back, blueprintId, profileId } = this.props;
    const { username } = data;

    if (isRedirect) {
      return (<Redirect to={isRedirect} />)
    }

    const toastMarkup = showToast ? (
      <Toast
        onDismiss={this.toggleState('showToast')}
        content="Changes saved"
      />
    ) : null;

    const profileStr = `/Profile/${data.id}`;
    const userMenuActions = [
      {
        items: [{content: 'Account', onAction: () => this.setState({ isRedirect : profileStr })}]
      }
    ];

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={userMenuActions}
        name={username}
        detail="Occupied"
        initials={username[0]}
        open={userMenuOpen}
        onToggle={this.toggleState('userMenuOpen')}
      />
    );

    const searchResultsMarkup = (
      <Card>
        <ActionList
          items={[
            {content: 'Shopify help center'},
            {content: 'Community forums'},
          ]}
        />
      </Card>
    );

    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={this.handleSearchFieldChange}
        value={searchText}
        placeholder="Search"
      />
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle={true}
        userMenu={userMenuMarkup}
        searchResultsVisible={searchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={this.handleSearchResultsDismiss}
        onNavigationToggle={this.toggleState('showMobileNavigation')}
      />
    );


    const loadingPageMarkup = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={9} />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;
    const pageMarkup = isLoading ? loadingPageMarkup : <Component data={data} blueprintId={blueprintId} profileId={profileId} />;

    const theme = {
      colors: {
        topBar: {
          background: '#357997',
        },
      },
      logo: {
        width: 124,
        topBarSource:
          'http://occupiedvr.com/wordpress/wp-content/uploads/2018/07/occupiedVR_logo_WHITE-01.png',
        contextualSaveBarSource:
          'http://occupiedvr.com/wordpress/wp-content/uploads/2018/07/occupiedVR_logo_WHITE-01.png',
        url: 'http://occupied-app.herokuapp.com/',
        accessibilityLabel: 'Occupied',
      },
    };
    return (
      <div style={{height: '500px'}}>
        <AppProvider theme={theme}>
          <Frame
            topBar={topBarMarkup}
            navigation={<Nav back={back} id={data.id} username={username} handleNavigation={this.handleNavigation} />}
            showMobileNavigation={showMobileNavigation}
            onNavigationDismiss={this.toggleState('showMobileNavigation')}
          >
            {loadingMarkup}
            {pageMarkup}
            {toastMarkup}
          </Frame>
        </AppProvider>
      </div>
    )
  }

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };

  handleSearchFieldChange = (value) => {
    this.setState({searchText: value});
    if (value.length > 0) {
      this.setState({searchActive: true});
    } else {
      this.setState({searchActive: false});
    }
  };

  handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: '',
      };
    });
  };

  handleSave = () => {
    this.defaultState.nameFieldValue = this.state.nameFieldValue;
    this.defaultState.emailFieldValue = this.state.emailFieldValue;

    this.setState({
      isDirty: false,
      showToast: true,
      storeName: this.defaultState.nameFieldValue,
    });
  };

  handleDiscard = () => {
    this.setState({
      emailFieldValue: this.defaultState.emailFieldValue,
      nameFieldValue: this.defaultState.nameFieldValue,
      isDirty: false,
    });
  };
}
