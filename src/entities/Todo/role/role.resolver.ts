import Role from './role.model'; 
 
   
   export const roleResolver = {
    Query: {
        Role: async (_: any, { id }: any) => await Role.findByPk(id),
        Roles: async () => await Role.findAll(),
    },
    Mutation: {
        // Define user mutations (create, update, delete)
    },
};
   
