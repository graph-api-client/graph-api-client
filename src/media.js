const getFieldSelection = require('./utils');

const {
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

const CursorsType = new GraphQLObjectType({
  name: 'CursorsType',
  fields: {
    before: { type: GraphQLString },
    after: { type: GraphQLString },
  },
});

const PagingType = new GraphQLObjectType({
  name: 'PagingType',
  fields: {
    cursors: { type: CursorsType },
  },
});

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: {
    id: { type: GraphQLString },
    text: { type: GraphQLString },
  },
});

const CommentsType = new GraphQLObjectType({
  name: 'CommentsType',
  fields: {
    data: { type: new GraphQLList(CommentType) },
    paging: { type: PagingType },
  },
});

const MediaType = new GraphQLObjectType({
  name: 'MediaType',
  fields: {
    caption: { type: GraphQLString },
    media_url: { type: GraphQLString },
    comments: { type: CommentsType },
  },
});

const media = {
  args: {
    input: { type: MediaInput },
  },
  type: new GraphQLList(MediaType),
  resolve: async (root, args, context, info) => {
    try {
      const fieldsSelection = getFieldSelection(info.fieldNodes, '');
      const id = '17841418527734321';
      const token =
        'EAAeZCOc98l00BAI3YJvCLY0oDH9DZBxIF4W4bAOIqjQIViqV1JZCoELK1gwmlv5SUzjYnXnR5cywPKZAeu8d9Mh4xCQmHMVKh6ZC7YZASWJHvZA8AClhNwW600doIvmQTZAtKTACedqNpTaSBubI3jSwBi6ZAZCHRpPQ5jQ2tg7ONciTCvhb1XjfOkgunuqZBvqHfydIjMkvpT2LpPwtSy4ug8yfVoiR5TEv45mBFKj1hcnQgZDZD';
      const baseURL = `https://graph.facebook.com/${id}?access_token=${token}&fields=${fieldsSelection}`;

      console.log('fieldsSelection', fieldsSelection);
      // console.log('fieldsSelection', fieldsSelection);
      const res = await axios.get(baseURL);
      console.log('res', JSON.stringify(res.data.media.data));

      const data = res.data.media.data;
      // const data = res.data.media.data.map(d => {
      //   return {
      //     ...d,
      //     comments: d.comments ? d.comments.data : [],
      //   };
      // });
      return data;
    } catch (e) {
      console.log('e', e);
    }
  },
};

module.exports = {
  media,
};
