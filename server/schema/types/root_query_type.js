const graphql = require('graphql');
const AuthService = require('../../services/auth');

const {
  GraphQLObjectType,
  GraphQLID,
} = graphql;
const UserType = require('./user_type');
const ProtectedDataType = require('./protecteddata');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
    testjwt: {
      type: UserType,
      resolve(parentValue, args, req) {
        console.log('Testing jwt');
        return AuthService.accessProtectedData(req);
      },
    },
    protecteddata: {
      type: ProtectedDataType,
      resolve(parentValue, args, req) {
        console.log('Testing jwt');

        const ss = { secretInfo: 'secret ssshhhhh' };
        AuthService.accessProtectedData(req).then((user, err) => {
          console.log('User', user, err);
        });


        // console.log('User', user);
        // if (user) {
        //   return ss;
        // }
        // return null;
      },
    },
  },
});

module.exports = RootQueryType;
