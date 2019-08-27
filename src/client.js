const { graphql } = require('graphql');
const graphApiGraphqlSchema = require('./schema');
const fb = require('./fb');
const ig = require('./ig');

class GraphApiGraphqlClient {
  constructor(token, user_id) {
    this.access_token = `access_token=${token}`;
    this.user_id = user_id;
    this.baseURL = 'https://graph.facebook.com/';
    this.fb = new fb(this.baseURL, this.access_token);
    this.ig = new ig(this.baseURL, this.access_token, this.user_id);
  }

  async query(query) {
    return graphql(graphApiGraphqlSchema, query);
  }
}

module.exports = GraphApiGraphqlClient;
