import User from './user.model'; // Assuming your model is in the parent directory




export const userResolver = {
    Query: {
        user: async (_: any, { id }: any) => await User.findByPk(id),
        users: async () => await User.findAll(),
    },
    Mutation: {
        // Define user mutations (create, update, delete)
    },
};