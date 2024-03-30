import {userResolver} from '../../user/user.resolvers'; // Import from the file where you defined the userResolvers

const resolvers = {
    Query: {
      ...userResolver.Query,
    },
    Mutation: {
      ...userResolver.Mutation,
    },
  };
  
  export default resolvers;