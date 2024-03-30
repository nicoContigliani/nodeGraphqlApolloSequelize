import express from 'express';
import User from '../models/user.model';
import sequelize from '../config/database';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'graphql-tag';

async function syncModels() {
  await sequelize.sync(); // Sincroniza los modelos con la base de datos
}

syncModels();

const app = express();
const port = 3000;

app.use(express.json());

const typeDefs = gql`
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
`;

const resolvers = {
  Query: {
    users: async () => await User.findAll(),
    user: async (_: any, { id }: any) => await User.findByPk(id),
  },
  Mutation: {
    createUser: async (_: any, { name, email, password }: any) => await User.create({ name, email, password }),
    updateUser: async (_: any, { id, name, email }: any) => {
      const user = await User.findByPk(id);
      if (user) {
        user.name = name;
        user.email = email;
        await user.save();
      }
      return user;
    },
    deleteUser: async (_: any, { id }: any) => await User.destroy({ where: { id } }) > 0,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`Servidor de ejemplo escuchando en el puerto ${port}!`);
    console.log(`Punto final de GraphQL en http://localhost:${port}/graphql`);
  });
}

startServer();