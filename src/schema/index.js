const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        url: String!
    }

    type Forum {
        id: Int!
        title: String!,
        description: String!,
        private: Boolean!
    }

    type Query {
        user(id: Int!): User
        forum(id: Int!): Forum
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!, url: String!): User!
        createForum(userId: ID, title: String!, description: String!, private: Boolean!): Forum!
        joinForum(userId: ID, forumId: ID): Forum!
    }
`;


module.exports = typeDefs;