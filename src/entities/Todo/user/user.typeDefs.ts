export const typeDefs = `
type User{
email: string!
password: string!
fullname: string!
phone: string!
birthday: Date!
Score: number!
status_user: boolean
  }

type Query {
users: [User!]!
user(id: Int!): User
}

type Mutation {
createUser(email?: String!,
password?: String!,
fullname?: String!,
phone?: String!,
birthday?: Date!,
Score?: Int!,
status_user?: Boolean!): User
updateUser(
id: Int!,
email?: String!,
password?: String!,
fullname?: String!,
phone?: String!,
birthday?: Date!,
Score?: Int!,
status_user?: Boolean!): User
deleteUser(id: Int!): Boolean
}`