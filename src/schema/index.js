const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        email: String!,
        url: String!
    }

    type Query {
        user(id: Int!): User
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!, url: String!): User!
    }
`;


module.exports = typeDefs;