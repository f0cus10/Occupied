import React from "react";
import {
  ActionList,
  AppProvider,
  Card,
  ContextualSaveBar,
  DisplayText,
  Form,
  FormLayout,
  Frame,
  Label,
  Layout,
  List,
  Loading,
  Modal,
  Navigation,
  Page,
  TextContainer,
  TextField,
  Toast,
  TopBar,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText
} from "@shopify/polaris";
import { Link, Redirect } from "react-router-dom";

export default class Home2 extends React.Component {
  defaultState = {
    emailFieldValue: "miguel@ocupied.com",
    nameFieldValue: "Occupied"
  };

  state = {
    showToast: false,
    isLoading: false,
    isDirty: false,
    searchActive: false,
    searchText: "",
    userMenuOpen: false,
    showMobileNavigation: false,
    modalActive: false,
    nameFieldValue: this.defaultState.nameFieldValue,
    emailFieldValue: this.defaultState.emailFieldValue,
    storeName: this.defaultState.nameFieldValue,
    supportSubject: "",
    supportMessage: ""
  };

  render() {
    const {
      showToast,
      isLoading,
      isDirty,
      searchActive,
      searchText,
      userMenuOpen,
      showMobileNavigation,
      nameFieldValue,
      emailFieldValue,
      modalActive,
      storeName
    } = this.state;

    const toastMarkup = showToast ? (
      <Toast
        onDismiss={this.toggleState("showToast")}
        content="Changes saved"
      />
    ) : null;

    const userMenuActions = [
      {
        items: [{ content: "Community forums" }]
      }
    ];

    const navigationUserMenuMarkup = (
      <Navigation.UserMenu
        actions={userMenuActions}
        name="Dharma"
        detail={storeName}
        avatarInitials="D"
      />
    );

    const contextualSaveBarMarkup = isDirty ? (
      <ContextualSaveBar
        message="Unsaved changes"
        saveAction={{
          onAction: this.handleSave
        }}
        discardAction={{
          onAction: this.handleDiscard
        }}
      />
    ) : null;

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={userMenuActions}
        name="Dharma"
        detail={storeName}
        initials="D"
        open={userMenuOpen}
        onToggle={this.toggleState("userMenuOpen")}
      />
    );

    const searchResultsMarkup = (
      <Card>
        <ActionList
          items={[
            { content: "Shopify help center" },
            { content: "Community forums" }
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
        onNavigationToggle={this.toggleState("showMobileNavigation")}
      />
    );

    const navigationMarkup = (
      <Navigation location="/Home" userMenu={navigationUserMenuMarkup}>
        <Navigation.Section
          items={[
            {
              label: "Back to Home",
              icon: "arrowLeft"
            }
          ]}
        />
        <Navigation.Section
          separator
          title="Dashboard"
          items={[
            {
              url: "/Home",
              label: "Home",
              icon: "home",
              onClick: "location.href='home.js'"
            },
            {
              label: "Create Blueprint",
              icon: "orders",
              onClick: this.toggleState("isLoading")
            },
            {
              label: "Join Blueprint",
              icon: "orders",
              onClick: this.toggleState("isLoading")
            },
            {
              label: "Logout",
              icon: "orders",
              onClick: this.toggleState("isLoading")
            }
          ]}
          action={{
            icon: "conversation",
            accessibilityLabel: "Contact support",
            onClick: this.toggleState("modalActive")
          }}
        />
      </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title="Account">
        <Layout>
          <Layout.AnnotatedSection
            title="Account details"
            description="Jaded Pixel will use this as your account information."
          >
            <Card sectioned>
              <FormLayout>
                <TextField
                  label="Full name"
                  value={nameFieldValue}
                  onChange={this.handleNameFieldChange}
                />
                <TextField
                  type="email"
                  label="Email"
                  value={emailFieldValue}
                  onChange={this.handleEmailFieldChange}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
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

    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

    const modalMarkup = (
      <Modal
        open={modalActive}
        onClose={this.toggleState("modalActive")}
        title="Contact support"
        primaryAction={{
          content: "Send",
          onAction: this.toggleState("modalActive")
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label="Subject"
              value={this.state.supportSubject}
              onChange={this.handleSubjectChange}
            />
            <TextField
              label="Message"
              value={this.state.supportMessage}
              onChange={this.handleMessageChange}
              multiline
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );

    const theme = {
      colors: {
        topBar: {
          background: "#357997"
        }
      },
      logo: {
        width: 124,
        topBarSource:
          "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999",
        contextualSaveBarSource:
          "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999",
        url: "http://jadedpixel.com",
        accessibilityLabel: "Jaded Pixel"
      }
    };

    return (
      <div style={{ height: "500px" }}>
        <AppProvider theme={theme}>
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={showMobileNavigation}
            onNavigationDismiss={this.toggleState("showMobileNavigation")}
          >
            {contextualSaveBarMarkup}
            {loadingMarkup}
            {pageMarkup}
            {toastMarkup}
            {modalMarkup}
          </Frame>
        </AppProvider>
      </div>
    );
  }

  toggleState = key => {
    return () => {
      this.setState(prevState => ({ [key]: !prevState[key] }));
    };
  };

  handleSearchFieldChange = value => {
    this.setState({ searchText: value });
    if (value.length > 0) {
      this.setState({ searchActive: true });
    } else {
      this.setState({ searchActive: false });
    }
  };

  handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: ""
      };
    });
  };

  handleEmailFieldChange = emailFieldValue => {
    this.setState({ emailFieldValue });
    if (emailFieldValue != "") {
      this.setState({ isDirty: true });
    }
  };

  handleNameFieldChange = nameFieldValue => {
    this.setState({ nameFieldValue });
    if (nameFieldValue != "") {
      this.setState({ isDirty: true });
    }
  };

  handleSave = () => {
    this.defaultState.nameFieldValue = this.state.nameFieldValue;
    this.defaultState.emailFieldValue = this.state.emailFieldValue;

    this.setState({
      isDirty: false,
      showToast: true,
      storeName: this.defaultState.nameFieldValue
    });
  };

  handleDiscard = () => {
    this.setState({
      emailFieldValue: this.defaultState.emailFieldValue,
      nameFieldValue: this.defaultState.nameFieldValue,
      isDirty: false
    });
  };

  handleSubjectChange = supportSubject => {
    this.setState({ supportSubject });
  };

  handleMessageChange = supportMessage => {
    this.setState({ supportMessage });
  };
}
