const { GraphApiGraphqlClient } = require('../../src');

const graphApiClient = new GraphApiGraphqlClient();

const query = `query hello {
  hello
}`;

graphApiClient.query(query).then(result => {
  console.log(result);
});
