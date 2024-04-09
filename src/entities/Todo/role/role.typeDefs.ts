export const typeDefs = `
 export interface UserAttributes {
email: string!
password: string!
fullname: string!
phone: string!
birthday: Date!
Score: number!
status_user: boolean
  }

type Query {
roles: [Role!]!
role(id: Int!): Role
}

type Mutation {
createRole(name_role?: String!,
status_role?: Boolean!,
description_role?: String!): Role
updateRole(
id: Int!,
name_role?: String!,
status_role?: Boolean!,
description_role?: String!): Role
deleteRole(id: Int!): Boolean
}`