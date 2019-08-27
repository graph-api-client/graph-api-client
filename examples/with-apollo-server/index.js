const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphApiGraphqlSchema } = require('../../src');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphApiGraphqlSchema,
    graphiql: true,
  }),
);

app.listen(4000);
