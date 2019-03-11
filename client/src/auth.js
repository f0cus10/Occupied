const Authorization = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); //fake async until we set up backend
  },
  signout(cb) {
    this.authenticated = false;
    setTimeout(cb, 100);
  }
};

export default Authorization;