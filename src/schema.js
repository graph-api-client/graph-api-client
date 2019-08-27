const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const { media } = require('./media');

const graphApiGraphqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      media,
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
    },
  }),
});

module.exports = graphApiGraphqlSchema;
