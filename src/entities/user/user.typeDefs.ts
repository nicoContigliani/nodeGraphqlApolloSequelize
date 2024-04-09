export const typeDefs = `
 
 type User {
    id: Int!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
    updateUser(id: Int!, name: String!, email: String!): User
    deleteUser(id: Int!): Boolean
  }

  `