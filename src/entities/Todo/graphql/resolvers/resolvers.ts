
import { userResolver } from "../../user/user.resolver" 


import { roleResolver } from "../../role/role.resolver" 

const resolvers = {
Query: {
...userResolver.Query,
...roleResolver.Query,
//...entityResolver.Query,
},
Mutation: {
...userResolver.Mutation,
...roleResolver.Mutation,
//...entityResolver.Mutation,
},
};
export default resolvers;