import User from './user.model'; 
 
   
   export const userResolver = {
    Query: {
        User: async (_: any, { id }: any) => await User.findByPk(id),
        Users: async () => await User.findAll(),
    },
    Mutation: {
        // Define user mutations (create, update, delete)
    },
};
   
