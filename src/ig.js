const axios = require('axios');
class IG {
  constructor(client_base_url, client_access_token, client_user_id) {
    this.client_base_url = client_base_url;
    this.client_access_token = client_access_token;
    this.client_user_id = client_user_id;
  }
  async init(client_page_name) {
    const account = await axios.get(
      `${this.client_base_url + this.client_user_id}?${
        this.client_access_token
      }&fields=accounts`,
    );
    const page_id = account.data.accounts.data.find(
      x => x.name === client_page_name,
    ).id;
    const business_account = await axios.get(
      `${this.client_base_url + page_id}?${
        this.client_access_token
      }&fields=instagram_business_account`,
    );
    const ig_id = business_account.data.instagram_business_account.id;
    this.instaURL = `${this.client_base_url + ig_id}?${
      this.client_access_token
    }`;
    return true;
  }
}

module.exports = IG;
