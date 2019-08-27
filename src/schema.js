const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
} = require('graphql');
const axios = require('axios');

const MediaInput = new GraphQLInputObjectType({
  name: 'MediaInput',
  fields: {
    mediaId: {
      type: GraphQLString,
    },
  },
});

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: {
    text: { type: GraphQLString },
  },
});

const MediaType = new GraphQLObjectType({
  name: 'MediaType',
  fields: {
    caption: { type: GraphQLString },
    media_url: { type: GraphQLString },
    comments: { type: new GraphQLList(CommentType) },
  },
});

// function graphqlFields(fieldNodes) {
//   for (let i = 0; i < fieldNodes.length; i++) {
//     if (fieldNodes[i].selectionSet) {
//       fieldsSelection[fieldNodes[i].name.value] = {};
//       graphqlFields(fieldNodes[i].selectionSet.selections, fieldsSelection[fieldNodes[i].name.value]);
//     } else {
//       fieldsSelection += `${fieldNodes[i].name.value}`;
//     }
//   }
// }

let fieldsSelection = '';
function getFieldSelection(fieldNodes) {
  for (let i = 0; i < fieldNodes.length; i++) {
    if (fieldNodes[i].selectionSet) {
      fieldsSelection += `${fieldNodes[i].name.value}{`;
      getFieldSelection(fieldNodes[i].selectionSet.selections);
      fieldsSelection += '}';
    } else {
      fieldsSelection += `${fieldNodes[i].name.value}`;
    }

    if (fieldNodes.length - 1 !== i) {
      fieldsSelection += `,`;
    }
  }
}

const graphApiGraphqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      media: {
        args: {
          input: { type: MediaInput },
        },
        type: new GraphQLList(MediaType),
        resolve: async (root, args, context, info) => {
          try {
            const fields = graphqlFields(info.fieldNodes);
            console.log('fields', fields);
            getFieldSelection(info.fieldNodes);
            const id = '17841418527734321';
            const token =
              'EAAeZCOc98l00BACZCG1knlSkQfuZAYB5Ae6QuYWLZAcXoKNNu7mEhkcJI4utbJoC7QDoD9dSzaiXOuhv6XQyC3jjn1QZAChI6PSfpcdQb5u2G7qz4zZAnUVNQwd1GXsnw8MMr2KDHbpoxbq5NRfM7wWIfcoiahU1nrNZBZBBnsfCOVStdRzqYOd85PCW3DLN0XAuj9ZAsSoJSG0dRma1VHuVHs1AX4bi6744reIh9NQMsrR6ZBUC9NqqZBc';
            const baseURL = `https://graph.facebook.com/${id}?access_token=${token}&fields=${fieldsSelection}`;

            // console.log('fieldsSelection', fieldsSelection);
            const res = await axios.get(baseURL);
            console.log('res', JSON.stringify(res.data.media.data));

            const data = res.data.media.data.map(d => {
              return {
                ...d,
                comments: d.comments ? d.comments.data : [],
              };
            });
            return data;
          } catch (e) {
            console.log('e', e);
          }
        },
      },
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
