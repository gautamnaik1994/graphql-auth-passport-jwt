const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = graphql;

const ProtectedDataType = new GraphQLObjectType({
  name: 'ProtectedDataType',
  fields: {
    secretInfo: { type: GraphQLString },
  },
});

module.exports = ProtectedDataType;
