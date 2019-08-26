const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const graphApiGraphqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
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
