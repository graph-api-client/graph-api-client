class fb {
  constructor(clientBaseURL, clientAccessToken) {
    this.baseURL = `${clientBaseURL}me?${clientAccessToken}`;
  }
}

module.exports = fb;
