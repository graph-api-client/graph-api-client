const { graphql } = require('graphql');
const graphApiGraphqlSchema = require('./schema');

class GraphApiGraphqlClient {
  async query(query) {
    return graphql(graphApiGraphqlSchema, query);
  }
}

module.exports = GraphApiGraphqlClient;
