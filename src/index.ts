import express from 'express';
// import User from '../models/user.model';
import sequelize from '../config/database';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
// import { gql } from 'graphql-tag';
import resolvers from './graphql/resolvers/resolvers';
import typeDefs from './graphql/typeDefs/typeDefs';


async function syncModels() {
  await sequelize.sync(); // Sincroniza los modelos con la base de datos
}

syncModels();

const app = express();
const port = 3000;

app.use(express.json());


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


