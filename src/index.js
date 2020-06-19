const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('../models');


const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: { models }
});

const app = express();
server.applyMiddleware({ app });

const PORT = 4000 || process.env.port;

app.listen({ port: PORT }, () =>
  console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`)
);